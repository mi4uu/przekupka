import axiosClient from '../axiosClient'
import {store} from '../server-store'

export const getTick = async () => {
  const {data} = await axiosClient.get('https://api.hitbtc.com/api/2/public/ticker')
  return data
}
