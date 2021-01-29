import axiosClient from '../axiosClient'

export const getTick = async () => {
  const {data} = await axiosClient.get('https://www.binance.com/api/v3/ticker/bookTicker')
  return data
}
