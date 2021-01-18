import moment from 'moment'
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
  const start = moment().subtract(200, 'hours').toISOString()
  const {data}: {data: IHitBtcTradingHistory} = await makePrivateGetCall(`/history/trades?from=${start}`, {})
  const receivedTransactions = Object.fromEntries(
    data.map((transaction) => [
      String(transaction.id),
      {
        pair: transaction.symbol,
        refid: transaction.clientOrderId,
        userref: transaction.id,
        status: 'closed',
        opentm: moment(transaction.timestamp).unix(),
        vol: transaction.quantity,
        fee: transaction.fee,
        price: transaction.price,
        type: transaction.side,
      },
    ]),
  )

  store.closedTransactions = {
    ...receivedTransactions,
    // ...store.closedTransactions,
  }
}
