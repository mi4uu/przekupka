import {store} from '#api/server-store'
import {saveBuy} from '#bot/save-buy'
import {saveSell} from '#bot/save-sell'
import {ClosedTransaction, TransactionType} from '#db/entity/closed-transactions'
import {Pair} from '#db/entity/pair'
import {bn} from '#utils/bn'
import moment from 'moment'
import {makePrivateCall, makePrivateDeleteCall, makePrivateGetCall} from './make-private-call'
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
    const dbPair = await Pair.findOne(pair)
    const {status, data} = await makePrivateCall('/order', {
      symbol: pair,
      side: type,
      price,
      quantity: bn(volume).toFixed(Number.parseInt(dbPair.step, 10)),
      recvWindow: 5000,
      timeInForce: 'GTC',
      type: 'LIMIT',
      newClientOrderId: myId,
    })
    const orderId = data.orderId
    store.tradeVars[pair].lastTransactionPrice = price
    // CANCEL IT AFTER SOME TIME
    setTimeout(async () => {
      const {data: order}: {data: IOrderInfo} = await makePrivateGetCall(`/order`, {
        symbol: pair,
        origClientOrderId: myId,
        recvWindow: 15000,
      })
      const dbPair = await Pair.findOne(order.symbol)
      if (bn(order.executedQty).isGreaterThan('0') && dbPair) {
        const t = new ClosedTransaction()
        t.id = order.orderId
        t.status = 'closed'
        t.pair = dbPair
        t.refid = myId
        t.userref = order.orderId
        t.opentm = moment().unix()
        t.vol = order.executedQty
        t.fee = bn(order.executedQty).multipliedBy(order.price).multipliedBy('0.001').toFixed(8)
        t.price = order.price
        t.type = order.side === 'SELL' ? TransactionType.Sell : TransactionType.Buy
        await t.save()
        store.tradeVars[dbPair.name].lastTransactionPrice = t.price
        await (t.type === 'buy' ? saveBuy(dbPair, t) : saveSell(dbPair, t))
      }

      console.log(order.side, pair, order.status, myId)

      if (order.status !== 'FILLED') {
        console.log(order, JSON.stringify(order, null, 2))

        try {
          const {data: canceled} = await makePrivateDeleteCall(`/order`, {
            symbol: pair,
            origClientOrderId: myId,
            recvWindow: 15000,
          })
          console.log(canceled, JSON.stringify(canceled, null, 2))
        } catch (error) {
          console.log(error.response.data)
        }
      }
    }, 4000)
    return orderId
  } catch (error: any) {
    console.log(error)
    console.log(
      '-------------------------------------------ERROR IN MAKING OFFER!!!!!!!!!!!!-------------------------------------------',
    )
    store.tradeVars[pair].wait = 10000

    return false
  }
}
