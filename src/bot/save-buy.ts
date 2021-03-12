import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import moment from 'moment'

export async function saveBuy(pair: Pair, t: ClosedTransaction, strategy?: string) {
  const dbToSellPositions = await ToSell.find({pair, filled: false, dust: false})
  if (dbToSellPositions.length > 0) {
    const dbToSellPosition = dbToSellPositions[0]
    console.log(`  price: ${dbToSellPosition.price}  volume: ${dbToSellPosition.left}`)
    console.log(`+ price: ${t.price}  volume: ${t.vol}`)

    // Avg price
    const weightedDbPosition = bn(dbToSellPosition.price).multipliedBy(dbToSellPosition.left)
    const weightedIncommingPosition = bn(t.price).multipliedBy(t.vol)
    const weights = bn(dbToSellPosition.left).plus(t.vol)
    const newPrice = weightedDbPosition.plus(weightedIncommingPosition).dividedBy(weights)

    // Add volume
    dbToSellPosition.vol = bn(dbToSellPosition.vol).plus(t.vol).toFixed(8)
    dbToSellPosition.left = bn(dbToSellPosition.left).plus(t.vol).toFixed(8)
    // Set new price
    dbToSellPosition.price = newPrice.toFixed(8)
    // DbToSellPosition.strategy = strategy ? strategy : dbToSellPosition.strategy

    dbToSellPosition.buyUpdate = moment().unix()
    await dbToSellPosition.save()
    console.log(`= price: ${dbToSellPosition.price}  volume: ${dbToSellPosition.left}`)

    console.log('    |-------updated tosell:', dbToSellPosition.id)
  } else {
    const toSellPosition = new ToSell()
    toSellPosition.pair = pair
    toSellPosition.price = t.price
    toSellPosition.vol = t.vol
    toSellPosition.left = t.vol
    toSellPosition.strategy = strategy ? strategy : ''

    toSellPosition.buyUpdate = moment().unix()
    await toSellPosition.save()
    console.log('    |-------added tosell:', toSellPosition.id)
  }

  await t.save()
}
