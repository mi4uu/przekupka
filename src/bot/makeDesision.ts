import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import { ITradeVars } from '../api/serverStore'
import { calculatePercentage } from './calculatePercentage'

export const shouldSellNow = (
  price: BigNumber,
  vars:ITradeVars,
  lastTrasnactionPrice: BigNumber,
  minProfit: BigNumber,

  risk: BigNumber,
  sellFromMarket: ()=>void,
) => {
  const diffToHighestPrice = calculatePercentage(price, vars.highest)
  const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isLessThan(minProfit)
  const highlyNotProfitable = calculatePercentage(price, lastTrasnactionPrice).isLessThan(0.3)
  // console.log(chalk.bgRed('SELL:')
  // +'  change to highest price ' 
  // +  chalk.blue(diffToHighestPrice.toFixed(2)) 
  // + '% ' + 'will sell at <= '
  // +chalk.blue(risk.multipliedBy(-1).toFixed(2)))

  if (highlyNotProfitable) {
    vars.sellHighlyNotProfitable =highlyNotProfitable
    vars.highest = price
    return false
  }
  if (!notProfitable && diffToHighestPrice.isLessThanOrEqualTo(risk.multipliedBy(-1))) {
    sellFromMarket()

    return false
  }
  return true
}

export const shouldBuyNow = (
  price: BigNumber,
  vars:ITradeVars,
  lastTrasnactionPrice: BigNumber,
  minProfit: BigNumber,

  risk: BigNumber,
  buyFromMarket: ()=>void,
) => {
  const diffToLowestPrice = calculatePercentage(price, vars.lowest)
  const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(minProfit.multipliedBy(-1))
  const highlyNotProfitable = calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(-0.3)
  // console.log(chalk.bgGreen('BUY:')
  // +' change to lowest price '
  //  + chalk.blue(diffToLowestPrice.toFixed(2))
  //  +'%' + 'will buy at >= '
  //  +chalk.blue(risk.toFixed(2)))

  if (highlyNotProfitable) {
    vars.buyHighlyNotProfitable =highlyNotProfitable
    vars.lowest = price
    return false
  }
  console.log(JSON.stringify({
    notProfitable,
    diffToLowestPrice,
    isGreaterThanOrEqualTo:risk
  }))
  if (!notProfitable && diffToLowestPrice.isGreaterThanOrEqualTo(risk)) {
    
    buyFromMarket()
    return false
  }
  return true
}
