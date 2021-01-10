import BigNumber from 'bignumber.js'
import { store } from '../api/serverStore'
import { shouldBuyNow, shouldSellNow } from './makeDesision'
import { processData } from './processData'
import { ITradeVars } from '../api/serverStore'
import { makeSellOfferInKraken } from '../api/makeSellOfferInKraken'
import { makeBuyOfferInKraken } from '../api/makeBuyOfferInKraken'
import moment from 'moment'

export const buyFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  console.log(pair, 'BUY!!!', price.toFixed(8))
  const { data } = await makeBuyOfferInKraken(
    pair,
    price.toFixed(store.assetPairs[pair].pair_decimals),
    store.pairs[pair].volume.toFixed(8),
  )
  if (data.error.length) {
    console.log(data)
    vars.buy = false
  } else {
    console.log(JSON.stringify(data.result,null,2))
    vars.lastTransactionId = data.result.txid[0]
    vars.wait = 5
  }
}

export const sellFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  console.log(pair, 'SELL!!!', price.toFixed(8))

  const { data } = await makeSellOfferInKraken(
    pair,
    price.toFixed(store.assetPairs[pair].pair_decimals),
    store.pairs[pair].volume.toFixed(8),
  )
  if (data.error.length) {
    console.log(data)
    vars.sell = false
  } else {
    console.log(JSON.stringify(data.result,null,2))
    vars.lastTransactionId = data.result.txid[0]
    vars.wait = 5
  }
}
export const createTradeVars = (pair: string) => {
  store.tradeVars[pair] = {
    lastTransactions: [],
    highest: new BigNumber(0),
    lowest: new BigNumber(0),
    buy: false,
    sell: false,
    wait: 0,
    lastTransactionId: '',
  }
  if( !store.toSell[pair]) store.toSell[pair] = []
}

export const trade = (pair: string) => {
  const vars = store.tradeVars[pair]
  const pairParams = store.pairs[pair]
  const price = new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].a[0])
  const askPrice = new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].c[0])
  const bidPrice = new BigNumber(store.ticks[store.ticks.length - 1].pairs[pair].b[0])
  if (!vars.lastTrasnactionPrice) {
    vars.lastTrasnactionPrice = price
    vars.lowest = price
    vars.highest = price
  }
  const result = processData(
    vars.buy,
    vars.sell,
    price,
    vars.lastTrasnactionPrice,

    pairParams.changeToTrend,
    pairParams.persuadeToBalance,
    vars.lastTransactions,
  )
  vars.processData = result
  if (price.isGreaterThan(vars.highest)) {
    vars.highest = price
  }
  if (price.isLessThan(vars.lowest)) {
    vars.lowest = price
  }
  const balanceCoin0 = new BigNumber(store.balance[store.pairs[pair].coin0])
  const balanceCoin1 = new BigNumber(store.balance[store.pairs[pair].coin1])
  const hourBefore=moment().subtract(1,'hour').unix()

  if (balanceCoin1.isGreaterThan(price.multipliedBy(store.pairs[pair].volume))) // can we afford that?
  {
    vars.cantAffordToBuy=false
    if (store.toSell[pair]
      .filter((p) => p.timestamp>hourBefore).length < store.pairs[pair].buyPerHour) // limit buy per h
    {
      vars.limitBuyPerHourReached=false

      if (result.buy) {
        vars.buy = shouldBuyNow(
          askPrice,
          vars,
          vars.lastTrasnactionPrice,
          pairParams.changeToTrend,
          pairParams.changeToChangeTrend,
          () => buyFn(pair, askPrice, vars),
        )
      }
    } else {
      vars.limitBuyPerHourReached=true
    
    }
  } else {
    vars.cantAffordToBuy=true

  }
  
  // did we buy anything to sell ?
  const minProfit = price.multipliedBy(pairParams.changeToTrend.dividedBy(100))
  if (store.toSell[pair].filter((p) => p.value.isLessThan(price.plus(minProfit))).length > 0){
    vars.noAssetsToSell=false
    if (balanceCoin0.isGreaterThan(store.pairs[pair].volume)){
      
      if (result.sell) {
        vars.sell = shouldSellNow(
          bidPrice,
          vars,
          vars.lastTrasnactionPrice,
          pairParams.changeToTrend, 
          pairParams.changeToChangeTrend,
          () => sellFn(pair, bidPrice, vars),
        )
      }
    }  
  } else {
    vars.noAssetsToSell=true

  }
}
export const startTrading = () => {
  const activePairs = Object.entries(store.pairs)
    .filter(([_, config]) => config.active)
    .map(([key]) => key)
  for (const pair of activePairs) createTradeVars(pair)
}
