import axios from 'axios'
import {Pair} from '../../db/entity/pair'
import {createConnection} from 'typeorm'
import {bn} from '#utils/bn'

const markets = new Set(['USD', 'BTC', 'ETH'])
const changeToTrend = 2
const changeToChangeTrend = 1
const buyPerHour = 2
const createInitialPairs = async () => {
  await createConnection()
  const count = await Pair.count()
  if (count > 0) {
    console.log('Error: db not empty')
    return 1
  }

  const {data: currencies} = await axios.get('https://api.hitbtc.com/api/2/public/currency')
  const {data: pairs} = await axios.get('https://api.hitbtc.com/api/2/public/symbol')
  pairs.forEach(async (pair: any) => {
    if (markets.has(pair.quoteCurrency)) {
      const coin0Info = currencies.find((c: any) => c.id === pair.baseCurrency)
      const coin1Info = currencies.find((c: any) => c.id === pair.quoteCurrency)

      const newPair = new Pair()
      newPair.name = pair.id
      newPair.changeToChangeTrend = changeToChangeTrend
      newPair.changeToTrend = changeToTrend
      newPair.buyPerHour = buyPerHour
      newPair.profit = '0.0'
      newPair.coin0 = pair.baseCurrency
      newPair.coin1 = pair.quoteCurrency
      newPair.coin0Name = pair.baseCurrency
      newPair.coin1Name = pair.quoteCurrency
      newPair.coin0Precision = coin0Info.precisionPayout
      newPair.coin1Precision = coin1Info.precisionPayout
      newPair.coin0FriendlyName = coin0Info.fullName
      newPair.coin1FriendlyName = coin1Info.fullName
      newPair.step = pair.quantityIncrement
      newPair.volume = bn(pair.quantityIncrement).multipliedBy(10).toFixed(coin0Info.precisionPayout)
      newPair.active = true
      console.log(`creating ${pair.id}`)
      await newPair.save()
    }
  })
}

createInitialPairs()
