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
  return [
    Math.abs(histogram) > histogramString / 2.5 &&
      histogramIsGrowing &&
      macd[macd.length - 1].histogram < 0 &&
      macd[macd.length - 1].signal < 0,
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
  let score = 0
  const [macad1, prices, macad1Data] = await getIndicator(symbol, 1, price)
  const [macad11, prices11, macad11Data] = await getIndicator(symbol, 2, price)
  const [macad111, prices111, macad111Data] = await getIndicator(symbol, 4, price)
  if (!macad1Data || !macad11Data || !macad111Data) {
    return 0
  }

  const [macad2, prices1] = await getIndicator(symbol, 10, price)
  const sma101 = SMA.calculate({period: 10, values: prices1})
  const sma10 = SMA.calculate({period: 10, values: prices})
  const sma50 = SMA.calculate({period: 50, values: prices1})
  const ema10 = EMA.calculate({period: 10, values: prices1})
  const ema50 = EMA.calculate({period: 50, values: prices1})

  if (macad1Data[macad1Data.length - 1].histogram < 0) score += 1
  if (macad11Data[macad11Data.length - 1].histogram < 0) score += 1
  if (macad111Data[macad111Data.length - 1].histogram < 0) score += 1
  if (isMaValid(sma50, prices1, price)) score += 0.5
  if (isMaValid(ema10, prices1, price)) score += 0.5
  if (isMaValid(ema50, prices1, price)) score += 0.5

  const isGrowing = sma101[sma101.length - 1] > sma101[0]

  if (score >= 2 && macad2 && isGrowing) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(`++++++++++++++++ ${symbol} good for buying !!!! score: ${score}`)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

    vars.lastTransactionPrice = bn(price).multipliedBy(100.1).toFixed(8)
    vars.lowest = bn(price).multipliedBy(99.1).toFixed(8)
    return 6
  }

  //  If (macad2 && !isGrowing) console.log(`--- ${symbol} is not growing but macad2 was fine`)
  // if (macad2 && score < 2) console.log(`--- ${symbol} score was ${score} but macad2 was fine`)

  score = 0
  if (score >= 2) score += -1
  if (macad2) score += -10
  if (isGrowing) score += -100

  // Const macdInput = {
  //   values: prices,
  //   fastPeriod: 12,
  //   slowPeriod: 26,
  //   signalPeriod: 9,
  //   SimpleMAOscillator: false,
  //   SimpleMASignal: false,
  // }
  // const macd = MACD.calculate(macdInput)
  // const histogram =
  //   (macd[macd.length - 1].histogram + macd[macd.length - 2].histogram + macd[macd.length - 3].histogram) / 3
  // const histogramString = Math.max(...macd.filter((m) => m.histogram).map((m) => Math.abs(m.histogram)))
  // const histogramIsGrowing =
  //   macd[macd.length - 1].histogram > macd[macd.length - 2].histogram &&
  //   macd[macd.length - 2].histogram > macd[macd.length - 3].histogram
  // // MACAD
  // const string = Math.abs(histogram) > histogramString / 2
  // const negative = macd[macd.length - 1].histogram < 0
  // if (!histogramIsGrowing && string && negative) console.log(`.... ${symbol} is not growing`)
  // if (histogramIsGrowing && !string && negative)
  //   console.log(
  //     `.... ${symbol} histrogram str is not enought str: ${Math.abs(histogram)}  must be more than ${
  //       histogramString / 2
  //     } `,
  //   )
  // if (histogramIsGrowing && string && !negative) console.log(`.... ${symbol}  histogram is positive`)
  return 0
}
