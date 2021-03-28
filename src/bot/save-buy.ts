import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import moment from 'moment'
import {getRepository} from 'typeorm'

export async function saveBuy(pair: Pair, t: ClosedTransaction, strategy?: string) {
  const minPrice = bn(t.price).minus(bn(t.price).multipliedBy(1 / 100))
  const maxPrice = bn(t.price).plus(bn(t.price).multipliedBy(1 / 100))
  const result = await getRepository(ToSell)
    .createQueryBuilder('t')
    .where('t.pairName = :pair AND t.filled = :filled AND t.price <= :maxPrice AND t.price >= :minPrice', {
      pair: pair.name,
      maxPrice: maxPrice.toFixed(pair.coin0Precision),
      minPrice: minPrice.toFixed(pair.coin0Precision),

      filled: false,
    })
    .getMany()
  const toSellPosition = new ToSell()
  console.log({result})
  toSellPosition.pair = pair

  toSellPosition.buyUpdate = moment().unix()

  if (result && result.length > 0) {
    for (const dbToSellPosition of result) {
      toSellPosition.sellUpdate = dbToSellPosition.sellUpdate

      console.log(`  price: ${dbToSellPosition.price}  volume: ${dbToSellPosition.left}`)
      console.log(`+ price: ${t.price}  volume: ${t.vol}`)

      // Avg price
      const weightedDbPosition = bn(dbToSellPosition.price).multipliedBy(dbToSellPosition.left)
      const weightedIncommingPosition = bn(t.price).multipliedBy(t.vol)
      const weights = bn(dbToSellPosition.left).plus(t.vol)
      const newPrice = weightedDbPosition.plus(weightedIncommingPosition).dividedBy(weights)

      // Add volume
      const vol = bn(dbToSellPosition.vol).plus(t.vol).toFixed(8)
      const left = bn(dbToSellPosition.left).plus(t.vol).toFixed(8)
      // Set new price
      const price = newPrice.toFixed(8)

      toSellPosition.price = price
      toSellPosition.vol = vol
      toSellPosition.left = left
      toSellPosition.strategy = dbToSellPosition.strategy + '#'
      const timeDiff = moment().unix() - dbToSellPosition.buyUpdate
      toSellPosition.safeBuy = timeDiff > 60 ? dbToSellPosition.safeBuy + 1 : dbToSellPosition.safeBuy
      console.log('    |-------(removed) tosell:', dbToSellPosition.id)
      console.log(`= price: ${price}  volume: ${left}`)

      dbToSellPosition.filled = true
      await dbToSellPosition.save()
    }

    //   Await dbToSellPosition.save()
  } else {
    console.log('DID NOT FIND ANY OTHER', pair.name, 'to sell position')
    toSellPosition.price = t.price
    toSellPosition.vol = t.vol
    toSellPosition.left = t.vol
    toSellPosition.strategy = strategy || ''
  }

  await toSellPosition.save()
  console.log('    |-------added tosell:', toSellPosition.id)

  await t.save()
}
