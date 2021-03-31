import {prodKey, prodSecret} from './credentials'
const dev = process.env.NODE_ENV !== 'production'
export const key = prodKey
export const secret = prodSecret
export const baseUrl = 'https://api.binance.com/api/v3'
export const baseCoin = 'USDT'
export const markets = new Set(['USDT', 'BTC', 'BNB'])
export const activePairs = new Set([
  'AUDIOUSDT',
  'ONTUSDT',
  'CELRUSDT',
  'SCUSDT',
  'BTCUSDT',
  'COSBTC',
  'POLYBTC',
  'BNBBTC',
  'FUNBTC',
  'CKBBTC',
  'CNDBTC',
  'PHBBTC',
  'TROYBTC',
  'CDTBTC',

  'ENJBNB',
])
export const desiredPrice = '100' // How many $ per transaction ( min 20, recomended min 40 )
export const desiredPriceBTC = '50' // How many $ per transaction ( min 20, recomended min 40 )
export const desiredPriceBNB = '20' // How many $ per transaction ( min 20, recomended min 40 )
export const minPriceDrop = 2
export const takeTrailingProfitFrom = 1
export const trailing = 0.2
export const marketVelocityDivider = 6
export const targetTakeProfitFromVelocityDivider = 17
export const dontBuybelow = {
  USDT: Number.parseInt(desiredPrice, 10) * 5,
  BTC: Number.parseInt(desiredPriceBTC, 10) * 5,
  BNB: Number.parseInt(desiredPriceBNB, 10) * 5,
}
export const safeBuyTresholds = [6, 6, 12, 20]
export const safeBuyMultipliers = [1, 1, 1, 2]
export const greed = 0.3
