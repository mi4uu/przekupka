import {Pair} from '#db/entity/pair'
import {Tick} from '#db/entity/tick'
import moment from 'moment'
import api from '#api/api'
import {ITradeVars, store} from '#api/server-store'
import {trade} from './trade'
import {createTradeVars} from '../api/server-store'
import {bn} from '#utils/bn'
import BigNumber from 'bignumber.js'
import {ToSell} from '#db/entity/to-sell'
import {calculatePercentage} from './calculate-percentage'
import {getRepository} from 'typeorm'
let tickSaveTime = moment().unix()
let tickInProgress = false
const tickCount = {}

export const getTick = async () => {
  if (tickInProgress) return false
  tickInProgress = true
  const results = await api.getTick()
  // Const ticks = store.ticks
  const newTick = api.convertTick(results)

  const tick = {timestamp: moment().unix(), pairs: newTick}
  store.ticks.push(tick)
  const pairs = await Pair.find()
  for (const pair of pairs) {
    if (!store.tradeVars[pair.name]) {
      store.tradeVars[pair.name] = createTradeVars(pair.name)[1] as ITradeVars
    }

    store.tradeVars[pair.name].wait = 0
  }

  if (tickSaveTime < moment().subtract(1, 'minutes').unix()) {
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
    for (const pair of pairs) {
      const t = newTick[pair.name]
      const tdb = new Tick()
      tdb.pair = pair
      tdb.timestamp = moment().unix()
      tdb.open = store.ticks[0].pairs[pair.name].c
      tdb.close = store.ticks[store.ticks.length - 1].pairs[pair.name].c
      const values = store.ticks.map((tick) => bn(tick.pairs[pair.name].c))
      tdb.high = BigNumber.maximum(...values).toFixed(8)
      tdb.low = BigNumber.minimum(...values).toFixed(8)
      if (tickCount[pair.name] > 100) {
        const balance =
          pair.coin1 === 'USDT'
            ? bn(store.balance[pair.coin1])
            : bn(store.balance[pair.coin1]).multipliedBy(
                store.ticks[store.ticks.length - 1].pairs[`${pair.coin1}USDT`].c,
              )

        await trade(pair, tdb, balance.isGreaterThan(500) && btcIsStable && Number.parseFloat(tdb.close) > 0.00000099)
      } else console.log(`[${pair.name}] ticks count ${tickCount[pair.name]} < 101`)
      store.ticks = [store.ticks[store.ticks.length - 1]]
      tdb.save().catch((error) => {
        console.log('something was wrong saving tick for ')
        console.log(pair.name)
        console.log(error)
      })
    }

    console.log('tick -', moment().unix() - startTime, 's')

    const toSell = await ToSell.find({dust: false})
    for (const ts of toSell) {
      // Position price multiplied by 104% < price = drop by 4 %
      const pair = await ts.pair
      if (!api.isTransactionValid(pair, ts.left, ts.price)) {
        ts.dust = true
        await ts.save()
      }
      // Buy   2.5%   6%      15%    25%
      // 10 -> 15 -> 22.5  ->  45 -> 90
      // 50 -> 75 -> 112.5 -> 225 -> 450

      const safeBuyMultipliers = [1] // [1, 1, 1, 1, 1]
      const safeBuyTresholds = [999999] // [3, 7, 12, 20, 35]
      const maxSafeBuys = safeBuyMultipliers.length

      if (
        calculatePercentage(ts.price, store.ticks[store.ticks.length - 1].pairs[pair.name].c).isGreaterThan(
          safeBuyTresholds[ts.safeBuy],
        )
      ) {
        console.log('SAFETY BUY FOR', pair.name, 'price dropped over', safeBuyTresholds[ts.safeBuy], '%.')
        const amount = bn(ts.left).multipliedBy(safeBuyMultipliers[ts.safeBuy])

        if (ts.safeBuy < maxSafeBuys) {
          if (bn(store.balance[pair.coin1]).isGreaterThan(amount.multipliedBy(ts.price))) {
            const result = await api.makeBuyOffer(pair.name, '0000', amount.toFixed(pair.coin0Precision))
            ts.safeBuy += 1
            await ts.save()
            console.log(result)
          } else {
            console.log(
              'not enought balance  to make safety trade. Need:',
              amount.multipliedBy(ts.price).toFixed(8),
              ' ',
              pair.coin1,
              'HAVE:',
              store.balance[pair.coin1],
              ' ',
              pair.coin1,
            )
          }
        } else {
          console.log('it is overinvested. sry ;(')
        }
      }
    }

    // Counting ticks
    for (const pair of pairs) {
      tickCount[pair.name] = await Tick.count({pair})
    }
  }

  tickInProgress = false
}
