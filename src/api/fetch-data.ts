import moment from 'moment'
import {calculatePercentage} from '../bot/calculate-percentage'
import {store} from './server-store'
import fs from 'fs'
import {bn} from '../utils/bn'
import {getTick} from '../bot/get-tick'
import api from './api'
export default function fetchData() {
  const setBalance = () => {
    api
      .checkBalance()
      .then((result) => {
        store.balance = result
      })
      .catch((error) => {
        console.log(error)
      })
  }

  setBalance()

  setInterval(setBalance, 20000)

  setInterval(getTick, 2000)
}

setTimeout(async () => {
  await api.getClosedOrders()
}, 3000)

setInterval(async () => {
  await api.getClosedOrders()
}, 10000)

setInterval(() => {
  // Lets check if pair cant sell anything for hours
  const hours = 48
  const filterBeforeThisTime = moment().subtract(hours, 'hours').unix()
  Object.entries(store.pairs).forEach(([pair, _pairConfig]) => {
    const diff = calculatePercentage(
      store.tradeVars[pair].highest,
      bn(store.ticks[store.ticks.length - 1].pairs[pair].c),
    ).abs()
    const altName = store.assetPairs[pair]?.altname
    const lastTransactions = Object.entries(store.closedTransactions)
      .filter(([_transactionId, transaction]) => transaction.pair === pair || transaction.pair === altName)
      .map(([_transactionId, transaction]) => transaction)
      .filter((t) => t.status === 'closed')
      .filter((t) => t.opentm > filterBeforeThisTime)
    if (lastTransactions.length === 0 || diff.isGreaterThan(100)) {
      const currentPrice = bn(store.ticks[store.ticks.length - 1].pairs[pair].c)

      console.log('PAIR HEALTHY CHECK for ' + pair)
      store.tradeVars[pair].lastTransactionPrice = currentPrice.toFixed(8)
      store.tradeVars[pair].highest = currentPrice.toFixed(8)
      store.tradeVars[pair].lowest = currentPrice.toFixed(8)
    }
  })
}, 1000 * 60 * 60)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    // Save store to file
    fs.writeFile('store.json', JSON.stringify(store), (error) => {
      if (error) {
        console.log('error writing store.json to file')
        console.log(error)
      }
    })
  }, 1000 * 60)
  setInterval(() => {
    // Save store to file
    fs.writeFile('store2.json', JSON.stringify(store), (error) => {
      if (error) {
        console.log('error writing store2.json to file')
        console.log(error)
      }
    })
  }, 2670 * 60)
}
