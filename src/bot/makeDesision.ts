import BigNumber from "bignumber.js"
import { calculatePercentage } from "./calculatePercentage"

export const shouldSellNow = (price:BigNumber,highest:BigNumber, lastTrasnactionPrice:BigNumber, risk:BigNumber, sellFromMarket:any)=>{
    const diffToHighestPrice = calculatePercentage(price, highest)
    const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isLessThan(0.3)
    if( notProfitable ){ 
        return false
      }
    if (!notProfitable && diffToHighestPrice.isLessThanOrEqualTo(risk.multipliedBy(-1))) {
     sellFromMarket(price)
  
     return false
    }
    return true
}

export const shouldBuyNow = (price:BigNumber,lowest:BigNumber, lastTrasnactionPrice:BigNumber, risk:BigNumber, buyFromMarket:any)=>{
    const diffToLowestPrice = calculatePercentage(price, lowest)
      const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(-0.3)
      if( notProfitable ){
           return false
      }
      if (!notProfitable && diffToLowestPrice.isGreaterThanOrEqualTo(risk) ) {
       buyFromMarket(price)
       return false
      }
      return true
}
