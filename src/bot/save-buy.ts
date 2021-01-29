import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'

export async function saveBuy(pair: Pair, t: ClosedTransaction) {
  let toSellPosition = (await ToSell.find({pair, price: t.price, filled: false}))[0]
  if (toSellPosition) {
    toSellPosition.vol = bn(toSellPosition.vol).plus(t.vol).toFixed(pair.coin0Precision)
    toSellPosition.left = bn(toSellPosition.left).plus(t.vol).toFixed(pair.coin0Precision)
    toSellPosition.filled = false
  } else {
    toSellPosition = new ToSell()
    toSellPosition.pair = pair
    toSellPosition.price = t.price
    toSellPosition.vol = t.vol
    toSellPosition.left = t.vol
  }

  await toSellPosition.save()
}
