import BigNumber from 'bignumber.js'
import {store, ITradeVars} from '../api/server-store'
import {EMA, MACD, SMA, SD, RSI} from 'technicalindicators'
import ti from 'tulind'
import moment from 'moment'
import {calculatePercentage} from './calculate-percentage'
import {bn} from '../utils/bn'
import api from '../api/api'
import {Pair} from '#db/entity/pair'
import {ToSell} from '#db/entity/to-sell'
import {ClosedTransaction} from '#db/entity/closed-transactions'
import {getRepository} from 'typeorm'
import {Tick} from '#db/entity/tick'
import {getIndicators} from './indicators'

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
  const lastTick = candle
  const price = candle.close
  const askPrice = candle.close
  const bidPrice = candle.close

  // For initial values
  if (!vars.lastTransactionPrice) {
    vars.lowest = askPrice
    vars.highest = bidPrice
  }

  const balanceCoin0 = bn(store.balance[pair.coin0])
  const balanceCoin1 = bn(store.balance[pair.coin1])
  const hourBefore = moment().subtract(8, 'hour').unix()

  const candles = await getRepository(Tick)
    .createQueryBuilder('t')
    .where('t.pairName = :pair AND t.timestamp > :periodToTakeAvgPrice', {
      pair: pair.name,
      periodToTakeAvgPrice: moment().subtract('90', 'hours').unix(),
    })
    .orderBy('t.timestamp', 'ASC')
    .getMany()
  const closeValues = candles.map((c) => Number.parseFloat(c.close))

  const ema1 = EMA.calculate({
    values: closeValues,
    period: 100,
  })
  const ema0 = EMA.calculate({
    values: closeValues,
    period: 20,
  })
  const sma = EMA.calculate({
    values: closeValues,
    period: 100,
  })
  const lastSma = sma[sma.length - 1]
  const candles30m = chunkArray(closeValues, 30).map((v) => v.reduce((a, b) => a + b, 0) / v.length)
  const candles90m = chunkArray(candles30m, 4).map((v) => v.reduce((a, b) => a + b, 0) / v.length)

  const minValue = Math.min(...candles30m)
  const maxValue = Math.max(...candles30m)
  const pricesHistoryDiff = 100 - (minValue / maxValue) * 100
  const shortPeriodMinDiff =
    api.config.minPriceDrop > pricesHistoryDiff / api.config.marketVelocityDivider
      ? api.config.minPriceDrop
      : pricesHistoryDiff / api.config.marketVelocityDivider
  const longPeriodMinDiff = shortPeriodMinDiff * 2
  const macd = MACD.calculate({
    values: candles90m,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  })
  let isStrongBullish = false

  if (macd[macd.length - 1] && macd[macd.length - 5])
    isStrongBullish =
      macd[macd.length - 1].MACD > macd[macd.length - 3].MACD &&
      macd[macd.length - 1].MACD > 0 &&
      macd[macd.length - 1].histogram &&
      (macd[macd.length - 3].MACD < 0 || macd[macd.length - 4].MACD < 0 || macd[macd.length - 5].MACD < 0)
  const isBullish = macd[macd.length - 1]
    ? macd[macd.length - 1]?.MACD > 0 && macd[macd.length - 1]?.MACD > macd[macd.length - 2]?.MACD
    : false
  const rsi_ = await ti.indicators.rsi.indicator([closeValues], [14])
  const rsi = rsi_[0]

  const bband = ema0[ema0.length - 1] - ema0[ema0.length - 1] * (shortPeriodMinDiff / 100)
  const bband1 = ema1[ema1.length - 1] - ema1[ema1.length - 1] * (longPeriodMinDiff / 100)
  vars.lastTransactionPrice =
    Number.parseFloat(price) < ema0[ema0.length - 1] ? String(ema0[ema0.length - 1]) : String(ema1[ema1.length - 1])

  if (pair.active && balanceCoin1.isGreaterThanOrEqualTo(bn(askPrice).multipliedBy(pair.volume))) {
    // Can we afford that?
    vars.cantAffordToBuy = false

    const iHaveOneToSell = await ToSell.count({pair}) // FIXME - cound be passed, should reduce time
    const shortBand = Number.parseFloat(candle.close) < bband
    const longBand = Number.parseFloat(candle.close) < bband1

    const priceLongAgo0Diff = (candles30m[0] / candles30m[candles30m.length - 1]) * 100 // 24h ago
    const priceLongAgo1Diff = (candles30m[8] / candles30m[candles30m.length - 1]) * 100 // 20 h ago
    const priceLongAgo2Diff = (candles30m[28] / candles30m[candles30m.length - 1]) * 100 // 10 h ago
    const isDroppingAfterBigRise =
      priceLongAgo0Diff && priceLongAgo1Diff && priceLongAgo2Diff
        ? priceLongAgo0Diff < 70 || priceLongAgo1Diff < 70 || priceLongAgo2Diff < 70
        : false
    const strats = [rsi[rsi.length - 1] < 22, longBand, shortBand, isStrongBullish].filter(Boolean)
    const stratFilled = strats.length >= 3
    vars.stats = {
      belowBB0: shortBand,
      belowBB1: longBand,
      rsi: Math.round(rsi[rsi.length - 1]),
      macd: bn(macd[macd.length - 1]?.MACD).toFixed(2),
      isDroppingAfterBigRise,
      allowBuying,
      iHaveOneToSell,
      shortPeriodMinDiff,
      longPeriodMinDiff,
      belowLastSma: lastSma > Number.parseFloat(candle.close),
      sma: lastSma,
      bb0: bband,
      bb1: bband1,
      isStrongBullish,
      candle,
    }
    vars.canBuy = strats.length
    vars.buy =
      stratFilled && iHaveOneToSell === 0 && rsi[rsi.length - 1] < 70 && lastSma > Number.parseFloat(candle.close)

    if (
      allowBuying &&
      vars.buy &&
      (bn(candles[candles.length - 1].close).isGreaterThan(candles[candles.length - 2].close) ||
        strats.length >= 4 ||
        (strats.length >= 3 && isBullish)) &&
      !isDroppingAfterBigRise
    ) {
      // Limit buy per h

      console.log('BUYING', pair.name, 'at price', candle.close)
      console.log('EMA:', ema0[ema0.length - 1], 'bb:', bband)
      console.log('Market is', isBullish ? 'BULLish' : 'BEARish')
      console.log('histogram:', macd[macd.length - 1]?.histogram)
      console.log('price diff 24h ago:', priceLongAgo0Diff)
      console.log('price diff 20h ago:', priceLongAgo1Diff)
      console.log('price diff 10h ago:', priceLongAgo2Diff)

      console.log({shortBand, longBand})
      let strategy = `${strats.length} - `
      if (shortBand) strategy += `[EMA20 - ${bn(shortPeriodMinDiff).toFixed(1)}%]`
      if (longBand) strategy += `[EMA100 - ${bn(longPeriodMinDiff).toFixed(1)}%]`
      if (isStrongBullish) strategy += `[STRONG BULLISH]`
      else if (macd[macd.length - 1]) strategy += isBullish ? '[BULL]' : '[BEAR]'

      strategy += '[RSI - ' + bn(rsi[rsi.length - 1]).toFixed(0) + ']'

      if (!macd[macd.length - 1]) {
        console.log('candles 30m length:', candles30m.length)
        console.log('first candles 30m', candles30m[0], candles30m[1])

        console.log('last candles 30m', candles30m[candles30m.length - 2], candles30m[candles30m.length - 1])
      }

      buyFn(pair.name, bn(askPrice), vars, strategy).catch((error) => {
        console.log('cant buy', error)
      })
      vars.buy = false
    } else {
      //   Console.log(JSON.stringify({howMuchDidIBuyInLastHour, howMuchPerHourCanIBuy, pair: pair.name}))
      vars.limitBuyPerHourReached = true
      vars.lowest = askPrice
    }
  } else {
    vars.cantAffordToBuy = true
    vars.lowest = askPrice
  }

  const takeProfitAt_ = pricesHistoryDiff / api.config.targetTakeProfitFromVelocityDivider
  const minProfitPercentage =
    takeProfitAt_ > api.config.takeTrailingProfitFrom ? takeProfitAt_ : api.config.takeTrailingProfitFrom
  vars.takeProfit = minProfitPercentage
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

      vars.lastActionTime = moment().unix()
      // Trend is changing, lets sell it

      if (calculatePercentage(vars.highest, candle.close).isGreaterThan(api.config.trailing)) {
        console.log(
          `[ACTION] SELLING ${pair.name} , diff: ${calculatePercentage(bidPrice, lowestBuy).toFixed(
            1,
          )} % diff to Highest: ${calculatePercentage(vars.highest, bidPrice).toFixed(2)} % `,
        )
        sellFn(pair.name, bn(bidPrice), howMuchCanISell, vars).catch((error) => {
          console.log('cant sell', error)
        })
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
