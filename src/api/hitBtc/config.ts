const dev = process.env.NODE_ENV !== 'production'
const devKey = 'Fuwt7xgswYby4nPVMgWqMI4w44uBCeMO'
const devSecret = 'pdpZ4rBTmTRnnsmKK4t46sle59mOHq2K'
const prodKey = 'ALWDR8Uap-llBRh6qD7sVMXpLKflt_iW' // API Key
const prodSecret = 'wXFIHZ9u0sXpVXzZaIcAWFkhIl6NPJ7O' // API Private Key
export const key = dev ? devKey : prodKey
export const secret = dev ? devSecret : prodSecret
export const baseUrl = 'https://api.hitbtc.com/api/2'
export const baseCoin = 'USD'
export const markets = new Set(['USD', 'BTC', 'ETH'])
