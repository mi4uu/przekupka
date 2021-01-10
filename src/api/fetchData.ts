import axios from 'axios'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { createTradeVars, trade } from '../bot/trade'
import { checkBalance } from './checkBalance'
import { makePrivateCall } from './makePrivateCall'
import { store } from './serverStore'
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
                  .sort((a, b) => b.value.minus(a.value).toNumber())[0]
                const cost = new BigNumber(transaction.cost).minus(new BigNumber(transaction.fee).multipliedBy(2))
                console.log(`cost = ${transaction.cost} - (${transaction.fee} * 2)`)
                const profit = cost.minus(new BigNumber(sold.value).multipliedBy(transaction.vol))
                console.log(`profit = cost - sold.value(${sold.value.toFixed(8)} * transaction.volume(${transaction.vol}) )`)
                store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

                store.pairs[pair].profit = store.pairs[pair].profit.plus(profit)

                console.log(JSON.stringify({ profit, profitSum: store.pairs[pair].profit.plus(profit) }))
              } else {
                const altName = Object.entries(store.assetPairs)
                  .filter(([k, v]) => v.altname === pair)
                  .map(([k, v]) => k)[0]

                store.toSell[pair].push({
                  value: new BigNumber(price),
                  id: store.tradeVars[pair].lastTransactionId,
                  timestamp: moment().unix(),
                })
                if (altName)
                  store.toSell[altName].push({
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
    axios.get('https://api.kraken.com/0/public/AssetPairs').then((result) =>{
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
          if (altName){
            if(!store.toSell[altName]) store.toSell[altName]=[]
            store.toSell[altName].push({
              value: new BigNumber(price),
              timestamp: t.opentm,
              id: k,
            })}
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
              const pairName = store.pairs[pair]?pair:altName
              store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

              const cost = new BigNumber(t.cost).minus(new BigNumber(t.fee).multipliedBy(2))
              const profit = cost.minus(new BigNumber(sold.value).multipliedBy(t.vol))
              if(profit.isGreaterThan(0)) console.log(`setting profit for ${pair}(${altName}, ${pairName}) to ${profit.toFixed(2)}`)
              store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
            }
          }
          if (altName && store.toSell[altName]) {
            const pairName = store.pairs[pair]?pair:altName

            const sold = store.toSell[altName]
              .sort((a, b) => b.value.minus(a.value).toNumber())
              .filter((p) => p.value.isLessThan(new BigNumber(price)))[0]
            if (sold) {
              store.toSell[altName] = store.toSell[altName].filter((p) => p.id !== sold.id)
              
              const cost = new BigNumber(t.cost).minus(new BigNumber(t.fee).multipliedBy(2))
              const profit = cost.minus(new BigNumber(sold.value).multipliedBy(t.vol))
              if(profit.isGreaterThan(0)) console.log(`setting profit for ${altName} to ${profit.toFixed(2)}`)

              store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
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
  const hours = 8
  const filterBeforeThisTime = moment().subtract(hours,'hours').unix()
  Object.entries(store.pairs).map(([pair,pairConfig])=>{
    const altName = store.assetPairs[pair]?.altname
    const lastTransactions = Object.entries(store.closedTransactions)
      .filter(([transactionId, transaction])=>transaction.descr.pair===pair || transaction.descr.pair===altName)
      .map(([transactionId, transaction])=>transaction)
      .filter(t=>t.status==='closed')
      .filter(t=>t.opentm>filterBeforeThisTime)
    if(lastTransactions.length === 0){
      const currentPrice = new BigNumber(store.ticks[store.ticks.length-1].pairs[pair].c[0])
      const newMax = currentPrice.plus(currentPrice.multipliedBy(1.02))
      const newMin = currentPrice.minus(currentPrice.multipliedBy(1.02))
      store.tradeVars[pair].lastTrasnactionPrice = currentPrice
      store.tradeVars[pair].highest = newMax
      store.tradeVars[pair].lowest = newMin

    }
  })
}, 1000*60*60)
