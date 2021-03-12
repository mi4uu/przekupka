import {createTradeVars, store} from '#api/server-store'
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
  commission: string
  commissionAsset: string
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
    .slice(0, 6)
}

export async function makeOffer(pair: string, price: string, volume: string, type: string, strategy?: string) {
  const myId = generateToken()
  try {
    if (!store.tradeVars[pair]) store.tradeVars[pair] = createTradeVars(pair)[1]
    store.tradeVars[pair].wait = 0
    const dbPair = await Pair.findOneOrFail(pair)
    const {data: order}: {data: IOrderInfo} = await makePrivateCall('/order', {
      symbol: pair,
      side: type,
      // Price,
      quantity: bn(volume).toFixed(Number.parseInt(dbPair.step, 10)),
      recvWindow: 5000,
      // TimeInForce: 'FOK',
      type: 'MARKET',
      newClientOrderId: myId,
    })
    const orderId = order.orderId
    if (order.status === 'EXPIRED') store.tradeVars[pair].wait = 0
    console.log(
      `|---[TRADE]-----[${order.side}]-[${pair}]-[status:${order.status}]-[qty:${order.executedQty}]-----------------------------------------------------`,
    )
    for (const fill of order.fills) {
      const t = new ClosedTransaction()
      t.status = 'closed'
      t.pair = dbPair
      t.refid = myId
      t.userref = 111
      t.opentm = moment().unix()
      t.vol = fill.qty
      t.fee = fill.commission
      t.price = fill.price
      t.type = order.side === 'SELL' ? TransactionType.Sell : TransactionType.Buy

      store.tradeVars[dbPair.name].lastTransactionPrice = t.price
      if (t.type === 'buy')
        store.balance[dbPair.coin1] = bn(store.balance[dbPair.coin1])
          .minus(bn(fill.price).multipliedBy(fill.qty))
          .toFixed(8)
      console.log(`    |--[FILL]----[${fill.qty}]---[fee: ${fill.commission} ${fill.commissionAsset}]`)
      await (t.type === 'buy' ? saveBuy(dbPair, t, strategy) : saveSell(dbPair, t))
      store.tradeVars[pair].canBuy = 0
    }

    console.log('')

    return orderId
  } catch (error: any) {
    console.log(
      '-------------------------------------------ERROR IN MAKING OFFER!!!!!!!!!!!!-------------------------------------------',
    )
    console.log(error?.response?.data || error?.response || error)
    // Store.tradeVars[pair].wait = 30

    return false
  }
}
