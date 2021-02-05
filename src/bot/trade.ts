import BigNumber from 'bignumber.js'
import {store, ITradeVars} from '../api/server-store'

import moment from 'moment'
import {calculatePercentage} from './calculate-percentage'
import {bn} from '../utils/bn'
import api from '../api/api'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {ClosedTransaction} from '#db/entity/closed-transactions'
import {getRepository} from 'typeorm'
import {Tick} from '#db/entity/tick'

export const buyFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  // Console.log(pair, 'BUY!!!', price.toFixed(8))
  const p = await Pair.findOneOrFail(pair)
  const result = await api.makeBuyOffer(pair, price.toFixed(p.coin0Precision), bn(p.volume).toFixed(p.coin0Precision))
  if (result) {
    vars.wait += 3
    //  Vars.buy = false
  } else {
    console.log('transaction failed')
    //  Vars.buy = false
  }
}

export const sellFn = async (pair: string, price: BigNumber, volume: string, vars: ITradeVars) => {
  // Console.log(pair, 'SELL!!!', price.toFixed(8), volume)
  const p = await Pair.findOneOrFail(pair)
  const result = await api.makeSellOffer(pair, price.toFixed(p.coin0Precision), bn(volume).toFixed(p.coin0Precision))
  if (result) {
    vars.wait += 3
    // Vars.sell = false
  } else {
    console.log('transaction failed')
    // Vars.sell = false
  }
}

