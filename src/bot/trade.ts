import BigNumber from 'bignumber.js'
import { findConfigFile } from 'typescript'
import { store } from '../api/serverStore'
import { shouldBuyNow, shouldSellNow } from './makeDesision'
import { processData } from './processData'


export const buyFn = (price:BigNumber)=>{
  console.log('BUY!!!', price.toFixed(8))
}
export const sellFn = (price:BigNumber)=>{
  console.log('SELL!!!', price.toFixed(8))
}
export const createTradeVars = (pair:string)=>{
  store.tradeVars[pair] = {
    lastTransactions: [],
    highest: new BigNumber(0),
    lowest: new BigNumber(0),
    buy: false,
    sell: false,
  }
}

  
export const trade= (pair:string, buyFn:unknown, sellFn:unknown)=> {
  const vars = store.tradeVars[pair]
  const pairParams = store.pairs[pair]
  const price = new BigNumber(store.ticks[store.ticks.length-1].pairs[pair].c[0])
  const resetCounters = (price: BigNumber) => {
    vars.lowest = price
    vars.highest = price
  }
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
    vars.highest,
    vars.lowest,
    pairParams.changeToTrend,
    pairParams.persuadeToBalance,
    vars.lastTransactions,
    resetCounters,
  )
  vars.highest = result.highest
  vars.lowest = result.lowest
  if (result.buy) {
    vars.buy = shouldBuyNow(price, vars.lowest,
      vars.lastTrasnactionPrice, pairParams.changeToChangeTrend, buyFn)
  }
  if (result.sell) {
    vars.sell = shouldSellNow(price, vars.highest, 
      vars.lastTrasnactionPrice, pairParams.changeToChangeTrend, sellFn)
  }

}
export const startTrading=()=>{
  const activePairs = Object.entries(store.pairs)
    .filter(([_,config])=>config.active)
    .map(([key])=>key)
  for(const pair of activePairs)
    createTradeVars(pair)
  setInterval(()=>{
    if(store.ticks.length>2)
      for(const pair of activePairs)
        trade(pair,buyFn,sellFn)
  },1000)
}

