import {getRepository} from 'typeorm'
import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import {calculateProfit} from './calculate-profit'

export async function saveSell(pair: Pair, t: ClosedTransaction) {
  const maxPrice = bn(t.price)
    .minus(bn(t.price).multipliedBy(bn(pair.changeToTrend).dividedBy('100')))
    .toFixed(pair.coin0Precision)

  const toSellPosition: ToSell[] = await getRepository(ToSell)
    .createQueryBuilder('toSell')
    .orderBy('toSell.price', 'DESC')
    .where('toSell.pairName = :pair AND toSell.price <= :maxPrice AND toSell.filled = :filled', {
      pair: pair.name,
      maxPrice,
      filled: false,
    })
    .getMany()
  let soldVol = bn(t.vol)
  let profit = bn(pair.profit)
  console.log('saveSell called. have to_sell positions sum of :', toSellPosition, '  looking for price  ', maxPrice)
  console.log(`transaction volume: ${t.vol}`)
  if (toSellPosition.length === 0) {
    console.log(`[tid: ${t.id}]  sold ${pair.name} from price ${t.price}, no TOSELL position found!`)
  }

  for (const ts of toSellPosition) {
    const left = bn(ts.left)
    if (left.isEqualTo(soldVol)) {
      ts.filled = true
      ts.left = '0.0'
      profit = profit.plus(calculateProfit({volume: soldVol, buyPrice: bn(ts.price), sellPrice: bn(t.price)}))
      ts.save().catch((error: any) => {
        console.log('error saaving toSell on sold handler')
        console.log(error)
      })
      soldVol = bn('0')
      break
    } else if (left.isLessThan(soldVol)) {
      ts.filled = true
      ts.left = '0.0'
      profit = profit.plus(calculateProfit({volume: left, buyPrice: bn(ts.price), sellPrice: bn(t.price)}))
      ts.save().catch((error: any) => {
        console.log('error saaving toSell on sold handler')
        console.log(error)
      })
      soldVol = soldVol.minus(bn(ts.vol))
    } else {
      ts.left = bn(ts.left).minus(soldVol).toFixed(pair.coin0Precision)
      profit = profit.plus(calculateProfit({volume: soldVol, buyPrice: bn(ts.price), sellPrice: bn(t.price)}))
      ts.save().catch((error: any) => {
        console.log('error saaving toSell on sold handler')
        console.log(error)
      })
      soldVol = bn('0')
      break
    }
  }

  if (soldVol.isGreaterThan('0')) {
    console.log(
      `[tid: ${t.id}] sold ${pair.name} from price ${t.price},  left with ${soldVol.toFixed(pair.coin0Precision)}`,
    )
  }

  pair.profit = profit.toFixed(pair.coin1Precision)
  await pair.save()

  const toSellPosition1: ToSell[] = await getRepository(ToSell)
    .createQueryBuilder('toSell')
    .orderBy('toSell.price', 'DESC')
    .where('toSell.pairName = :pair AND toSell.price <= :maxPrice AND toSell.filled = :filled', {
      pair: pair.name,
      maxPrice,
      filled: false,
    })
    .getMany()

  console.log('saveSell ended. have to_sell positions sum of :', toSellPosition1)
}
