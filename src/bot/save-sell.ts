import {getRepository} from 'typeorm'
import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import {calculateProfit} from './calculate-profit'
import moment from 'moment'

export async function saveSell(pair: Pair, t: ClosedTransaction) {
  const maxPrice = bn(t.price)
    .minus(bn(t.price).multipliedBy(bn(pair.changeToTrend).dividedBy('100')))
    .toFixed(pair.coin0Precision)

  const toSellPosition: ToSell[] = await getRepository(ToSell)
    .createQueryBuilder('toSell')
    .orderBy('toSell.price', 'ASC')
    .where('toSell.pairName = :pair  AND toSell.filled = :filled', {
      pair: pair.name,
      filled: false,
    })
    .getMany()
  let soldVol = bn(t.vol)
  let profit = bn('0')
  const toSellStart = await getRepository(ToSell)
    .createQueryBuilder('toSell')
    .where('toSell.pairName = :pair AND toSell.filled = :filled', {
      pair: pair.name,
      filled: false,
    })
    .select('COALESCE(SUM(toSell.left),0)', 'howMuchToSell')
    .getRawOne()

  if (toSellPosition.length === 0) {
    console.log(`        |--[tid: ${t.id}]  sold ${pair.name} from price ${t.price}, no TOSELL position found!`)
  }

  for (const ts of toSellPosition) {
    const left = bn(ts.left)
    if (soldVol.isGreaterThan('0')) {
      if (left.isEqualTo(soldVol)) {
        ts.filled = true
        console.log(`        |--* ts=t [ts id: ${ts.id}] left ${ts.left} - ${soldVol.toFixed(0)} = 0 END`)
        ts.left = '0.0'
        ts.sellUpdate = moment().unix()
        profit = profit.plus(calculateProfit({volume: soldVol, buyPrice: bn(ts.price), sellPrice: bn(t.price)}))
        soldVol = bn('0')
      } else if (left.isLessThan(soldVol)) {
        console.log(
          `        |--* ts<t [ts id: ${ts.id}] left ${ts.left} - ${soldVol.toFixed(0)} = ${soldVol
            .minus(bn(ts.left))
            .toFixed(8)}`,
        )

        ts.filled = true
        soldVol = soldVol.minus(bn(ts.left))
        ts.left = '0.0'
        ts.sellUpdate = moment().unix()
        profit = profit.plus(calculateProfit({volume: left, buyPrice: bn(ts.price), sellPrice: bn(t.price)}))
      } else {
        console.log(
          `        |--* ts>t (1/2) [ts id: ${ts.id}] left ${ts.left} - ${soldVol.toFixed(8)} = ${soldVol
            .minus(bn(ts.vol))
            .toFixed(8)}`,
        )
        ts.left = bn(ts.left).minus(soldVol).toFixed(pair.coin0Precision)
        ts.sellUpdate = moment().unix()
        profit = profit.plus(calculateProfit({volume: soldVol, buyPrice: bn(ts.price), sellPrice: bn(t.price)}))
        console.log(`        |--* ts>t (2/2) [ts id: ${ts.id}] leaving transaction with ${ts.left} `)
        soldVol = bn('0')
      }

      await ts.save()
    }
  }

  if (soldVol.isGreaterThan('0')) {
    console.log(
      `        |--[!!!] ----- left with ${soldVol.toFixed(
        pair.coin0Precision,
      )} that should be also sold. something went wrong`,
    )
  }

  const fee = bn(t.fee).multipliedBy(2)
  pair.profit = profit.plus(pair.profit).toFixed(pair.coin1Precision)
  t.profit = profit.toFixed(pair.coin1Precision)
  await t.save()
  await pair.save()

  const toSellLeft = await getRepository(ToSell)
    .createQueryBuilder('toSell')
    .where('toSell.pairName = :pair AND toSell.filled = :filled', {
      pair: pair.name,
      filled: false,
    })
    .select('COALESCE(SUM(toSell.left),0)', 'howMuchToSell')
    .getRawOne()
  if (!bn(toSellStart.howMuchToSell).minus(toSellLeft.howMuchToSell).isEqualTo(t.vol)) {
    console.log('         \\--|--saveSell started. have to_sell positions sum   :', toSellStart.howMuchToSell)
    console.log('            |--', t.vol, '  should be =', bn(toSellStart.howMuchToSell).minus(t.vol).toFixed(8))
    console.log(`            |--saveSell ${pair.name} ended with to_sell positions sum of :`, toSellLeft.howMuchToSell)
    console.log(
      `            |--operation diff : ${bn(toSellStart.howMuchToSell).minus(toSellLeft.howMuchToSell).toFixed(8)}`,
    )
    console.log(`            |--diff should be : ${t.vol}`)
    console.log('            |--toSellPositions:', JSON.stringify(toSellPosition, null, 2))
  }
}
