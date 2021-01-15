import axios from 'axios'
import {store} from '../server-store'

export const getTick = async () => {
  const {data} = await axios.get(
    'https://api.hitbtc.com/api/2/public/ticker?symbols=' + Object.keys(store.pairs).join(','),
  )
  return data
}
