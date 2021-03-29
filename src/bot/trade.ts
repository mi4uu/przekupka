import BigNumber from 'bignumber.js'
import {store, ITradeVars} from '../api/server-store'
import moment from 'moment'
import {calculatePercentage} from './calculate-percentage'
import {bn} from '../utils/bn'
import api from '../api/api'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {getRepository} from 'typeorm'
import {Tick} from '#db/entity/tick'
import {greed} from '#api/binance/config'

export const buyFn = async (pair: string, price: BigNumber, vars: ITradeVars, strategy?: string) => {
  // Console.log(pair, 'BUY!!!', price.toFixed(8))
  const p = await Pair.findOneOrFail(pair)
  const result = await api.makeBuyOffer(
    pair,
    price.toFixed(p.coin0Precision),
    bn(p.volume).toFixed(p.coin0Precision),
    strategy,
  )
  if (result) {
    // Vars.wait += 3
    //  Vars.buy = false
  } else {
    console.log('transaction failed')
    //  Vars.buy = false
  }
}

export const sellFn = async (pair: string, price: BigNumber, volume: string, vars: ITradeVars) => {
  // Console.log(pair, 'SELL!!!', price.toFixed(8), volume)
  const p = await Pair.findOneOrFail(pair)
  const result = await api.makeSellOffer(
    pair,
    price.multipliedBy('1').toFixed(p.coin0Precision),
    bn(volume).toFixed(p.coin0Precision),
  )
  if (result) {
    vars.wait += 3
    // Vars.sell = false
  } else {
    console.log('transaction failed')
    // Vars.sell = false
  }

  return result
}

function chunkArray(myArray_: number[], chunk_size: number) {
  const results = []
  const myArray = [...myArray_]

  while (myArray.length > 0) {
    results.push(myArray.splice(0, chunk_size))
  }

  return results
}

