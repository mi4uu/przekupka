import {Tick} from '#db/entity/tick'
import {connect} from '#db/db'
import {EMA, MACD, SMA, SD} from 'technicalindicators'
import moment from 'moment'
import {getRepository} from 'typeorm'
import {bn} from '#utils/bn'
import {ITradeVars} from '#api/server-store'
const period1Day = 1440 // Minutes
const genPeriods = (count: number, desiredPeriodInDays: number) =>
  [...new Array(count).keys()].map((i) => ({
    from: moment()
      .subtract((i + 1) * ((desiredPeriodInDays * period1Day) / count), 'minutes')
      .unix(),
    to: moment()
      .subtract(i * ((desiredPeriodInDays * period1Day) / count), 'minutes')
      .unix(),
  }))

const getPriceForPeriod = async (symbol: string, start: number, stop: number) => {
  const {avgPrice} = await getRepository(Tick)
    .createQueryBuilder('t')
    .where('t.pairName = :symbol AND t.timestamp > :start AND t.timestamp < :stop ', {
      symbol,
      start,
      stop,
    })
    .select('AVG(t.closed)', 'avgPrice')
    .getRawOne()
  return Number.parseFloat(avgPrice)
}

const getIndicator = async (symbol: string, desiredPeriodInDays: number, price: string) => {
  const points = 0
  const prices26 = await Promise.all(
    genPeriods(60, desiredPeriodInDays).map(async (p) => getPriceForPeriod(symbol, p.from, p.to)),
  )
  const reversed = [...prices26.reverse()].filter(Boolean)
  const macdInput = {
    values: reversed,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  }
  const macd = MACD.calculate(macdInput)
  if (macd.length === 0) return [false, []]
  const histogram =
    (macd[macd.length - 1].histogram + macd[macd.length - 2].histogram + macd[macd.length - 3].histogram) / 3
  const histogramString = Math.max(...macd.filter((m) => m.histogram).map((m) => Math.abs(m.histogram)))
  const histogramIsGrowing =
    macd[macd.length - 1].histogram > macd[macd.length - 2].histogram &&
    macd[macd.length - 2].histogram > macd[macd.length - 3].histogram
  // MACAD
  const wasNegative = macd[macd.length - 2].histogram < 0 || macd[macd.length - 3].histogram < 0
  return [
    histogramIsGrowing && macd[macd.length - 1].histogram > 0 && macd[macd.length - 1].MACD > 0 && wasNegative,
    reversed,
    macd,
  ]
}

const isMaValid = (ma, prices, price) =>
  bn(ma[ma.length - 1])
    .minus(price)
    .abs()
    .isGreaterThan(
      bn(ma[ma.length - 2])
        .minus(prices[prices.length - 2])
        .abs(),
    ) &&
  bn(ma[ma.length - 2])
    .minus(prices[prices.length - 2])
    .abs()
    .isGreaterThan(
      bn(ma[ma.length - 3])
        .minus(prices[prices.length - 3])
        .abs(),
    ) &&
  bn(ma[ma.length - 1]).isLessThan(price)

export const getIndicators = async (symbol: string, price: string, vars: ITradeVars) => {
  const price4 = await getPriceForPeriod(symbol, moment().subtract(15, 'minutes').unix(), moment().unix())
  const price3 = await getPriceForPeriod(
    symbol,
    moment().subtract(30, 'minutes').unix(),
    moment().subtract(15, 'minutes').unix(),
  )
  const price2 = await getPriceForPeriod(
    symbol,
    moment().subtract(45, 'minutes').unix(),
    moment().subtract(30, 'minutes').unix(),
  )
  const price1 = await getPriceForPeriod(
    symbol,
    moment().subtract(60, 'minutes').unix(),
    moment().subtract(45, 'minutes').unix(),
  )
  const price0 = await getPriceForPeriod(
    symbol,
    moment().subtract(80, 'minutes').unix(),
    moment().subtract(60, 'minutes').unix(),
  )
  let points = 0
  if (price4 > price3) points += 1
  if (price3 > price2) points += 1
  if (price2 > price1) points += 1
  if (price1 > price0) points += 1
  if (price4 > price0) points += 1
  console.log('prices for', symbol, 'points:', points)
  console.log(price0, price1, price2, price3, price4)

  return points
}
