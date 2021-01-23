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
export const createTradeVars = (pair: string) => {
  return [
    pair,
    {
      highest: '0',
      lowest: '0',
      buy: false,
      sell: false,
      wait: 0,
      lastActionTime: moment().unix(),
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
  store.tradeVars = Object.fromEntries(pairs.map((pair) => createTradeVars(pair.name)))
}

export const store: IStore = createStore()
