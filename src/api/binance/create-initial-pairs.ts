import axios from 'axios'
import {Pair} from '../../db/entity/pair'
import {createConnection} from 'typeorm'
import {bn} from '#utils/bn'
import {markets} from './config'

const changeToTrend = 1.5 // 1.5 my default , please use different (at least by 0.4) one so we wont be competition to each other
// ^^ Less is quicker buy/sell min difference and less profit to wait for . Greter number will result wait longer to buy / sell
// but also greater profit per transaction
const changeToChangeTrend = 0.9 // 0.9 my default , please use different one (at least by 0.2) so we wont be competition to each other
// ^^ less is quicker to decide about buying / selling . Greater numbers are more resilient to price change tho

const changeToTrendBTC = 1.5
const changeToChangeTrendBTC = 0.9

const changeToTrendBNB = 1.5
const changeToChangeTrendBNB = 0.9

const desiredPrice = '40' // How many $ per transaction ( min 20, recomended min 40 )
const desiredPriceBTC = '40' // How many $ per transaction ( min 20, recomended min 40 )
const desiredPriceBNB = '40' // How many $ per transaction ( min 20, recomended min 40 )
const buyPerHour = 1 // Leave it as is
const createInitialPairs = async () => {
  const connection = await createConnection()

  const {data: ticks} = await axios.get('https://www.binance.com/api/v3/ticker/bookTicker')
  const {data: exchangeInfo} = await axios.get('https://www.binance.com/api/v3/exchangeInfo')
  // Console.log(await connection.query('TRUNCATE TABLE pair CASCADE'))
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
      const existingPair = await Pair.findOne(pair.symbol)
      const newPair = existingPair ? existingPair : new Pair()
      newPair.name = pair.symbol

      newPair.changeToChangeTrend = changeToChangeTrend
      newPair.changeToTrend = changeToTrend

      if (pair.quoteAsset === 'BTC') {
        newPair.changeToChangeTrend = changeToChangeTrendBTC
        newPair.changeToTrend = changeToTrendBTC
      }

      if (pair.quoteAsset === 'BNB') {
        newPair.changeToChangeTrend = changeToChangeTrendBNB
        newPair.changeToTrend = changeToTrendBNB
      }

      newPair.buyPerHour = buyPerHour
      newPair.profit = existingPair ? existingPair.profit : '0.0'
      // NewPair.profit = '0.0'
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

      const calculatedVolume = avgCost.multipliedBy(5)
      console.log(JSON.stringify({minQty, calculatedVolume, step}))
      let volume = calculatedVolume.isGreaterThan(minQty) ? calculatedVolume : bn(minQty)

      const btcPrice = bn(1).dividedBy(bn(ticks.find((t: any) => t.symbol === 'BTCUSDT').askPrice))
      const desiredPriceInBTC = btcPrice.multipliedBy(desiredPriceBTC)
      const bnbPrice = bn(1).dividedBy(bn(ticks.find((t: any) => t.symbol === 'BNBUSDT').askPrice))
      const desiredPriceInBNB = bnbPrice.multipliedBy(desiredPriceBNB)
      if (pair.quoteAsset === 'USDT') volume = bn(desiredPrice).dividedBy(bn(tick.askPrice))
      if (pair.quoteAsset === 'BTC') {
        volume = bn(desiredPriceInBTC).dividedBy(bn(tick.askPrice))
      }

      if (pair.quoteAsset === 'BNB') {
        volume = bn(desiredPriceInBNB).dividedBy(bn(tick.askPrice))
      }

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
