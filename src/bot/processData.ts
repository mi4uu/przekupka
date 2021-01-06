import BigNumber from "bignumber.js"
import { calculatePercentage } from "./calculatePercentage"

export const processData =  (buy:boolean, sell:boolean, price:BigNumber, lastTrasnactionPrice:BigNumber,highest:BigNumber,lowest:BigNumber, minChange:BigNumber, balanceTransactionType:number, lastTransactions:('b'|'s')[],resetCounters:any )=> {


    if (price.isGreaterThan(highest)) {
      highest = price
    }
    if (price.isLessThan(lowest)) {
      lowest = price
    }   

    let changeFromLastTransaction = calculatePercentage(price, lastTrasnactionPrice)
   // console.log(changeFromLastTransaction.toFixed(2))
    const sellCount = lastTransactions.filter(t=>t==='s').length
    const buyCount = lastTransactions.filter(t=>t==='b').length
    const minChangeforSell =minChange.plus( minChange.multipliedBy(sellCount*balanceTransactionType))
    const minChangeforBuy = minChange.plus( minChange.multipliedBy(buyCount*balanceTransactionType))
    // should we consider buying ? 
    if ( !buy && !sell && changeFromLastTransaction.isLessThan(minChangeforBuy.multipliedBy(-1) )) {
      resetCounters(price)
      buy = true
    }
    // should we consider selling ? 
    if (!buy && !sell && calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(minChangeforSell)) {
      resetCounters(price)
      sell = true
    }
  
  return {buy,sell, highest, lowest }
  }