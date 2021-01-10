import BigNumber from 'bignumber.js'
import { calculatePercentage } from './calculatePercentage'

export const processData = (
  buy: boolean,
  sell: boolean,
  price: BigNumber,
  lastTrasnactionPrice: BigNumber,

  minChange: BigNumber,
  balanceTransactionType: number,
  lastTransactions: ('b' | 's')[],
) => {
 

  const changeFromLastTransaction = calculatePercentage(price, lastTrasnactionPrice)
  // console.log(changeFromLastTransaction.toFixed(2))
  const sellCount = lastTransactions.filter((t) => t === 's').length
  const buyCount = lastTransactions.filter((t) => t === 'b').length
  const minChangeforSell = minChange.plus(minChange.multipliedBy(sellCount * balanceTransactionType))
  const minChangeforBuy = minChange.plus(minChange.multipliedBy(buyCount * balanceTransactionType))

  // should we consider buying ?
  // console.log(JSON.stringify({
  //   price,
  //   lastTrasnactionPrice,
  //   changeFromLastTransaction,
  //   isLessThan:minChangeforBuy.multipliedBy(-1)
  // }))
  if (!buy && !sell && changeFromLastTransaction.isLessThan(minChangeforBuy.multipliedBy(-1))) {
    //   resetCounters(price)
    
    buy = true
  }

  // should we consider selling ?
  if (!buy && !sell && changeFromLastTransaction.isGreaterThan(minChangeforSell)) {
    //  resetCounters(price)
    sell = true
  }

  return { buy, sell}
}
