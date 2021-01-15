import axios from 'axios'
import moment from 'moment'
import api from '../api/api'
import {convertTick} from '../api/kraken/convert-tick'
import {store} from '../api/server-store'
import {makeTransactions} from './make-transactions'
import {trade} from './trade'

export const getTick = async () => {
  const results = await api.getTick()
  const ticks = store.ticks

  ticks.push({timestamp: moment().unix(), pairs: api.convertTick(results)})
  store.ticks = ticks

  // Trade
  const activePairs = Object.entries(store.pairs)
    .filter(([_, config]) => config.active)
    .map(([key]) => key)

  for (const pair of activePairs) {
    const wait = store.tradeVars[pair].wait
    if (wait <= 0) trade(pair)
    else if (wait === 1) {
      makeTransactions(pair)
    } else store.tradeVars[pair].wait = wait - 1
  }

  // Shortend the list of ticks
  if (store.ticks.length > 1000) {
    const div = Math.round(store.ticks.length / 10)
    const ticksArray = store.ticks
    const newArray = [ticksArray[0], ...ticksArray.filter((t, i) => i % div)]
    store.ticks = newArray
  }
}