export const trade = async (pair: Pair) => {
  const vars = store.tradeVars[pair.name]
  const lastTick = store.ticks[store.ticks.length - 1].pairs[pair.name]
  const price = lastTick.c
  const askPrice = lastTick.a
  const bidPrice = lastTick.b

  // For initial values
  if (!vars.lastTransactionPrice) {
    vars.lastTransactionPrice = price
    vars.lowest = askPrice
    vars.highest = bidPrice
  }

  const balanceCoin0 = bn(store.balance[pair.coin0])
  const balanceCoin1 = bn(store.balance[pair.coin1])
  const hourBefore = moment().subtract(1, 'hour').unix()
  const periodToTakeAvgPrice = moment().subtract(3, 'days').unix()
  if (balanceCoin1.isGreaterThanOrEqualTo(bn(askPrice).multipliedBy(pair.volume))) {
    // Can we afford that?
    vars.cantAffordToBuy = false

    const howMuchPerHourCanIBuy = bn(pair.buyPerHour).multipliedBy(pair.volume)
    const {howMuchDidIBuyInLastHour} = await getRepository(ClosedTransaction)
      .createQueryBuilder('t')
      .where('t.pairName = :pair AND t.type = :type AND t.opentm > :hourBefore', {
        pair: pair.name,
        hourBefore,
        type: 'buy',
      })
      .select('COALESCE(SUM(t.vol), 0)', 'howMuchDidIBuyInLastHour')
      .getRawOne()

    if (vars.lastActionTime < moment().subtract('24', 'hours').unix()) {
      const {avgPrice} = await getRepository(Tick)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice', {
          pair: pair.name,
          periodToTakeAvgPrice,
        })
        .select('AVG(t.closed)', 'avgPrice')
        .getRawOne()
      const {avgPrice1} = await getRepository(Tick)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice', {
          pair: pair.name,
          periodToTakeAvgPrice: moment().subtract(10, 'days').unix(),
        })
        .select('AVG(t.closed)', 'avgPrice1')
        .getRawOne()
      const {shortAvgPrice} = await getRepository(Tick)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice', {
          pair: pair.name,
          periodToTakeAvgPrice: moment().subtract('3', 'hours').unix(),
        })
        .select('AVG(t.ask)', 'shortAvgPrice')
        .getRawOne()
      const {shortAvgPrice2} = await getRepository(Tick)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice', {
          pair: pair.name,
          periodToTakeAvgPrice: moment().subtract('1', 'hours').unix(),
        })
        .select('AVG(t.ask)', 'shortAvgPrice2')
        .getRawOne()

      const {avg2DaysAgo} = await getRepository(Tick)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice AND t.timestamp > :periodToTakeAvgPrice1 ', {
          pair: pair.name,
          periodToTakeAvgPrice: moment().subtract('2', 'days').subtract('12', 'hours').unix(),
          periodToTakeAvgPrice1: moment().subtract('2', 'days').unix(),
        })
        .select('AVG(t.ask)', 'avg2DaysAgo')
        .getRawOne()
      const {avg5DaysAgo} = await getRepository(Tick)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice AND t.timestamp > :periodToTakeAvgPrice1 ', {
          pair: pair.name,
          periodToTakeAvgPrice: moment().subtract('5', 'days').subtract('12', 'hours').unix(),
          periodToTakeAvgPrice1: moment().subtract('5', 'days').unix(),
        })
        .select('AVG(t.ask)', 'avg5DaysAgo')
        .getRawOne()
      vars.lastTransactionPrice = shortAvgPrice
      // Console.log(
      //   `Setting last trasnsaction price for ${pair.name} : ${shortAvgPrice}  it is ${calculatePercentage(
      //     shortAvgPrice,
      //     askPrice,
      //   ).toFixed(2)} % of current price`,
      // )
      const prices = [avgPrice, avgPrice1, shortAvgPrice, shortAvgPrice2].filter(Boolean)
      vars.lastTransactionPrice = BigNumber.min.apply(null, prices).toFixed(8)

      // Check if this price is not constantly falling
      if (
        bn(avg5DaysAgo).isGreaterThan(avg2DaysAgo) &&
        bn(avg2DaysAgo).isGreaterThan(shortAvgPrice2) &&
        bn(shortAvgPrice2).isGreaterThan(shortAvgPrice)
      ) {
        // Lets set it rly low
        vars.lastTransactionPrice = bn(shortAvgPrice).multipliedBy('0.7').toFixed(8)
      }

      vars.lastActionTime = moment().unix()
    }

    if (bn(howMuchDidIBuyInLastHour).isLessThan(howMuchPerHourCanIBuy)) {
      // Limit buy per h
      vars.limitBuyPerHourReached = false

      const marketLiquidity = calculatePercentage(askPrice, bidPrice)
      const changeFromLastTransaction = calculatePercentage(vars.lastTransactionPrice, askPrice)
      const minDiffToBuy = bn(pair.changeToTrend).multipliedBy('1').plus(marketLiquidity)
      if (
        changeFromLastTransaction.isGreaterThan(minDiffToBuy) &&
        api.isTransactionValid(pair, pair.volume, askPrice)
      ) {
        vars.buy = true
        vars.lastActionTime = moment().unix()
        if (bn(vars.lowest).isGreaterThan(bn(askPrice))) vars.lowest = askPrice
        const diffToLowest = calculatePercentage(askPrice, vars.lowest)
        if (diffToLowest.isGreaterThanOrEqualTo(pair.changeToChangeTrend)) {
          buyFn(pair.name, bn(askPrice), vars).catch((error) => {
            console.log('cant buy', error)
          })
        }
      } else {
        vars.buy = false
        vars.lowest = askPrice
      }
    } else {
      //   Console.log(JSON.stringify({howMuchDidIBuyInLastHour, howMuchPerHourCanIBuy, pair: pair.name}))
      vars.limitBuyPerHourReached = true
      vars.buy = false
      vars.lowest = askPrice
    }
  } else {
    vars.cantAffordToBuy = true
    vars.buy = false
    vars.lowest = askPrice
  }

  // Did we buy anything to sell ?
  const minProfit = bn(bidPrice).multipliedBy(bn(pair.changeToTrend).dividedBy(100))
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
  if (pair.debug) {
    console.log(
      getRepository(ToSell)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.filled = :filled AND t.price <= :maxPrice', {
          pair: pair.name,
          maxPrice: maxPrice.toFixed(pair.coin0Precision),
          filled: false,
        })
        .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
        .addSelect('MIN(t.price)', 'lowestBuy')
        .getQueryAndParameters(),
    )
    const howMuchCanISell1 = bn(howMuchToSell).isGreaterThan(balanceCoin0) ? howMuchToSell : balanceCoin0
    console.log(
      JSON.stringify(
        {
          pairName: pair.name,
          step: pair.step,
          howMuchToSell,
          balanceCoin0,
          minProfit: minProfit.toFixed(8),
          maxPrice: maxPrice.toFixed(pair.coin0Precision),
          bidPrice,
          lowestBuy,
          isTransactionValid: api.isTransactionValid(pair, howMuchCanISell1, bidPrice),
          selling: vars.sell,
        },
        null,
        2,
      ),
    )
  }

  if (bn(howMuchToSell).isGreaterThan(0)) {
    vars.noAssetsToSell = false
    const howMuchCanISell = bn(howMuchToSell).isGreaterThan(balanceCoin0) ? howMuchToSell : balanceCoin0

    if (api.isTransactionValid(pair, howMuchCanISell, bidPrice)) {
      if (bn(bidPrice).isGreaterThan(vars.highest)) {
        vars.highest = bidPrice
      }

      vars.sell = true

      //  We already get all assets with min profit, no reason to check again
      // vars.sell = calculatePercentage(bidPrice, lowestBuy).isGreaterThan(bn(pair.changeToTrend))
      //  instead just check if it is not 0
      // vars.sell = bn(howMuchCanISell).isGreaterThan(0)
      // oh wait, we did check that it is more than min. step. no need to check again!

      vars.lastActionTime = moment().unix()
      if (bn(vars.highest).isLessThan(bn(bidPrice))) vars.highest = bidPrice
      // Trend is changing, lets sell it

      if (calculatePercentage(vars.highest, bidPrice).isGreaterThanOrEqualTo(pair.changeToChangeTrend)) {
        console.log(
          `[ACTION] SELLING ${pair.name} , diff: ${calculatePercentage(bidPrice, lowestBuy).toFixed(
            1,
          )} % diff to Highest: ${calculatePercentage(vars.highest, bidPrice)} % `,
        )
        sellFn(pair.name, bn(bidPrice), howMuchCanISell, vars).catch((error) => {
          console.log('cant sell', error)
        })
        // Console.log(
        //   'sell',
        //   JSON.stringify({
        //     diffToHighestPrice,
        //     howMuchCanISell,
        //     pair: pair.name,
        //     step: pair.step,
        //   }),
        // )
        // Selling
        // vars.sell = false
      } else {
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
