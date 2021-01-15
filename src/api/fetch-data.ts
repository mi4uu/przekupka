import axios from 'axios'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import {calculatePercentage} from '../bot/calculate-percentage'
import {checkBalance} from './check-balance'
import {makePrivateCall} from './make-private-call'
import {store} from './server-store'
import fs from 'fs'
import {bn} from '../utils/bn'
import {getTick} from '../bot/get-tick'
export default function fetchData() {
  const setBalance = () => {
    checkBalance()
      .then((result) => {
        store.balance = result.result
      })
      .catch((error) => {
        console.log(error)
      })
  }

  setBalance()

  setInterval(setBalance, 20000)

  setInterval(getTick, 2000)
}

let firstRun = !store.storeLoaded // Fetch if store is not loaded form file
const getClosedOrders = async () => {
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

  store.closedTransactions = data.result.closed
  if (firstRun) {
    firstRun = false
    axios
      .get('https://api.kraken.com/0/public/AssetPairs')
      .then((result) => {
        store.assetPairs = result.data.result
        Object.entries(store.closedTransactions)
          .filter(([_k, t]) => t.status === 'closed' && t.descr.type === 'buy')
          .forEach(([k, t]) => {
            const pair = t.descr.pair
            const price = t.price
            const altName = Object.entries(store.assetPairs)

              .filter(([_k, v]) => v.altname === pair)

              .map(([k, _v]) => k)[0]

            console.log(`altname for ${pair} is ${altName}`)
            if (!store.toSell[pair]) store.toSell[pair] = []
            if (altName && !store.toSell[altName]) store.toSell[pair] = []
            store.toSell[pair].push({
              value: price,
              timestamp: t.opentm,
              id: k,
              diff: '0S',
            })
            if (altName) {
              if (!store.toSell[altName]) store.toSell[altName] = []
              store.toSell[altName].push({
                value: price,
                timestamp: t.opentm,
                id: k,
                diff: '0',
              })
            }
          })
        // Remove sold
        Object.entries(store.closedTransactions)
          .filter(([_k, t]) => t.status === 'closed' && t.descr.type === 'sell')
          .forEach(([_k, t]) => {
            const pair = t.descr.pair
            const price = t.price
            // Stupid kraken
            const altName = Object.entries(store.assetPairs)

              .filter(([_k, v]) => v.altname === pair)

              .map(([k, _v]) => k)[0]
            if (store.toSell[pair]) {
              const sold = store.toSell[pair]
                .sort((a, b) => bn(b.value).minus(a.value).toNumber())
                .find((p) => bn(p.value).isLessThan(new BigNumber(price)))
              if (sold) {
                const pairName = store.pairs[pair] ? pair : altName
                store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

                const cost = bn(t.cost).minus(bn(t.fee).multipliedBy(2))
                const profit = cost.minus(bn(sold.value).multipliedBy(t.vol))

                if (profit.isGreaterThan(0))
                  console.log(`setting profit for ${pair}(${altName}, ${pairName}) to ${profit.toFixed(2)}`)
                //    Store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
              }
            }

            if (altName && store.toSell[altName]) {
              //           Const pairName = store.pairs[pair] ? pair : altName

              const sold = store.toSell[altName]
                .sort((a, b) => bn(b.value).minus(a.value).toNumber())
                .find((p) => bn(p.value).isLessThan(new BigNumber(price)))
              if (sold) {
                store.toSell[altName] = store.toSell[altName].filter((p) => p.id !== sold.id)

                const cost = new BigNumber(t.cost).minus(new BigNumber(t.fee).multipliedBy(2))
                const profit = cost.minus(new BigNumber(sold.value).multipliedBy(t.vol))
                if (profit.isGreaterThan(0)) console.log(`setting profit for ${altName} to ${profit.toFixed(2)}`)

                //         Store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
              }
            }
          })
      })
      .catch((error) => {
        console.log('there was error getting closed orders:')
        console.log(error)
      })
  }
}

setTimeout(async () => {
  await getClosedOrders()
}, 3000)

setInterval(async () => {
  await getClosedOrders()
}, 10000)
const getTradeBalance = async () => {
  const {data} = await makePrivateCall('/0/private/TradeBalance', {})
  if (data.error.length > 0) console.log(data.error)
  if (!data.result) console.log(data)
  store.tradeBalance = data.result
}

setImmediate(async () => {
  await getTradeBalance()
})

setInterval(async () => {
  await getTradeBalance()
}, 100000)

setInterval(() => {
  // Lets check if pair cant sell anything for hours
  const hours = 24
  const filterBeforeThisTime = moment().subtract(hours, 'hours').unix()
  Object.entries(store.pairs).forEach(([pair, _pairConfig]) => {
    const diff = calculatePercentage(
      store.tradeVars[pair].highest,
      new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].c),
    ).abs()
    const altName = store.assetPairs[pair]?.altname
    const lastTransactions = Object.entries(store.closedTransactions)
      .filter(([_transactionId, transaction]) => transaction.descr.pair === pair || transaction.descr.pair === altName)
      .map(([_transactionId, transaction]) => transaction)
      .filter((t) => t.status === 'closed')
      .filter((t) => t.opentm > filterBeforeThisTime)
    if (lastTransactions.length === 0 || diff.isGreaterThan(100)) {
      const currentPrice = new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].c)

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
