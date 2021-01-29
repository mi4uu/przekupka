import {store} from '#api/server-store'
import {saveBuy} from '#bot/save-buy'
import {saveSell} from '#bot/save-sell'
import {ClosedTransaction, TransactionType} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {bn} from '#utils/bn'
import moment from 'moment'
import {makePrivateCall, makePrivateDeleteCall, makePrivateGetCall} from './make-private-call'
export interface IFill {
  price: string
  qty: string
  commision: string
  commisionAsset: string
}
export interface IOrderInfo {
  symbol: string
  orderId: number
  orderListId: -1 // Unless part of an OCO, the value will always be -1.
  clientOrderId: string
  price: string
  origQty: string
  executedQty: string
  cummulativeQuoteQty: string
  status: string
  timeInForce: string
  type: string
  side: string
  stopPrice: string
  icebergQty: string
  time: 1499827319559
  updateTime: number
  isWorking: boolean
  origQuoteOrderQty: string
  fills: IFill[]
}
function generateToken() {
  return Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    .toString(36)
    .slice(0, 10)
}

export async function makeOffer(pair: string, price: string, volume: string, type: string) {
  const myId = generateToken()
  try {
    store.tradeVars[pair].wait = 10
    const dbPair = await Pair.findOneOrFail(pair)
    const {data: order} = await makePrivateCall('/order', {
      symbol: pair,
      side: type,
      price,
      quantity: bn(volume).toFixed(Number.parseInt(dbPair.step, 10)),
      recvWindow: 5000,
      timeInForce: 'IOC',
      type: 'LIMIT',
      newClientOrderId: myId,
    })
    const orderId = order.orderId
    store.tradeVars[pair].lastTransactionPrice = price
    order.fills.map(async (fill) => {
      const t = new ClosedTransaction()
      t.id = order.orderId
      t.status = 'closed'
      t.pair = dbPair
      t.refid = myId
      t.userref = order.orderId
      t.opentm = moment().unix()
      t.vol = fill.qty
      t.fee = fill.commision
      t.price = fill.price
      t.type = order.side === 'SELL' ? TransactionType.Sell : TransactionType.Buy
      await t.save()
      store.tradeVars[dbPair.name].lastTransactionPrice = t.price
      await (t.type === 'buy' ? saveBuy(dbPair, t) : saveSell(dbPair, t))
    })

    console.log(order.side, pair, order.status, myId, {executedQty: order.executedQty})
    console.log(
      '-------------------------------------------------------------------------------------------------------------',
    )
    return orderId
  } catch (error: any) {
    console.log(
      '-------------------------------------------ERROR IN MAKING OFFER!!!!!!!!!!!!-------------------------------------------',
    )
    console.log(error.response.data)

    store.tradeVars[pair].wait = 10000

    return false
  }
}
