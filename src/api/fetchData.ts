import axios from 'axios'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { calculatePercentage } from '../bot/calculatePercentage'
import { createTradeVars, trade } from '../bot/trade'
import { checkBalance } from './checkBalance'
import { makePrivateCall } from './makePrivateCall'
import { store } from './serverStore'
import fs from 'fs'
export default function fetchData() {
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
              const oldLowest = store.tradeVars[pair].lowest
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
                  .filter((ts) => ts.value.isLessThanOrEqualTo(price))
                  .sort((a, b) => b.value.minus(a.value).toNumber())[0]
                const soldTransaction = store.closedTransactions[sold.id]
                const amount =
                  parseFloat(soldTransaction.vol) > parseFloat(transaction.vol) ? transaction.vol : soldTransaction.vol
                const transactionSoldPrice = new BigNumber(amount)
                  .multipliedBy(new BigNumber(transaction.price))
                  .minus(new BigNumber(transaction.fee))
                const transactionBuy = store.closedTransactions[sold.id]
                const transactionBuyPrice = new BigNumber(amount)
                  .multipliedBy(new BigNumber(transactionBuy.price))
                  .minus(new BigNumber(transactionBuy.fee))

                const profit = transactionSoldPrice.minus(transactionBuyPrice)
                if (!store.sold[pair]) store.sold[pair] = []
                store.sold[pair].push({
                  transactionBuyId: store.tradeVars[pair].lastTransactionId,
                  transactionSellId: sold.id,
                  profit: profit,
                  diff: calculatePercentage(new BigNumber(soldTransaction.vol), new BigNumber(transaction.vol))
                    .abs()
                    .toFixed(2),
                })
                console.log(
                  JSON.stringify({
                    transactionBuyPrice,
                    transactionSoldPrice,
                    profit,
                    pair,
                    transactionBuyId: sold.id,
                    transactionSellId: store.tradeVars[pair].lastTransactionId,
                  }),
                )
                store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

                store.pairs[pair].profit = store.pairs[pair].profit ? store.pairs[pair].profit.plus(profit) : profit

                console.log(JSON.stringify({ profit, profitSum: store.pairs[pair].profit.plus(profit) }))
              } else {
                const altName = Object.entries(store.assetPairs)
                  .filter(([k, v]) => v.altname === pair)
                  .map(([k, v]) => k)[0]

                store.toSell[pair].push({
                  value: new BigNumber(price),
                  id: store.tradeVars[pair].lastTransactionId,
                  timestamp: moment().unix(),
                  diff: calculatePercentage(oldLowest, new BigNumber(price)).abs().toFixed(2),
                })
                if (altName && altName !== pair)
                  store.toSell[altName].push({
                    value: new BigNumber(price),
                    id: store.tradeVars[pair].lastTransactionId,
                    timestamp: moment().unix(),
                    diff: calculatePercentage(oldLowest, new BigNumber(price)).abs().toFixed(2),
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

    // shortend the list of ticks
    if (store.ticks.length > 1000) {
      const div = Math.round(store.ticks.length / 10)
      const ticksArray = store.ticks
      const newArray = [ticksArray[0], ...ticksArray.filter((t, i) => i % div)]
      store.ticks = newArray
    }
  }, 2000)
}
let firstRun = !store.loaded // fetch if store is not loaded form file
const getClosedOrders = async () => {
  const start = moment().subtract(100, 'hours').unix()
  const { data } = await makePrivateCall('/0/private/ClosedOrders', { start })
  if (data.error.length > 0) console.log(data.error)
  if (!data.result) console.log(data)
  store.closedTransactions = data.result.closed
  if (firstRun) {
    firstRun = false
    axios.get('https://api.kraken.com/0/public/AssetPairs').then((result) => {
      store.assetPairs = result.data.result
      Object.entries(store.closedTransactions)
        .filter(([k, t]) => t.status === 'closed' && t.descr.type === 'buy')
        .map(([k, t]) => {
          const pair = t.descr.pair
          const price = t.price
          const altName = Object.entries(store.assetPairs)

            .filter(([k, v]) => v.altname === pair)

            .map(([k, v]) => k)[0]

          console.log(`altname for ${pair} is ${altName}`)
          if (!store.toSell[pair]) store.toSell[pair] = []
          if (altName && !store.toSell[altName]) store.toSell[pair] = []
          store.toSell[pair].push({
            value: new BigNumber(price),
            timestamp: t.opentm,
            id: k,
          })
          if (altName) {
            if (!store.toSell[altName]) store.toSell[altName] = []
            store.toSell[altName].push({
              value: new BigNumber(price),
              timestamp: t.opentm,
              id: k,
            })
          }
        })
      //remove sold
      Object.entries(store.closedTransactions)
        .filter(([k, t]) => t.status === 'closed' && t.descr.type === 'sell')
        .map(([k, t]) => {
          const pair = t.descr.pair
          const price = t.price
          // stupid kraken
          const altName = Object.entries(store.assetPairs)

            .filter(([k, v]) => v.altname === pair)

            .map(([k, v]) => k)[0]
          if (store.toSell[pair]) {
            const sold = store.toSell[pair]
              .sort((a, b) => b.value.minus(a.value).toNumber())
              .filter((p) => p.value.isLessThan(new BigNumber(price)))[0]
            if (sold) {
              const pairName = store.pairs[pair] ? pair : altName
              store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

              const cost = new BigNumber(t.cost).minus(new BigNumber(t.fee).multipliedBy(2))
              const profit = cost.minus(new BigNumber(sold.value).multipliedBy(t.vol))

              if (profit.isGreaterThan(0))
                console.log(`setting profit for ${pair}(${altName}, ${pairName}) to ${profit.toFixed(2)}`)
              //    store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
            }
          }
          if (altName && store.toSell[altName]) {
            const pairName = store.pairs[pair] ? pair : altName

            const sold = store.toSell[altName]
              .sort((a, b) => b.value.minus(a.value).toNumber())
              .filter((p) => p.value.isLessThan(new BigNumber(price)))[0]
            if (sold) {
              store.toSell[altName] = store.toSell[altName].filter((p) => p.id !== sold.id)

              const cost = new BigNumber(t.cost).minus(new BigNumber(t.fee).multipliedBy(2))
              const profit = cost.minus(new BigNumber(sold.value).multipliedBy(t.vol))
              if (profit.isGreaterThan(0)) console.log(`setting profit for ${altName} to ${profit.toFixed(2)}`)

              //         store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
            }
          }
        })
    })
  }
}
setTimeout(() => {
  getClosedOrders()
}, 3000)

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

