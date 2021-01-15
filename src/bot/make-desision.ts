import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import {IToSell, ITradeVars} from '../api/server-store'
import {calculatePercentage} from './calculate-percentage'

export const shouldSellNow = (
  price: BigNumber,
  vars: ITradeVars,
  minProfit: BigNumber,
  risk: BigNumber,
  candidatesToSell: IToSell[],
  sellFromMarket: () => void,
) => {
  const diffToHighestPrice = calculatePercentage(price, vars.highest)
  // The lowest buy
  const lastBuy = candidatesToSell.sort((a, b) => Number.parseFloat(a.value) - Number.parseFloat(b.value))[0]

  const notProfitable = calculatePercentage(price, lastBuy.value).isLessThan(minProfit)

  // Console.log(chalk.bgRed('SELL:')
  // +'  change to highest price '
  // +  chalk.blue(diffToHighestPrice.toFixed(2))
  // + '% ' + 'will sell at <= '
  // +chalk.blue(risk.multipliedBy(-1).toFixed(2)))

  if (notProfitable) return false

  // Trend is changing, lets sell it
  if (diffToHighestPrice.isLessThanOrEqualTo(risk.multipliedBy(-1))) {
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
  const diffToLowestPrice = calculatePercentage(String(price), String(vars.lowest))
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
