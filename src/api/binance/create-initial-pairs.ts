import axios from 'axios'
import {Pair} from '../../db/entity/pair'
import {createConnection} from 'typeorm'
import {bn} from '#utils/bn'
import {markets} from './config'

const changeToTrend = 3
const changeToChangeTrend = 0.9
const buyPerHour = 2
const createInitialPairs = async () => {
  const connection = await createConnection()

  const {data: ticks} = await axios.get('https://www.binance.com/api/v3/ticker/bookTicker')
  const {data: exchangeInfo} = await axios.get('https://www.binance.com/api/v3/exchangeInfo')
  console.log(await connection.query('TRUNCATE TABLE pair CASCADE'))
  const pairs = exchangeInfo.symbols
  pairs
    .filter((pair: any) => {
      return markets.has(pair.quoteAsset)
    })
    .filter((pair: any) => {
      return pair.status === 'TRADING'
    })
    .filter((pair: any) => {
      const tick = ticks.find((t: any) => t.symbol === pair.symbol)
      if (!tick) return false
      if (pair.baseAsset.endsWith('UP')) return false
      if (pair.baseAsset.endsWith('DOWN')) return false
      if (bn(tick.askPrice).isZero() || bn(tick.bidPrice).isZero()) return false
      return markets.has(pair.quoteAsset)
    })
    .forEach(async (pair: any) => {
      const tick = ticks.find((t: any) => t.symbol === pair.symbol)
      const newPair = new Pair()
      newPair.name = pair.symbol
      newPair.changeToChangeTrend = changeToChangeTrend
      newPair.changeToTrend = changeToTrend
      newPair.buyPerHour = buyPerHour
      newPair.profit = '0.0'
      newPair.coin0 = pair.baseAsset
      newPair.coin1 = pair.quoteAsset
      newPair.coin0Name = pair.baseAsset
      newPair.coin1Name = pair.quoteAsset
      newPair.coin0Precision = pair.baseAssetPrecision
      newPair.coin1Precision = pair.quoteAssetPrecision
      newPair.coin0FriendlyName = pair.baseAsset
      newPair.coin1FriendlyName = pair.quoteAsset
      // Try to find min volume
      const minNotional = pair.filters.find((f: any) => bn(f.minNotional).isGreaterThan(0))?.minNotional
      const avgCost = bn(minNotional).dividedBy(bn(tick.askPrice))
      const step = bn(pair.filters.find((f: any) => f.filterType === 'LOT_SIZE')?.stepSize).dp()
      const minQty = pair.filters.find((f: any) => f.filterType === 'LOT_SIZE')?.minQty

      const calculatedVolume = avgCost.multipliedBy(2)
      console.log(JSON.stringify({minQty, calculatedVolume, step}))
      const volume = calculatedVolume.isGreaterThan(minQty) ? calculatedVolume : bn(minQty)
      newPair.step = String(step)
      newPair.param0 = minNotional
      newPair.volume = volume.dp(step).toFixed(step)
      newPair.active = true
      console.log(
        `creating ${newPair.name} with volume ${newPair.volume} worth of ${bn(tick.askPrice)
          .multipliedBy(newPair.volume)
          .toFixed(8)}`,
      )

      await newPair.save()
    })
}

createInitialPairs()
