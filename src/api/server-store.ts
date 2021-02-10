import {Pair} from '#db/entity/pair'
import moment from 'moment'

export interface ITradeVars {
  buy: boolean
  sell: boolean
  highest: string
  lowest: string
  wait: number
  noAssetsToSell?: boolean
  cantAffordToBuy?: boolean
  limitBuyPerHourReached?: boolean
  lastActionTime: number
  lastTransactionPrice?: string
  lastIndicatorTime: number
  canBuy?: number
}

export type ITradeVarsPaired = Record<string, ITradeVars>
export type IBalances = Record<string, string>
export interface ITick {
  timestamp: number
  pairs: Record<
    string,
    {
      a: string
      b: string
      c: string
    }
  >
}

export interface IStore {
  tradeVars: ITradeVarsPaired

  balance: IBalances

  ticks: ITick[]
}
export const createTradeVars = (pair: string, i = 0) => {
  return [
    pair,
    {
      highest: '0',
      lowest: '0',
      buy: false,
      sell: false,
      wait: 10,
      lastActionTime: moment().subtract(1, 'year').add(i, 'seconds').unix(),
      lastIndicatorTime: moment().subtract(1, 'year').add(i, 'seconds').unix(),
    },
  ]
}

export const createStore = (): IStore => {
  const store = {
    tradeVars: {},
    balance: {},
    ticks: [],
  }
  return store
}

export const fillTradeVars = async (store: IStore) => {
  const pairs = await Pair.find({active: true})
  store.tradeVars = Object.fromEntries(pairs.map((pair, i) => createTradeVars(pair.name, i)))
}

export const store: IStore = createStore()
