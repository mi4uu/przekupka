import {Pair} from '#db/entity/pair'
import {Tick} from '#db/entity/tick'
import moment from 'moment'
import api from '#api/api'
import {ITradeVars, store} from '#api/server-store'
import {trade} from './trade'
import {createTradeVars} from '../api/server-store'
let tickSaveTime = 0
const saveTickEvery = 3000 // Save every 10 minutes
let tickInProgress = false
export const getTick = async () => {
  if (tickInProgress) return false
  tickInProgress = true
  try {
    const results = await api.getTick()
    // Const ticks = store.ticks
    const newTick = api.convertTick(results)

    const ticks = [{timestamp: moment().unix(), pairs: newTick}]
    store.ticks = ticks
    const pairs = await Pair.find()

    for (const pair of pairs) {
      if (!store.tradeVars[pair.name]) {
        store.tradeVars[pair.name] = createTradeVars(pair.name)[1] as ITradeVars
      }

      const wait = store.tradeVars[pair.name].wait
      if (wait === 2) {
        store.tradeVars[pair.name].sell = false
        store.tradeVars[pair.name].buy = false
      }

      if (wait <= 0) {
        await trade(pair)
      } else {
        store.tradeVars[pair.name].wait = wait - 1
      }
    }

    if (tickSaveTime < moment().subtract(10, 'minutes').unix()) {
      tickSaveTime = moment().unix()
      for (const pair of pairs) {
        const t = newTick[pair.name]
        const tdb = new Tick()
        tdb.timestamp = moment().unix()
        tdb.ask = t.a
        tdb.closed = t.c
        tdb.bid = t.b
        tdb.pair = pair
        tdb.save().catch((error) => {
          console.log('something was wrong saving tick for ' + pair.name)
          console.log(error)
        })
      }
    }
  } catch (error: unknown) {
    console.log('error fetching tick:')
    console.log(error)
  }

  tickInProgress = false
}
