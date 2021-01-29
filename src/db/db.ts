import {fillTradeVars, store} from '#src/api/server-store'
import {saveBuy} from '#src/bot/save-buy'
import {saveSell} from '#src/bot/save-sell'
import moment from 'moment'
import * as rm from 'reflect-metadata'
import {createConnection} from 'typeorm'
import {ClosedTransaction, TransactionType} from './entity/closed-transactions'
import {Pair} from './entity/pair'

export const connect = async () => {
  await createConnection()
  fillTradeVars(store)
    .then(() => {
      console.log('tradeVars filled')
    })
    .catch((error) => {
      console.log('error filling store', error)
    })

  // Const transaction = {
  //   id: 12341,
  //   symbol: 'XNSBTC',
  //   clientOrderId: '123457',
  //   quantity: '0.18',
  //   fee: '0.0000',
  //   price: '0.00000022',
  //   side: 'buy',
  //   timestamp: '2017-05-17T12:30:57.848Z',
  // }
  // const pair = await Pair.findOne(transaction.symbol)
  // const t = new ClosedTransaction()
  // t.id = transaction.id
  // t.pair = pair!
  // t.refid = transaction.clientOrderId
  // t.userref = transaction.id
  // t.opentm = moment(transaction.timestamp).unix()
  // t.vol = transaction.quantity
  // t.fee = transaction.fee
  // t.price = transaction.price
  // t.status = 'closed'
  // t.type = transaction.side as TransactionType
  // await t.save()
  // await (t.type === 'buy' ? saveBuy(pair!, t) : saveSell(pair!, t))
}
