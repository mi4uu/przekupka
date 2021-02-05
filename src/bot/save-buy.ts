import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import moment from 'moment'

export async function saveBuy(pair: Pair, t: ClosedTransaction) {
  const dbToSellPositions = await ToSell.find({pair, price: t.price, filled: false})
  if (dbToSellPositions.length > 0) {
    const dbToSellPosition = dbToSellPositions[0]
    dbToSellPosition.vol = bn(dbToSellPosition.vol).plus(t.vol).toFixed(8)
    dbToSellPosition.left = bn(dbToSellPosition.left).plus(t.vol).toFixed(8)

    dbToSellPosition.buyUpdate = moment().unix()
    await dbToSellPosition.save()
    console.log('    |-------updated tosell:', dbToSellPosition.id)
  } else {
    const toSellPosition = new ToSell()
    toSellPosition.pair = pair
    toSellPosition.price = t.price
    toSellPosition.vol = t.vol
    toSellPosition.left = t.vol

    toSellPosition.buyUpdate = moment().unix()
    await toSellPosition.save()
    console.log('    |-------added tosell:', toSellPosition.id)
  }

  await t.save()
}
