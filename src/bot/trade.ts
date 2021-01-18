import BigNumber from 'bignumber.js'
import {store, ITradeVars} from '../api/server-store'
import {shouldBuyNow, shouldSellNow} from './make-desision'
import {processData} from './process-data'

import moment from 'moment'
import {calculatePercentage} from './calculate-percentage'
import {bn} from '../utils/bn'
import api from '../api/api'
import {IgnorePlugin} from 'webpack'

export const buyFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  console.log(pair, 'BUY!!!', price.toFixed(8))
  const result = await api.makeBuyOffer(pair, price.toFixed(8), store.pairs[pair].volume)
  if (result) {
    vars.lastTransactionId = result
    vars.wait = 20
  } else {
    console.log('transaction failed')
    vars.buy = false
  }
}

export const sellFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  console.log(pair, 'SELL!!!', price.toFixed(8))

  const result = await api.makeSellOffer(pair, price.toFixed(8), store.pairs[pair].volume)
  if (result) {
    vars.lastTransactionId = result
    vars.wait = 20
  } else {
    console.log('transaction failed')
    vars.sell = false
  }
}

export const createTradeVars = (pair: string) => {
  store.tradeVars[pair] = {
    lastTransactions: [],
    highest: '0',
    lowest: '0',
    buy: false,
    sell: false,
    wait: 0,
    lastTransactionId: '',
    lastActionTime: moment().unix(),
  }
  const altName = Object.entries(store.assetPairs)
    .filter(([k, v]) => v.altname === pair)
    .map(([k, v]) => k)[0]
  if (!store.toSell[pair]) store.toSell[pair] = []
  if (altName && !store.toSell[altName]) store.toSell[altName] = []
}

export const trade = (pair: string) => {
  const vars = store.tradeVars[pair]
  const pairParameters = store.pairs[pair]
  const price = store.ticks[store.ticks.length - 1].pairs[pair].a
  const askPrice = store.ticks[store.ticks.length - 1].pairs[pair].c
  const bidPrice = store.ticks[store.ticks.length - 1].pairs[pair].b

  // For initial values
  if (!vars.lastTransactionPrice) {
    vars.lastTransactionPrice = price
    vars.lowest = price
    vars.highest = price
  }

  if (bn(bidPrice).isGreaterThan(vars.highest) && calculatePercentage(bidPrice, vars.highest).abs().isLessThan(10)) {
    vars.highest = bidPrice
  }

  const balanceCoin0 = bn(store.balance[store.pairs[pair].coin0])
  const balanceCoin1 = bn(store.balance[store.pairs[pair].coin1])
  const hourBefore = moment().subtract(1, 'hour').unix()

  if (balanceCoin1.isGreaterThan(bn(askPrice).multipliedBy(store.pairs[pair].volume))) {
    // Can we afford that?
    vars.cantAffordToBuy = false

    if (store.toSell[pair].filter((p) => p.timestamp > hourBefore).length < store.pairs[pair].buyPerHour) {
      // Limit buy per h
      vars.limitBuyPerHourReached = false

      const marketLiquidity = calculatePercentage(askPrice, bidPrice)
      const changeFromLastTransaction = calculatePercentage(vars.lastTransactionPrice, askPrice)
      const minDiffToBuy = bn(pairParameters.changeToTrend).plus(marketLiquidity)
      if (changeFromLastTransaction.isGreaterThan(minDiffToBuy)) {
        vars.buy = true
        vars.lastActionTime = moment().unix()
        if (bn(vars.lowest).isGreaterThan(bn(askPrice))) vars.lowest = askPrice
        const diffToLowest = calculatePercentage(askPrice, vars.lowest)
        if (diffToLowest.isGreaterThanOrEqualTo(minDiffToBuy)) {
          buyFn(pair, bn(askPrice), vars).catch((error) => {
            console.log('cant buy', error)
          })
        }
      } else {
        vars.buy = false
        vars.lowest = askPrice
      }
    } else {
      vars.limitBuyPerHourReached = true
      vars.buy = false
      vars.lowest = askPrice
    }
  } else {
    vars.cantAffordToBuy = true
    vars.buy = false
    vars.lowest = askPrice
  }

  // Did we buy anything to sell ?
  const minProfit = bn(bidPrice).multipliedBy(bn(pairParameters.changeToTrend).dividedBy(100))
  const minPrice = bn(bidPrice).plus(minProfit)
  const candidatesToSell = store.toSell[pair].filter((p) => bn(p.value).isLessThan(minPrice))
  // If (pair === 'NEBLBTC') {
  //   console.log(
  //     JSON.stringify({
  //       sell: vars.sell,
  //       diff: calculatePercentage(
  //         bidPrice,
  //         candidatesToSell.sort((a, b) => Number.parseFloat(a.value) - Number.parseFloat(b.value))[0].value,
  //       ),
  //       changetotrend: pairParameters.changeToTrend,
  //       balance: balanceCoin0.isGreaterThanOrEqualTo(store.pairs[pair].volume),
  //       volume: store.pairs[pair].volume,
  //     }),
  //   )
  // }

  if (candidatesToSell.length > 0) {
    vars.noAssetsToSell = false

    if (balanceCoin0.isGreaterThanOrEqualTo(store.pairs[pair].volume)) {
      const diffToHighestPrice = calculatePercentage(bidPrice, vars.highest)
      // The lowest buy
      const lastBuy = candidatesToSell.sort((a, b) => Number.parseFloat(a.value) - Number.parseFloat(b.value))[0]

      vars.sell = calculatePercentage(bidPrice, lastBuy.value).isGreaterThan(bn(pairParameters.changeToTrend))

      if (vars.sell) {
        vars.lastActionTime = moment().unix()
        if (bn(vars.highest).isLessThan(bn(bidPrice))) vars.highest = bidPrice
        // Trend is changing, lets sell it
        if (diffToHighestPrice.isLessThanOrEqualTo(bn(pairParameters.changeToTrend).multipliedBy(-1))) {
          sellFn(pair, bn(bidPrice), vars).catch((error) => {
            console.log('cant sell', error)
          })
          // Selling
          vars.sell = false
        }
      } else {
        vars.highest = bidPrice
      }
    }
  } else {
    vars.noAssetsToSell = true
    vars.sell = false
    vars.highest = bidPrice
  }
}

export const startTrading = () => {
  const activePairs = Object.entries(store.pairs)
    .filter(([_, config]) => config.active)
    .map(([key]) => key)
  for (const pair of activePairs) createTradeVars(pair)
}
