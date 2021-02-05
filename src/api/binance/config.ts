const dev = process.env.NODE_ENV !== 'production'
const devKey = 'Fuwt7xgswYby4nPVMgWqMI4w44uBCeMO'
const devSecret = 'pdpZ4rBTmTRnnsmKK4t46sle59mOHq2K'
const prodKey = 'uLLfAnK5N451KqbSjx2W9MQgtK0CkvnpowPRwPRYeyBK5mX686JTxJUfGxuDXrrW' // API Key
const prodSecret = '5Nj5mADcjRBSZ4Q9kIoJw7rHIMFaKzUjm4PXrpzt3Scdr4TCHZbWrXsy78bHjTtW' // API Private Key
export const key = prodKey
export const secret =   prodSecret
export const baseUrl = 'https://api.binance.com/api/v3'
export const baseCoin = 'USDT'
export const markets = new Set(['USDT', 'BTC', 'BNB'])