setInterval(() => {
  // lets check if pair cant sell anything for hours
  const hours = 24
  const filterBeforeThisTime = moment().subtract(hours, 'hours').unix()
  Object.entries(store.pairs).map(([pair, pairConfig]) => {
    const diff = calculatePercentage(
      store.tradeVars[pair].highest,
      new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].c[0]),
    ).abs()
    const altName = store.assetPairs[pair]?.altname
    const lastTransactions = Object.entries(store.closedTransactions)
      .filter(([transactionId, transaction]) => transaction.descr.pair === pair || transaction.descr.pair === altName)
      .map(([transactionId, transaction]) => transaction)
      .filter((t) => t.status === 'closed')
      .filter((t) => t.opentm > filterBeforeThisTime)
    if (lastTransactions.length === 0 || diff.isGreaterThan(100)) {
      const currentPrice = new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].c[0])
      const newMax = currentPrice.multipliedBy(1.01)
      const newMin = currentPrice.multipliedBy(1.01)
      console.log('PAIR HEALTHY CHECK for ' + pair)
      store.tradeVars[pair].lastTrasnactionPrice = currentPrice
      store.tradeVars[pair].highest = currentPrice
      store.tradeVars[pair].lowest = currentPrice
    }
  })
}, 1000 * 60 * 60)

setInterval(() => {
  // save store to file
  fs.writeFile('store.json', JSON.stringify(store), function (err) {
    console.log('error writing store to file')
    console.log(err)
  })
}, 1000 * 60)
setInterval(() => {
  // save store to file
  fs.writeFile('store2.json', JSON.stringify(store), function (err) {
    console.log('error writing store to file')
    console.log(err)
  })
}, 1670 * 60)