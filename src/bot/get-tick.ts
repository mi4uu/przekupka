import axios from 'axios'
import moment from 'moment'
import {convertTick} from '../api/kraken'
import {store} from '../api/server-store'
import {makeTransactions} from './make-transactions'
import {trade} from './trade'

export const getTick = async () => {
  const results = await axios.get('https://api.kraken.com/0/public/Ticker?pair=' + Object.keys(store.pairs).join(','))
  const ticks = store.ticks

  ticks.push({timestamp: moment().unix(), pairs: convertTick(results.data.result)})
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
