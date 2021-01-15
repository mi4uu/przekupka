import BigNumber from 'bignumber.js'
import {calculatePercentage} from './calculate-percentage'

export const processData = (
  buy: boolean,
  sell: boolean,
  price: BigNumber,
  lastTrasnactionPrice: BigNumber,

  minChange: BigNumber,
  balanceTransactionType: number,
  lastTransactions: Array<'b' | 's'>,
) => {
  const changeFromLastTransaction = calculatePercentage(price, lastTrasnactionPrice)
  // Console.log(changeFromLastTransaction.toFixed(2))
  const sellCount = lastTransactions.filter((t) => t === 's').length
  const buyCount = lastTransactions.filter((t) => t === 'b').length
  const minChangeforSell = minChange.plus(minChange.multipliedBy(sellCount * balanceTransactionType))
  const minChangeforBuy = minChange.plus(minChange.multipliedBy(buyCount * balanceTransactionType))

  // Should we consider buying ?
  // console.log(JSON.stringify({
  //   price,
  //   lastTrasnactionPrice,
  //   changeFromLastTransaction,
  //   isLessThan:minChangeforBuy.multipliedBy(-1)
  // }))
  if (!buy && !sell && changeFromLastTransaction.isLessThan(minChangeforBuy.multipliedBy(-1))) {
    //   ResetCounters(price)

    buy = true
  }

  // Should we consider selling ?
  if (!buy && !sell && changeFromLastTransaction.isGreaterThan(minChangeforSell)) {
    //  ResetCounters(price)
    sell = true
  }

  return {buy, sell}
}
