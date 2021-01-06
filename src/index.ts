import express from 'express'
import BigNumber from 'bignumber.js'
import { port } from './api/config'
import axios from 'axios'
import chalk from 'chalk'
import { makeSellOfferInKraken } from './api/makeSellOfferInKraken'
import { makeBuyOfferInKraken } from './api/makeBuyOfferInKraken'
import { checkBalance } from './api/checkBalance'

const app = express()

const args = process.argv.slice(2)
console.log(args)
if (args.length < 3) {
  console.log(
    'npm start [' +
      chalk.blue('minChange') +
      '] [' +
      chalk.blue('minChangeTrend') +
      '] [' +
      chalk.blue('howMuchToTrade') +
      '] [' +
      chalk.blue('pair') +
      '] [' +
      chalk.blue('amount1') +
      '] [' +
      chalk.blue('amount2') +
      ']',
  )
  console.log('* ' + chalk.blue('minChange') + ' - min change in price to consider buy/sell (ex. 0.5)')
  console.log(
    '* ' +
      chalk.blue('minChangeTrend') +
      ' - dow much price has to change to make decision of buying/selling (ex. 0.2)',
  )
  console.log('* ' + chalk.blue('howMuchToTrade') + ' - for example 1 of min. unit')
  console.log('* ' + chalk.blue('pair') + ' - default XXBTZUSD')
  process.exit(1)
}
const pair = args[3] ? args[3] : 'XXBTZUSD'
const coin = [pair.slice(0, 4), pair.slice(4, 8)]
const btcurl = 'https://api.kraken.com/0/public/Ticker?pair=' + pair
const minChange = new BigNumber(args[0])
const minChangeToConsiderChangeOfTrend = new BigNumber(args[1])
const tax = 0.003
export const howMuchToTrade = new BigNumber(args[2])
const lot = new BigNumber('100000')
let buy = false
let sell = false
let startingPrice: BigNumber
let btc = args[4] ? new BigNumber(args[4]) : new BigNumber(0.002)
let usd = args[5] ? new BigNumber(args[5]) : new BigNumber(63)
let highest = new BigNumber(0)
let lastPrice = new BigNumber(0)
let lowest = new BigNumber(2e308)
export let lastTrasnactionPrice: BigNumber
let noOfTransactions = 0
export let price: BigNumber
export let pairDecimals: number
let baseValue: BigNumber
let taxCollected: BigNumber = new BigNumber(0)
const btcBase = new BigNumber(btc)
export let minSize = new BigNumber('0.001')
const usdBase = new BigNumber(usd)
const transactions: { [key: string]: string }[] = []
export let userRef = Math.floor(Math.random() * 1000000)
const resetCounters = () => {
  sell = false
  buy = false
  highest = new BigNumber(0)
  lowest = new BigNumber(2e308)
}

export const calculatePercentage = (a: BigNumber, b: BigNumber) => a.minus(b).dividedBy(b).multipliedBy(100)

const buyFromMarket = () => {
  userRef += 1
  const usdToSell = minSize.multipliedBy(howMuchToTrade).multipliedBy(price)

  const taxToPay = usdToSell.multipliedBy(tax)
  const transactionProfit = new BigNumber(1).dividedBy(price).multipliedBy(usdToSell.minus(taxToPay))
  btc = btc.plus(transactionProfit)
  usd = usd.minus(usdToSell)
  taxCollected = taxCollected.plus(taxToPay)

  noOfTransactions += 1
  transactions.push({
    type: 'buy',
    price: price.toFixed(pairDecimals),
    ammount: transactionProfit.toFixed(8),
    diff: calculatePercentage(price, lastTrasnactionPrice).toFixed(2),
    userRef: userRef + '',
  })
  lastTrasnactionPrice = price
  makeBuyOfferInKraken(pair, price.toFixed(pairDecimals), minSize.multipliedBy(howMuchToTrade).toFixed(8))
  resetCounters()
}
const sellFromMarket = () => {
  userRef += 1
  const btcToSell = minSize.multipliedBy(howMuchToTrade)
  const taxToPay = btcToSell.multipliedBy(tax)
  const transactionProfit = btcToSell.minus(taxToPay).multipliedBy(price)
  usd = usd.plus(transactionProfit)
  taxCollected = taxCollected.plus(taxToPay.multipliedBy(price))

  btc = btc.minus(btcToSell)
  transactions.push({
    type: 'sell',
    price: price.toFixed(pairDecimals),
    ammount: btcToSell.toFixed(8),
    diff: calculatePercentage(price, lastTrasnactionPrice).toFixed(2),
    userRef: userRef + '',
  })
  makeSellOfferInKraken(pair, price.toFixed(pairDecimals), btcToSell.toFixed(8))
  lastTrasnactionPrice = price

  noOfTransactions += 1
  resetCounters()
}
checkBalance()

axios.get('https://api.kraken.com/0/public/AssetPairs?=pairs=' + pair).then((result) => {
  minSize = new BigNumber(result.data.result[pair].ordermin)
  pairDecimals = parseInt(result.data.result[pair].pair_decimals)
})

