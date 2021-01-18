import moment from 'moment'
import {store} from '../server-store'
import {makePrivateCall} from './make-private-call'

export const getClosedOrders = async () => {
  const start = moment().subtract(100, 'hours').unix()
  const {data} = await makePrivateCall('/0/private/ClosedOrders', {start})
  if (data.error.length > 0) {
    console.log(data.error)
    return null
  }

  if (!data.result) {
    console.log(data)
    return null
  }

  const closedTransactions = Object.entries(data.result.closed)
  const receivedTransactions = Object.fromEntries(
    closedTransactions.map(([id, transaction]: [string, any]) => [
      id,
      {
        pair: transaction.pair,
        refid: id,
        userref: transaction.userref,
        status: transaction.status,
        opentm: transaction.opentm,
        vol: transaction.vol,
        fee: transaction.fee,
        price: transaction.price,
        type: transaction.type,
      },
    ]),
  )

  store.closedTransactions = {
    ...receivedTransactions,
    ...store.closedTransactions,
  }
}
