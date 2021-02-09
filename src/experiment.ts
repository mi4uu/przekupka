import {Tick} from '#db/entity/tick'
import {connect} from './db/db'
import {MACD} from 'technicalindicators'
import moment from 'moment'
import {getRepository} from 'typeorm'
const genPeriods = (count: number) =>
  [...new Array(count).keys()].map((i) => ({
    from: moment()
      .subtract((i + 1) * 20, 'minutes')
      .unix(),
    to: moment()
      .subtract(i * 20, 'minutes')
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

const getIndicators = async (symbol: string) => {
  await connect()

  const prices26 = await Promise.all(genPeriods(60).map(async (p) => getPriceForPeriod(symbol, p.from, p.to)))
  console.log(prices26)
  const macdInput = {
    values: prices26.reverse(),
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  }
  const macd = MACD.calculate(macdInput)
  const histogram = macd[macd.length - 1].histogram
  const histogramString = Math.max(...macd.filter((m) => m.histogram).map((m) => m.histogram))
  console.log(macd)
  console.log({
    histogramString,
    histogram,
    result: histogram < histogramString / 2 && histogram < 0,
  })
  return histogram < histogramString / 2 && histogram < 0
}

getIndicators('UNIUSDT')