export const trade = async (pair: Pair, candle: Tick, allowBuying: boolean) => {
  const vars = store.tradeVars[pair.name]
  if (!vars) {
    //   Console.log('no vars for', pair.name)
    return false
  }

  const lastTick = candle
  const price = candle.close
  const askPrice = candle.close
  const bidPrice = candle.close

  // For initial values
  if (!vars.lastTransactionPrice) {
    vars.lowest = askPrice
    vars.highest = bidPrice
    vars.lastTransactionPrice = askPrice
    vars.lastActionTime = moment().subtract(10, 'minutes').unix()
    vars.takeProfit = api.config.takeTrailingProfitFrom
  }

  if (!vars.takeProfit || bn(vars.takeProfit).isNaN()) vars.takeProfit = api.config.takeTrailingProfitFrom

  const balanceCoin0 = bn(store.balance[pair.coin0])
  const balanceCoin1 = bn(store.balance[pair.coin1])

  if (pair.active) {
    vars.canBuy = 10
    // Can we afford that?
    vars.limitBuyPerHourReached = vars.lastActionTime >= moment().subtract(5, 'minutes').unix()

    const howManyInToSell = await ToSell.count({pair, filled: false, dust: false}) // FIXME - cound be passed, should reduce time
    const buyAtDropBy = api.config.minPriceDrop * (howManyInToSell + 1)
    if (
      vars.lastActionTime <=
      moment()
        .subtract(160 * buyAtDropBy, 'minutes')
        .unix()
    ) {
      vars.lastActionTime = moment().unix()
      vars.lastTransactionPrice = candle.close
      console.log(`setting new price for ${pair.name}`)
    }

    vars.buyAtDropBy = buyAtDropBy
    const mustDropBy = bn(vars.lastTransactionPrice).multipliedBy(buyAtDropBy / 100)
    vars.mustDropBy = mustDropBy.toFixed(8)
    const buyBelowPrice = bn(vars.lastTransactionPrice).minus(mustDropBy)
    vars.buyBelowPrice = buyBelowPrice.toFixed(8)
    vars.buy = bn(candle.close).isLessThan(buyBelowPrice)
    // Console.log(`${candle.close} < ${buyBelowPrice} = ${vars.buy}`)
    // console.log({
    //   pair: pair.name,
    //   mustDropBy: vars.mustDropBy,
    //   buyAtDropBy: vars.buyAtDropBy,
    //   buyBelowPrice: vars.buyBelowPrice,
    //   lastTransactionPrice: vars.lastTransactionPrice,
    //   price: candle.close,
    // })
    vars.cantAffordToBuy = balanceCoin1.isLessThan(bn(askPrice).multipliedBy(pair.volume))
    if (!vars.cantAffordToBuy && vars.buy && !vars.limitBuyPerHourReached) {
      vars.lastActionTime = moment().unix()
      vars.lastTransactionPrice = candle.close
      buyFn(pair.name, bn(askPrice), vars, `- ${bn(buyAtDropBy).toFixed(2)}%`).catch((error) => {
        console.log('cant buy', error)
      })
      vars.buy = false
    } else {
      //   Console.log(JSON.stringify({howMuchDidIBuyInLastHour, howMuchPerHourCanIBuy, pair: pair.name}))
      vars.lowest = askPrice
    }
  } else {
    vars.cantAffordToBuy = true
    vars.lowest = askPrice
  }

  let minProfitPercentage = api.config.takeTrailingProfitFrom
  vars.takeProfit = minProfitPercentage > vars.profit * greed ? minProfitPercentage : vars.profit * greed
  if (!vars.takeProfit || bn(vars.takeProfit).isNaN()) vars.takeProfit = api.config.takeTrailingProfitFrom

  // Did we buy anything to sell ?
  const minProfit = bn(bidPrice).multipliedBy(bn(minProfitPercentage).dividedBy(100))
  const maxPrice = bn(bidPrice).minus(minProfit)
  const {howMuchToSell, lowestBuy} = await getRepository(ToSell)
    .createQueryBuilder('t')
    .where('t.pairName = :pair AND t.filled = :filled AND t.price <= :maxPrice', {
      pair: pair.name,
      maxPrice: maxPrice.toFixed(pair.coin0Precision),
      filled: false,
    })
    .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
    .addSelect('MIN(t.price)', 'lowestBuy')
    .getRawOne()
  const profit = calculatePercentage(bidPrice, lowestBuy).toNumber()
  if (!vars.profit || vars.profit < profit) vars.profit = profit
  minProfitPercentage = vars.takeProfit
  if (bn(howMuchToSell).isGreaterThan(0)) {
    vars.noAssetsToSell = false
    const howMuchCanISell = howMuchToSell

    if (
      api.isTransactionValid(pair, howMuchCanISell, bidPrice) &&
      calculatePercentage(bidPrice, lowestBuy).isGreaterThanOrEqualTo(minProfitPercentage)
    ) {
      if (bn(bidPrice).isGreaterThan(vars.highest)) {
        vars.highest = bidPrice
      }

      vars.sell = true

      //  We already get all assets with min profit, no reason to check again
      // vars.sell = calculatePercentage(bidPrice, lowestBuy).isGreaterThan(bn(pair.changeToTrend))
      //  instead just check if it is not 0
      // vars.sell = bn(howMuchCanISell).isGreaterThan(0)
      // oh wait, we did check that it is more than min. step. no need to check again!

      // vars.lastActionTime = moment().unix()
      // Trend is changing, lets sell it

      if (calculatePercentage(vars.highest, candle.close).isGreaterThan(api.config.trailing)) {
        console.log(
          `[ACTION] SELLING ${pair.name} , diff: ${calculatePercentage(bidPrice, lowestBuy).toFixed(
            1,
          )} % diff to Highest: ${calculatePercentage(vars.highest, bidPrice).toFixed(2)} % `,
        )
        vars.profit = 0
        sellFn(pair.name, bn(bidPrice), howMuchCanISell, vars).catch((error) => {
          console.log('cant sell', error)
        })
        vars.lastTransactionPrice = candle.close
      }
    } else {
      vars.highest = bidPrice
    }
  } else {
    vars.noAssetsToSell = true
    vars.sell = false
    vars.highest = bidPrice
  }
}
