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

export const buyFn = async (pair: string, price: BigNumber, vars: ITradeVars) => {
  // Console.log(pair, 'BUY!!!', price.toFixed(8))
  const p = await Pair.findOneOrFail(pair)
  const result = await api.makeBuyOffer(pair, price.toFixed(p.coin0Precision), bn(p.volume).toFixed(p.coin0Precision))
  if (result) {
    vars.wait = 40
  } else {
    console.log('transaction failed')
    vars.buy = false
  }
}

export const sellFn = async (pair: string, price: BigNumber, volume: string, vars: ITradeVars) => {
  // Console.log(pair, 'SELL!!!', price.toFixed(8), volume)
  const p = await Pair.findOneOrFail(pair)
  const result = await api.makeSellOffer(pair, price.toFixed(p.coin0Precision), bn(volume).toFixed(p.coin0Precision))
  if (result) {
    vars.wait = 40
  } else {
    console.log('transaction failed')
    vars.sell = false
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

  if (bn(bidPrice).isGreaterThan(vars.highest) && calculatePercentage(bidPrice, vars.highest).abs().isLessThan(10)) {
    vars.highest = bidPrice
  }

  const balanceCoin0 = bn(store.balance[pair.coin0])
  const balanceCoin1 = bn(store.balance[pair.coin1])
  const hourBefore = moment().subtract(1, 'hour').unix()

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

    if (bn(howMuchDidIBuyInLastHour).isLessThan(howMuchPerHourCanIBuy)) {
      // Limit buy per h
      vars.limitBuyPerHourReached = false

      const marketLiquidity = calculatePercentage(askPrice, bidPrice)
      const changeFromLastTransaction = calculatePercentage(vars.lastTransactionPrice, askPrice)
      const minDiffToBuy = bn(pair.changeToTrend).multipliedBy(3).plus(marketLiquidity)
      if (
        changeFromLastTransaction.isGreaterThan(minDiffToBuy) &&
        api.isTransactionValid(pair, pair.volume, askPrice)
      ) {
        vars.buy = true
        vars.lastActionTime = moment().unix()
        if (bn(vars.lowest).isGreaterThan(bn(askPrice))) vars.lowest = askPrice
        const diffToLowest = calculatePercentage(askPrice, vars.lowest)
        if (diffToLowest.isGreaterThanOrEqualTo(minDiffToBuy)) {
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
    .where('t.pairName = :pair AND t.filled = :filled AND t.price < :maxPrice', {
      pair: pair.name,
      maxPrice: maxPrice.toFixed(pair.coin0Precision),
      filled: false,
    })
    .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
    .addSelect('MIN(t.price)', 'lowestBuy')
    .getRawOne()
  if (pair.debug) {
    const howMuchCanISell1 = bn(howMuchToSell).isGreaterThan(balanceCoin0) ? balanceCoin0 : howMuchToSell
    console.log(
      JSON.stringify(
        {
          pairName: pair.name,
          step: pair.step,
          howMuchToSell,
          balanceCoin0,
          minProfit,
          maxPrice,
          bidPrice,
          lowestBuy,
          isTransactionValid: api.isTransactionValid(pair, howMuchCanISell1, bidPrice),
        },
        null,
        2,
      ),
    )
  }

  if (bn(howMuchToSell).isGreaterThanOrEqualTo(0)) {
    vars.noAssetsToSell = false
    const howMuchCanISell = bn(howMuchToSell).isGreaterThan(balanceCoin0) ? balanceCoin0 : howMuchToSell

    if (api.isTransactionValid(pair, howMuchCanISell, bidPrice)) {
      const diffToHighestPrice = calculatePercentage(bidPrice, vars.highest)
      vars.sell = true

      //  We already get all assets with min profit, no reason to check again
      // vars.sell = calculatePercentage(bidPrice, lowestBuy).isGreaterThan(bn(pair.changeToTrend))
      //  instead just check if it is not 0
      // vars.sell = bn(howMuchCanISell).isGreaterThan(0)
      // oh wait, we did check that it is more than min. step. no need to check again!

      vars.lastActionTime = moment().unix()
      if (bn(vars.highest).isLessThan(bn(bidPrice))) vars.highest = bidPrice
      // Trend is changing, lets sell it
      if (diffToHighestPrice.isLessThanOrEqualTo(bn(pair.changeToChangeTrend).multipliedBy(-1))) {
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
        vars.sell = false
      } else {
        sellFn(pair.name, bn(bidPrice), howMuchCanISell, vars).catch((error) => {
          console.log('cant sell', error)
        })
      }
    }
  } else {
    vars.noAssetsToSell = true
    vars.sell = false
    vars.highest = bidPrice
  }
}
