import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import { calculatePercentage } from './calculatePercentage'

export const shouldSellNow = (
  price: BigNumber,
  highest: BigNumber,
  lastTrasnactionPrice: BigNumber,
  risk: BigNumber,
  sellFromMarket: ()=>void,
) => {
  const diffToHighestPrice = calculatePercentage(price, highest)
  const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isLessThan(0.3)
  console.log(chalk.bgRed('SELL:')
  +'  change to highest price ' 
  +  chalk.blue(diffToHighestPrice.toFixed(2)) 
  + '% ' + 'will sell at <= '
  +chalk.blue(risk.multipliedBy(-1).toFixed(2)))

  if (notProfitable) {
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
  lowest: BigNumber,
  lastTrasnactionPrice: BigNumber,
  risk: BigNumber,
  buyFromMarket: ()=>void,
) => {
  const diffToLowestPrice = calculatePercentage(price, lowest)
  const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(-0.3)
  console.log(chalk.bgGreen('BUY:')
  +' change to lowest price '
   + chalk.blue(diffToLowestPrice.toFixed(2))
   +'%' + 'will buy at >= '
   +chalk.blue(risk.toFixed(2)))

  if (notProfitable) {
    return false
  }
  if (!notProfitable && diffToLowestPrice.isGreaterThanOrEqualTo(risk)) {
    buyFromMarket()
    return false
  }
  return true
}
