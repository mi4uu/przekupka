import axios from 'axios'
import {store} from '../server-store'

export const getTick = async () => {
  const {data} = await axios.get('https://api.kraken.com/0/public/Ticker?pair=' + Object.keys(store.pairs).join(','))
  return data.result
}
