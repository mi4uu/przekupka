import {Tick} from '#db/entity/tick'
import {connect} from '#db/db'
import {EMA, MACD, SMA} from 'technicalindicators'
import moment from 'moment'
import {getRepository} from 'typeorm'
import {bn} from '#utils/bn'
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
  const histogram = macd[macd.length - 1].histogram
  const histogramString = Math.max(...macd.filter((m) => m.histogram).map((m) => Math.abs(m.histogram)))
  // MACAD
  return [histogram < histogramString / 2 && histogram < 0, reversed]
}

export const getIndicators = async (symbol: string, price: string) => {
  let score = 0
  const [macad1] = await getIndicator(symbol, 1, price)
  const [macad2, prices] = await getIndicator(symbol, 3, price)
  const sma10 = SMA.calculate({period: 10, values: prices})
  const sma50 = SMA.calculate({period: 50, values: prices})
  const ema10 = EMA.calculate({period: 10, values: prices})
  const ema50 = EMA.calculate({period: 50, values: prices})

  if (macad1) score += 1
  if (macad2) score += 1
  if (bn(sma10[sma10.length - 1]).isLessThan(price)) score += 1
  if (bn(sma50[sma50.length - 1]).isLessThan(price)) score += 1
  if (bn(ema10[ema10.length - 1]).isLessThan(price)) score += 1
  if (bn(ema50[ema50.length - 1]).isLessThan(price)) score += 1
  return score
}
