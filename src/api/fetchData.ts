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
      // ( 30 = minute ) *60 = hour )
      if (ticks.length > 30 * 60 * 24) ticks.shift()
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
              const price = new BigNumber(transaction.price)
              store.tradeVars[pair].highest = price
              store.tradeVars[pair].lowest = price
              store.tradeVars[pair].buy = false
              store.tradeVars[pair].sell = false
              store.tradeVars[pair].wait = 0
              store.tradeVars[pair].lastTrasnactionPrice = price
              if (store.tradeVars[pair].lastTransactions.length >= 2) store.tradeVars[pair].lastTransactions.shift()
              store.tradeVars[pair].lastTransactions.push(transaction.descr.type[0] as 's' | 'b')
              console.log(transaction.descr.type[0])
              if (transaction.descr.type === 'sell') {
                const sold = store.toSell[pair]
                  .sort((a, b) => b.value.minus(a.value).toNumber())
                  .filter((p) => p.value.isLessThan(price))[0]
                store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)
                const profit = new BigNumber(transaction.cost).minus(new BigNumber(transaction.fee).multipliedBy(2))

                store.pairs[pair].profit = store.pairs[pair].profit.plus(profit)
                console.log(JSON.stringify({ profit, profitSum: store.pairs[pair].profit.plus(profit) }))
              } else {
                store.toSell[pair].push({
                  value: new BigNumber(price),
                  id: store.tradeVars[pair].lastTransactionId,
                  timestamp: moment().unix(),
                })
              }
            } else {
              console.log({ lastStatus, transaction: JSON.stringify(transaction) })
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
let firstRun = true
const getClosedOrders = async () => {
  const start = moment().subtract(24, 'hours').unix()
  const { data } = await makePrivateCall('/0/private/ClosedOrders', { start })
  if (data.error.length > 0) console.log(data.error)
  if (!data.result) console.log(data)
  store.closedTransactions = data.result.closed
  if (firstRun) {
    firstRun = false
    Object.entries(store.closedTransactions)
      .filter(([k, t]) => t.status === 'closed' && t.descr.type === 'buy')
      .map(([k, t]) => {
        const pair = t.descr.pair
        const price = t.price
        if (!store.toSell[pair]) store.toSell[pair] = []
        store.toSell[pair].push({
          value: new BigNumber(price),
          timestamp: t.opentm,
          id: k,
        })
      })
  }
}
getClosedOrders()

setInterval(() => {
  getClosedOrders()
}, 10000)
const getTradeBalance = async () => {
  const { data } = await makePrivateCall('/0/private/TradeBalance', {})
  if (data.error.length > 0) console.log(data.error)
  if (!data.result) console.log(data)
  store.tradeBalance = data.result
}
getTradeBalance()

setInterval(() => {
  getTradeBalance()
}, 100000)
 