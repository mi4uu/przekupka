import axios from 'axios'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { createTradeVars, trade } from '../bot/trade'
import { checkBalance } from './checkBalance'
import { makePrivateCall } from './makePrivateCall'
import { store } from './serverStore'
export default function fetchData() {
  axios.get('https://api.kraken.com/0/public/AssetPairs').then((result) => (store.assetPairs = result.data.result))

  const setBalance = () => checkBalance().then((result) => (store.balance = result.result))
  setBalance()
  setInterval(setBalance, 20000)
  setInterval(() => {
    axios.get('https://api.kraken.com/0/public/Ticker?pair=' + Object.keys(store.pairs).join(',')).then((results) => {
      const ticks = store.ticks
      if (ticks.length > 100) ticks.shift()
      ticks.push({ timestamp: moment().unix(), pairs: results.data.result })
      store.ticks = ticks
      // trade

      const activePairs = Object.entries(store.pairs)
        .filter(([_, config]) => config.active)
        .map(([key]) => key)
      for (const pair of activePairs) {
        const wait = store.tradeVars[pair].wait
        if (wait <= 0) trade(pair)
        else {
          if (wait === 1) {
            const transaction = store.closedTransactions[store.tradeVars[pair].lastTransactionId]
            const lastStatus = transaction?.status
            if (lastStatus === 'closed') {
              store.tradeVars[pair].highest = new BigNumber(transaction.price)
              store.tradeVars[pair].lowest = new BigNumber(transaction.price)
              store.tradeVars[pair].buy = false
              store.tradeVars[pair].sell = false
              store.tradeVars[pair].wait = 0
              store.tradeVars[pair].lastTrasnactionPrice = new BigNumber(
                transaction.price
              )
              if (store.tradeVars[pair].lastTransactions.length > 2) store.tradeVars[pair].lastTransactions.shift()
              store.tradeVars[pair].lastTransactions.push(
                store.closedTransactions[store.tradeVars[pair].lastTransactionId].descr.type[0] as 's' | 'b',
              )
            }
            if (lastStatus === 'expired') {
              store.tradeVars[pair].wait = 0
            }
            if (!lastStatus) {
              console.log(store.tradeVars[pair].lastTransactionId + ' not found, will wait longer')
            }
          } else store.tradeVars[pair].wait = wait - 1
        }
      }
    })
  }, 2000)
}
const getClosedOrders = async () => {
  const start = moment().subtract(2, 'hours').unix()
  const { data } = await makePrivateCall('/0/private/ClosedOrders', { start })
  if (data.error.length > 0) console.log(data.error)
  if (!data.result) console.log(data)
  store.closedTransactions = data.result.closed
}
getClosedOrders()

setInterval(() => {
  getClosedOrders()
}, 10000)
const getTradeBalance = async () => {
  const { data } = await makePrivateCall('/0/private/TradeBalance',{})
  if (data.error.length > 0) console.log(data.error)
  if (!data.result) console.log(data)
  store.tradeBalance = data.result
}
getTradeBalance()
  
setInterval(() => {
  getTradeBalance()
}, 100000)