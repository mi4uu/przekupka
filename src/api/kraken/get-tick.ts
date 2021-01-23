import axios from 'axios'
import {store} from '../server-store'

export const getTick = async () => {
  const {data} = await axios.get('https://api.kraken.com/0/public/Ticker')
  return data.result
}
