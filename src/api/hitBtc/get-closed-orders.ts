import moment from 'moment'
import {LessThan as lessThan, getRepository} from 'typeorm'
import {saveBuy} from '../../bot/save-buy'
import {saveSell} from '../../bot/save-sell'
import {ClosedTransaction, TransactionType} from '../../db/entity/closed-transactions'
import {Pair} from '../../db/entity/pair'
import {ToSell} from '../../db/entity/to-sell'
import {bn} from '../../utils/bn'
import {store} from '../server-store'
import {makePrivateCall, makePrivateGetCall} from './make-private-call'

type IHitBtcTradingHistory = Array<{
  id: number
  clientOrderId: string
  symbol: string
  side: string
  quantity: string
  price: string
  fee: string
  timestamp: string
}>
export const getClosedOrders = async () => {
  const start = moment().subtract(1, 'minutes').toISOString()
  const {data}: {data: IHitBtcTradingHistory} = await makePrivateGetCall(`/history/trades?from=${start}`, {})

  data.forEach(async (transaction) => {
    const exist = Boolean(await ClosedTransaction.count({id: transaction.id}))
    if (!exist) {
      const pair = await Pair.findOne(transaction.symbol)
      if (pair) {
        const t = new ClosedTransaction()
        t.id = transaction.id
        t.status = 'closed'
        t.pair = pair
        t.refid = transaction.clientOrderId
        t.userref = transaction.id
        t.opentm = moment(transaction.timestamp).unix()
        t.vol = transaction.quantity
        t.fee = transaction.fee
        t.price = transaction.price
        t.type = transaction.side as TransactionType
        await t.save()
        console.log('TRANSACTION!!!!!', JSON.stringify(transaction))
        store.tradeVars[pair.name].lastTransactionPrice = t.price
        await (t.type === 'buy' ? saveBuy(pair, t) : saveSell(pair, t))
      }
    }
  })
}
