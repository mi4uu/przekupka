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
  if (1 < 2) return 0

  const [macd, prices, macdData] = await getIndicator(symbol, 13, price) // ~ 5 days for 26 slow period
  const sma = SMA.calculate({period: 10, values: prices})
  const growing = sma[0] < sma[sma.length - 1] || sma[2] < sma[sma.length - 1] || sma[4] < sma[sma.length - 1]
  const [macd_, pricesShort, macdData_] = await getIndicator(symbol, 2.6, price) // ~ 1 day for 26 slow period
  const min = Math.min(...pricesShort)
  const max = Math.max(...pricesShort)
  const diff = (min / max) * 100
  let score = 0
  if (macd) score += 1
  if (growing) score += 1
  if (diff) score += 1
  if (!macdData_) return false
  const shortMACD = macdData_[macdData_.length - 1]
  if (macd && growing && diff < 95 && shortMACD.MACD > 0 && shortMACD.histogram > 0) {
    vars.lastTransactionPrice = bn(price).multipliedBy('1.2').toFixed(8)
    vars.lowest = bn(price).multipliedBy('0.9').toFixed(8)
    return 6
  }

  if (score === 2 && macd) console.log(symbol, `growing: ${growing}  diff: ${diff}`)

  return 0
}
