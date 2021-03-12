import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import moment from 'moment'

export async function saveBuy(pair: Pair, t: ClosedTransaction, strategy?: string) {
  const dbToSellPositions = await ToSell.find({pair, filled: false, dust: false})
  const toSellPosition = new ToSell()
  toSellPosition.pair = pair
  toSellPosition.price = t.price
  toSellPosition.vol = t.vol
  toSellPosition.left = t.vol
  toSellPosition.strategy = strategy || ''
  toSellPosition.buyUpdate = moment().unix()

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
    const vol = bn(dbToSellPosition.vol).plus(t.vol).toFixed(8)
    const left = bn(dbToSellPosition.left).plus(t.vol).toFixed(8)
    // Set new price
    const price = newPrice.toFixed(8)

    toSellPosition.price = price
    toSellPosition.vol = vol
    toSellPosition.left = left
    toSellPosition.safeBuy = dbToSellPosition.safeBuy + 1
    await dbToSellPosition.remove()

    //   Await dbToSellPosition.save()
    console.log(`= price: ${price}  volume: ${left}`)

    console.log('    |-------(removed) tosell:', dbToSellPosition.id)
  }

  await toSellPosition.save()
  console.log('    |-------added tosell:', toSellPosition.id)

  await t.save()
}
