import {binanceApi} from './binance/api'
import {provider} from './config'
import {hitBtcApi} from './hitBtc/api'
import {krakenApi} from './kraken/api'

const api = {
  hitBTC: hitBtcApi,
  kraken: krakenApi,
  binance: binanceApi,
}

export default api[provider]