const watch = async () => {
  const prices = await axios.get(btcurl)
  lastPrice = price
  price = new BigNumber(prices.data.result[pair].c[0])
  if (!lastTrasnactionPrice) {
    startingPrice = price
    lastTrasnactionPrice = price
    baseValue = usd.plus(btc.multipliedBy(price))
  }
  if (price.isGreaterThan(highest)) {
    highest = price
  }
  if (price.isLessThan(lowest)) {
    lowest = price
  }
  console.log(`
  
  
  
  `)
  transactions.map((transaction) => console.log(chalk.bgBlack(JSON.stringify(transaction))))

  console.log(
    chalk`RUN PARAMS: [minChange: {blue ${minChange}}] [minChangeTrend: {blue ${minChangeToConsiderChangeOfTrend}}]  [howMuchToTrade: {blue ${howMuchToTrade}}]  [pair: {blue ${pair}}]`,
  )

  console.log(
    coin[1] +
      ' was: ' +
      chalk.blue.bold(usdBase.toFixed(pairDecimals)) +
      '      ' +
      coin[0] +
      ' was: ' +
      chalk.blue.bold(btcBase.toFixed(8)),
  )
  console.log(
    coin[1] +
      ' now: ' +
      chalk.blueBright.bold(usd.toFixed(pairDecimals)) +
      '      ' +
      coin[0] +
      ' now: ' +
      chalk.blueBright.bold(btc.toFixed(8)),
  )
  console.log(
    highest.toFixed(pairDecimals) +
      '    highest    ' +
      chalk.yellow(calculatePercentage(highest, price).toFixed(2)) +
      '% of price',
  )
  const priceColor = price.isLessThan(lastPrice) ? chalk.red : chalk.green
  console.log(priceColor(price.toFixed(pairDecimals)) + '    price')
  console.log(
    chalk.blueBright(lastTrasnactionPrice.toFixed(pairDecimals)) +
      '    last transaction price   ' +
      chalk.blue(calculatePercentage(price, lastTrasnactionPrice).toFixed(2)) +
      '% of price',
  )
  console.log(
    lowest.toFixed(pairDecimals) +
      '    lowest     ' +
      chalk.yellow(calculatePercentage(lowest, price).toFixed(2)) +
      '% of price',
  )

  console.log(
    'my value in usd: ' +
      chalk.blue(usd.plus(btc.multipliedBy(price)).toFixed(pairDecimals)) +
      '$ no of transactions: ' +
      chalk.blue(noOfTransactions) +
      '   tax collected: ' +
      chalk.red(taxCollected.toFixed(1)) +
      '$ profit: ' +
      chalk.green(usd.plus(btc.multipliedBy(price)).minus(baseValue).toFixed(1)) +
      '$' +
      '$ profit in starter price: ' +
      chalk.green(usd.plus(btc.multipliedBy(startingPrice)).minus(baseValue).toFixed(1)) +
      '$',
  )
  let changeFromLastTransaction = calculatePercentage(price, lastTrasnactionPrice)
  const color = price.minus(lastTrasnactionPrice).isLessThan(0) ? chalk.red : chalk.green
  console.log(
    'change was ' + color(changeFromLastTransaction.toFixed(2) + '%') + ' = ',
    color(price.minus(lastTrasnactionPrice).toFixed(pairDecimals)),
  )

  if (buy) {
    const diffToLowestPrice = calculatePercentage(price, lowest)
    console.log(
      chalk.bgGreen('BUY:') +
        ' change to lowest price ' +
        chalk.blue(diffToLowestPrice.toFixed(2)) +
        '%' +
        'will buy at >= ' +
        chalk.blue(minChangeToConsiderChangeOfTrend.toFixed(2)),
    )
    const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(-0.3)
    if (notProfitable) {
      buy = false
      console.log(chalk.bgRed('buying not profitable anymore'))
    }
    if (!notProfitable && diffToLowestPrice.isGreaterThanOrEqualTo(minChangeToConsiderChangeOfTrend)) {
      buyFromMarket()
    }
  }
  if (sell) {
    const diffToHighestPrice = calculatePercentage(price, highest)
    const notProfitable = calculatePercentage(price, lastTrasnactionPrice).isLessThan(0.3)
    if (notProfitable) {
      sell = false
      console.log(chalk.bgRed('selling not profitable anymore'))
    }
    console.log(
      chalk.bgRed('SELL:') +
        '  change to highest price ' +
        chalk.blue(diffToHighestPrice.toFixed(2)) +
        '% ' +
        'will sell at <= ' +
        chalk.blue(minChangeToConsiderChangeOfTrend.multipliedBy(-1).toFixed(2)),
    )
    if (!notProfitable && diffToHighestPrice.isLessThanOrEqualTo(minChangeToConsiderChangeOfTrend.multipliedBy(-1))) {
      sellFromMarket()
    }
  }
  changeFromLastTransaction = calculatePercentage(price, lastTrasnactionPrice)

  // should we consider buying ?
  if (!buy && !sell && changeFromLastTransaction.isLessThan(minChange.multipliedBy(-1))) {
    console.log(
      'will try to buy ' + chalk.red(coin[0]) + '. price was ' + lastTrasnactionPrice + ' and now is ' + price,
    )
    //  resetCounters()
    buy = true
  }
  // should we consider selling ?
  if (!buy && !sell && calculatePercentage(price, lastTrasnactionPrice).isGreaterThan(minChange)) {
    console.log(
      'will try to sell ' + chalk.red(coin[0]) + '. price was ' + lastTrasnactionPrice + ' and now is ' + price,
    )
    //  resetCounters()
    sell = true
  }
}
//watch()
setInterval(watch, 9000)
