import BigNumber from 'bignumber.js'
import { shouldBuyNow, shouldSellNow } from './makeDesision'
import {processData} from './processData'
import Fs from 'fs'
import  CsvReadableStream from 'csv-reader'

const args =  process.argv.slice(2)
console.log(`balanceTransactionType,minChange,risk,badTransactionsCount,btc,usd,worthInUsdStartingPrice,worthInUsdEndPrice,profitTransDiff,profit,buyCount,sellCount,buyAvgCost,sellAvgCost,day0,day1,day3,day4,day5,day6,day7,day8,day9`)

const runSimulation = (minChange:BigNumber, risk:BigNumber, balanceTransactionType:number)=>{
let BTC = new BigNumber('1')
let USD = new BigNumber('10000')
let BTCSTART = new BigNumber('1')
let USDSTART = new BigNumber('10000')
let volume = new BigNumber('0.001')
const days:string[] = []
let buy = false
let sell = false
let lastTrasnactionPrice:BigNumber
let highest = new BigNumber(0)
let lowest = new BigNumber(0)
let lastBuyPrice = new BigNumber(0)
let lastSellPrice = new BigNumber('Infinity')
let badTransactionsCount = 0
let startingPrice:BigNumber
let endingPrice:BigNumber
let lastTransactions:('b'|'s')[] = []
const transactions:{s:BigNumber[], b:BigNumber[]} = {
    s:[], b:[]
}
const transactions1:{s:BigNumber[], b:BigNumber[]} = {
    s:[], b:[]
}
const buyFn = (price:BigNumber)=>{
    lastTrasnactionPrice=price
//    transactions.b.push(price)
  //  transactions1.b.push(price)
    BTC=BTC.plus(volume)
    const cost = price.multipliedBy(volume)
    USD=USD.minus(cost)
    


    if(price.isGreaterThan(lastSellPrice)) badTransactionsCount +=1
    lastBuyPrice = new BigNumber(price)
    lastTransactions=lastTransactions.slice(1)
    lastTransactions.push('b')
   // console.log('buy at price '+price.toFixed(8))
}
const sellFn = (price:BigNumber)=>{
    lastTrasnactionPrice=price
    lastTransactions=lastTransactions.slice(1)
    lastTransactions.push('s')
//transactions.s.push(price)
  //  transactions1.s.push(price)
    BTC=BTC.minus(volume)
    const cost = price.multipliedBy(volume)
    USD=USD.plus(cost)

    if(price.isLessThan(lastBuyPrice)) badTransactionsCount +=1
    lastSellPrice = new BigNumber(price)

   // console.log('sell at price '+price.toFixed(8))
}
const resetCounters = (price:BigNumber)=>{
    lowest=price
    highest=price
}

let counter = 0


let inputStream = Fs.createReadStream('./.kraken2m.csv', 'utf8')
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
counter++
        // @ts-ignore
        const price = new BigNumber(row[1])
        if(!lastTrasnactionPrice){ lastTrasnactionPrice=price
        lowest=price
        highest=price
        startingPrice=price
        }
        const result = processData(buy, sell, price, lastTrasnactionPrice, highest, lowest, minChange,balanceTransactionType,lastTransactions, resetCounters)
         highest = result.highest
         lowest = result.lowest
         if(result.buy){
             buy = shouldBuyNow(price, lowest, lastTrasnactionPrice, risk, buyFn)
         }
         if(result.sell){
             sell = shouldSellNow(price, highest, lastTrasnactionPrice, risk, sellFn)
         }

         if(counter>50000){
            //  counter=0
            //  const tbs = transactions1.b.reduce((p,c)=>c.plus(p),new BigNumber(0))
            //  const tbm=tbs.dividedBy(transactions1.b.length)
     
            //  const tss = transactions1.s.reduce((p,c)=>c.plus(p),new BigNumber(0))
            //  const tsm=tss.dividedBy(transactions1.s.length)
            //  days.push(tsm.minus(tbs))
            const valueStart =  USD.plus(BTC.multipliedBy(startingPrice)).minus(USDSTART.plus(BTCSTART.multipliedBy(startingPrice)))
            const valueStop =  USD.plus(BTC.multipliedBy(endingPrice)).minus(USDSTART.plus(BTCSTART.multipliedBy(endingPrice)))
         
            days.push(`${valueStart.toFixed(1)} -> ${valueStop.toFixed(1)}`)
            //  transactions1.s=[]
            //  transactions1.b=[]
         }
         endingPrice=price
    })
    .on('end', function () {
        const tbs = transactions.b.reduce((p,c)=>c.plus(p),new BigNumber(0))
        const tbm=tbs.dividedBy(transactions.b.length)

        const tss = transactions.s.reduce((p,c)=>c.plus(p),new BigNumber(0))
        const tsm=tss.dividedBy(transactions.s.length)
        const profit = tsm.minus(tbm)

        const transNo = transactions.b.length>transactions.s.length?transactions.s.length-2:transactions.b.length-2

   let msg  = `${balanceTransactionType},${minChange.toFixed(2)},${risk.toFixed(2)},${badTransactionsCount},`
   const valueStart =  USD.plus(BTC.multipliedBy(startingPrice)).minus(USDSTART.plus(BTCSTART.multipliedBy(startingPrice)))
   const valueStop =  USD.plus(BTC.multipliedBy(endingPrice)).minus(USDSTART.plus(BTCSTART.multipliedBy(endingPrice)))


   msg+=`${BTC.toFixed(8)},${USD.toFixed(2)},${valueStart.toFixed(2)},${valueStop.toFixed(2)},${profit.toFixed(8)}`
   msg+=`,${transactions.s.slice(0,transNo).reduce((p,c)=>c.plus(p),new BigNumber(0)).minus(transactions.b.slice(0, transNo).reduce((p,c)=>c.plus(p),new BigNumber(0))).toFixed(8)}`
   msg+=`,${transactions.b.length},${transactions.s.length},${tbs.toFixed(8)},${tss.toFixed(8)}`
   for(const day of days)
        msg+=`,${day}`
   console.log(msg)
  
    })
}
for(let b=0; b<1; b+=0.3)
for(let i=0.2; i<2; i+=0.1)
for(let j=0.2; j<1; j+=0.1){
    runSimulation(new BigNumber(i), new BigNumber(j),b)
}
