import {Pair} from '#db/entity/pair'
import {Tick} from '#db/entity/tick'
import moment from 'moment'
import api from '#api/api'
import {ITradeVars, store} from '#api/server-store'
import {buyFn, trade} from './trade'
import {createTradeVars} from '../api/server-store'
import {bn} from '#utils/bn'
import BigNumber from 'bignumber.js'
import {ToSell} from '#db/entity/to-sell'
import {calculatePercentage} from './calculate-percentage'
import {getRepository} from 'typeorm'
import {default as PQueue} from 'p-queue'

let tickSaveTime = moment().unix()
let tickInProgress = false
const tickCount = {}
let counting = false
let countRotator = 0
const countInit = async () => {
  countRotator -= 1
  if (countRotator > 0) return false
  if (counting) return false
  counting = true
  const pairs = await Pair.find()
  for (const pair of pairs) {
    tickCount[pair.name] = await Tick.count({pair})
  }

  counting = false
  countRotator = 30
}

setTimeout(countInit, 2000)
let tick_ = 0
export const getTick = async () => {
  if (tickInProgress) return false
  tickInProgress = true
  const results = await api.getTick()
  // Const ticks = store.ticks
  const newTick = api.convertTick(results)

  const tick = {timestamp: moment().unix(), pairs: newTick}
  store.ticks.push(tick)
  const pairs = await Pair.find({active: true})
  for (const pair of pairs) {
    if (!store.tradeVars[pair.name]) {
      store.tradeVars[pair.name] = createTradeVars(pair.name)[1] as ITradeVars
    }

    store.tradeVars[pair.name].wait = 0
    trade(pair, {close: tick.pairs[pair.name].c}, true)
  }

  if (tickSaveTime < moment().subtract(1, 'minutes').unix()) {
    const inactivePairs = await Pair.find({active: false})

    const startTime = moment().unix()
    let btcIsStable = true
    const {avgBTCPricePrice24hAgo} = await getRepository(Tick)
      .createQueryBuilder('t')
      .where(
        't.pairName = :pair AND t.timestamp > :periodToTakeAvgPriceStart AND  t.timestamp < :periodToTakeAvgPriceStop',
        {
          pair: 'BTCUSDT',
          periodToTakeAvgPriceStart: moment().subtract(24, 'hours').unix(),
          periodToTakeAvgPriceStop: moment().subtract(22, 'hours').unix(),
        },
      )
      .select('AVG(t.close)', 'avgBTCPricePrice24hAgo')
      .getRawOne()

    if (avgBTCPricePrice24hAgo) {
      const priceDiff = (avgBTCPricePrice24hAgo / store.ticks[store.ticks.length - 1].pairs.BTCUSDT.c) * 100
      if (priceDiff < 85) {
        // Drop by 15% in BTC price in last 24h - stop buying anything for now
        btcIsStable = false
        console.log('BTC price dropped by', bn(100 - priceDiff).toFixed(2), 'buying is STOPPED for now!')
      }
    }

    tickSaveTime = moment().unix()
    const queueArray = []
    const queue = new PQueue({concurrency: 10})
    tick_ += 1
    const toSellCount = await ToSell.count({dust: false, filled: false})
    for (const pair of inactivePairs) {
      const t = newTick[pair.name]
      const tdb = new Tick()
      tdb.pair = pair
      tdb.timestamp = moment().unix()
      tdb.open = store.ticks[0].pairs[pair.name].c
      tdb.close = store.ticks[store.ticks.length - 1].pairs[pair.name].c
      const values = store.ticks.map((tick) => bn(tick.pairs[pair.name].c))
      tdb.high = BigNumber.maximum(...values).toFixed(8)
      tdb.low = BigNumber.minimum(...values).toFixed(8)
      if (tickCount[pair.name] > 24 * 60) {
        const balance =
          pair.coin1 === 'USDT'
            ? bn(store.balance[pair.coin1])
            : bn(store.balance[pair.coin1]).multipliedBy(
                store.ticks[store.ticks.length - 1].pairs[`${pair.coin1}USDT`].c,
              )

        queueArray.push(async () =>
          trade(
            pair,
            tdb,
            balance.isGreaterThan(api.config.dontBuybelow[pair.coin1]) &&
              Number.parseFloat(tdb.close) > 0.00000099 &&
              toSellCount < 10,
          ),
        )
      } // Else console.log(`[${pair.name}] ticks count ${tickCount[pair.name]} <  24*60`)

      store.ticks = [store.ticks[store.ticks.length - 1]]
      tdb.save().catch((error) => {
        console.log('something was wrong saving tick for ')
        console.log(pair.name)
        console.log(error)
      })
    }

    await queue.addAll(queueArray)

    console.log(moment().format('YYYY-MM-DD hh:mm'), ']', tick_, 'tick -  took', moment().unix() - startTime, 's')
    tick_ += 1
    const toSell = await ToSell.find({dust: false})
    const usedPairs: string[] = []
    for (const ts of toSell) {
      // Position price multiplied by 104% < price = drop by 4 %

      const pair = await ts.pair

      if (!api.isTransactionValid(pair, ts.left, ts.price)) {
        ts.dust = true
        await ts.save()
        continue
      }

      if (ts.buyUpdate > moment().subtract(5, 'minutes').unix()) continue

      // Disable safe buy for this strat
      if (usedPairs.includes(pair.name)) continue

      // Buy ->
      //        drop 6% ->  3%
      //        drop 10% -> 5%
      //        drop 20% -> 6%
      const safeBuyMultipliers = api.config.safeBuyTresholds
      const safeBuyTresholds = api.config.safeBuyTresholds
      const maxSafeBuys = safeBuyMultipliers.length

      if (
        safeBuyTresholds[ts.safeBuy] &&
        moment().unix() - ts.buyUpdate > 60 * 10 &&
        calculatePercentage(ts.price, store.ticks[store.ticks.length - 1].pairs[pair.name].c).isGreaterThan(
          safeBuyTresholds[ts.safeBuy],
        )
      ) {
        usedPairs.push(pair.name)

        const amount = bn(ts.left).multipliedBy(safeBuyMultipliers[ts.safeBuy])

        if (ts.safeBuy < maxSafeBuys) {
          if (bn(store.balance[pair.coin1]).isGreaterThan(amount.multipliedBy(ts.price))) {
            console.log(
              'SAFETY BUY FOR',
              pair.name,
              `(${ts.id}) price dropped over`,
              safeBuyTresholds[ts.safeBuy],
              '%.',
            )

            const result = await api.makeBuyOffer(
              pair.name,
              amount.toFixed(pair.coin0Precision),
              amount.toFixed(pair.coin0Precision),
              `safetyBuy::${ts.id}`,
            )

            // Ts.safeBuy += 1
            // await ts.save()
            console.log(result)
          } else {
            // Console.log(
            //   'not enought balance  to make safety trade. Need:',
            //   amount.multipliedBy(ts.price).toFixed(8),
            //   ' ',
            //   pair.coin1,
            //   'HAVE:',
            //   store.balance[pair.coin1],
            //   ' ',
            //   pair.coin1,
            // )
          }
        } else {
          console.log('it is overinvested. sry ;(')
        }
      }
    }

    // Counting ticks
    countInit().catch((error) => {
      console.log('error counting')
    })
  }

  tickInProgress = false
}
