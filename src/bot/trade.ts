import BigNumber from 'bignumber.js'
import {store, ITradeVars} from '../api/server-store'
import {shouldBuyNow, shouldSellNow} from './make-desision'
import {processData} from './process-data'

import {makeSellOfferInKraken} from '../api/make-sell-offer-in-kraken'
import {makeBuyOfferInKraken} from '../api/make-buy-offer-in-kraken'
import moment from 'moment'
import {calculatePercentage} from './calculate-percentage'
import {bn} from '../utils/bn'

export const buyFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  console.log(pair, 'BUY!!!', price.toFixed(8))
  const {data} = await makeBuyOfferInKraken(
    pair,
    price.toFixed(store.assetPairs[pair].pair_decimals),
    store.pairs[pair].volume,
  )
  if (data.error.length > 0) {
    console.log(data)
    vars.buy = false
  } else {
    console.log(JSON.stringify(data.result, null, 2))
    vars.lastTransactionId = data.result.txid[0]
    vars.wait = 5
  }
}

export const sellFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  console.log(pair, 'SELL!!!', price.toFixed(8))

  const {data} = await makeSellOfferInKraken(
    pair,
    price.toFixed(store.assetPairs[pair].pair_decimals),
    store.pairs[pair].volume,
  )
  if (data.error.length > 0) {
    console.log(data)
    vars.sell = false
  } else {
    console.log(JSON.stringify(data.result, null, 2))
    vars.lastTransactionId = data.result.txid[0]
    vars.wait = 5
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
  if (!vars.lastTransactionPrice) {
    vars.lastTransactionPrice = price
    vars.lowest = price
    vars.highest = price
  }

  const result = processData(
    vars.buy,
    vars.sell,
    bn(price),
    bn(vars.lastTransactionPrice),

    bn(pairParameters.changeToTrend),
    pairParameters.persuadeToBalance,
    vars.lastTransactions,
  )
  vars.processData = result
  if (bn(bidPrice).isGreaterThan(vars.highest) && calculatePercentage(bidPrice, vars.highest).abs().isLessThan(10)) {
    vars.highest = bidPrice
  }

  if (bn(askPrice).isLessThan(vars.lowest) && calculatePercentage(askPrice, vars.lowest).abs().isLessThan(10)) {
    vars.lowest = askPrice
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

      if (result.buy) {
        vars.buy = shouldBuyNow(
          bn(askPrice),
          vars,
          bn(vars.lastTransactionPrice),
          bn(pairParameters.changeToTrend),
          bn(pairParameters.changeToChangeTrend),
          async () => buyFn(pair, bn(askPrice), vars),
        )
      }
    } else {
      vars.limitBuyPerHourReached = true
      vars.buy = false
    }
  } else {
    vars.cantAffordToBuy = true
    vars.buy = false
  }

  // Did we buy anything to sell ?
  const minProfit = bn(bidPrice).multipliedBy(bn(pairParameters.changeToTrend).dividedBy(100))
  const minPrice = bn(bidPrice).plus(minProfit)
  const candidatesToSell = store.toSell[pair].filter((p) => bn(p.value).isLessThan(minPrice))
  if (candidatesToSell.length > 0) {
    vars.noAssetsToSell = false
    if (balanceCoin0.isGreaterThan(store.pairs[pair].volume) ) {
      vars.sell = shouldSellNow(
        bn(bidPrice),
        vars,
        bn(pairParameters.changeToTrend),
        bn(pairParameters.changeToChangeTrend),
        candidatesToSell,
        async () => sellFn(pair, bn(bidPrice), vars),
      )
    }
  } else {
    vars.noAssetsToSell = true
    vars.sell = false
  }
}

export const startTrading = () => {
  const activePairs = Object.entries(store.pairs)
    .filter(([_, config]) => config.active)
    .map(([key]) => key)
  for (const pair of activePairs) createTradeVars(pair)
}
