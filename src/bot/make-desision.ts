import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import {ITradeVars} from '../api/server-store'
import {calculatePercentage} from './calculate-percentage'

export const shouldSellNow = (
  price: BigNumber,
  vars: ITradeVars,
  lastTransactionPrice: BigNumber,
  minProfit: BigNumber,

  risk: BigNumber,
  sellFromMarket: () => void,
) => {
  const diffToHighestPrice = calculatePercentage(price, vars.highest)
  const notProfitable = calculatePercentage(price, lastTransactionPrice).isLessThan(minProfit)
  const highlyNotProfitable = calculatePercentage(price, lastTransactionPrice).isLessThan(0.3)
  // Console.log(chalk.bgRed('SELL:')
  // +'  change to highest price '
  // +  chalk.blue(diffToHighestPrice.toFixed(2))
  // + '% ' + 'will sell at <= '
  // +chalk.blue(risk.multipliedBy(-1).toFixed(2)))

  if (highlyNotProfitable && calculatePercentage(price, vars.highest).abs().isLessThan(10)) {
    vars.sellHighlyNotProfitable = highlyNotProfitable
    vars.highest = price.toFixed(8)
    return false
  }

  if (notProfitable) return false

  if (!notProfitable && diffToHighestPrice.isLessThanOrEqualTo(risk.multipliedBy(-1))) {

    sellFromMarket()

    return false
  }

  return true
}

export const shouldBuyNow = (
  price: BigNumber,
  vars: ITradeVars,
  lastTransactionPrice: BigNumber,
  minProfit: BigNumber,

  risk: BigNumber,
  buyFromMarket: () => void,
) => {
  const diffToLowestPrice = calculatePercentage(String(price), String(vars.lowest) )
  const notProfitable = calculatePercentage(price, lastTransactionPrice).isGreaterThan(minProfit.multipliedBy(-1))
  const highlyNotProfitable = calculatePercentage(price, lastTransactionPrice).isGreaterThan(-0.3)
 const dtlp = price.minus(vars.lowest).dividedBy(vars.lowest).multipliedBy(100)
  // Console.log(chalk.bgGreen('BUY:')
  // +' change to lowest price '
  //  + chalk.blue(diffToLowestPrice.toFixed(2))
  //  +'%' + 'will buy at >= '
  //  +chalk.blue(risk.toFixed(2)))

  if (highlyNotProfitable && calculatePercentage(price, vars.lowest).abs().isLessThan(10)) {
    vars.buyHighlyNotProfitable = highlyNotProfitable
    vars.lowest = price.toFixed(8)
    return false
  }

  if (notProfitable) return false
  if (!notProfitable && diffToLowestPrice.isGreaterThanOrEqualTo(risk)) {
    buyFromMarket()
    return false
  }

  return true
}
