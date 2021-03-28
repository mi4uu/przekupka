import {Pair} from '#db/entity/pair'
import moment from 'moment'

export interface ITradeVars {
  buyBelowPrice: string
  mustDropBy: string
  buyAtDropBy: number
  profit: number
  takeProfit: any
  stats: {
    belowBB0: boolean
    belowBB1: boolean
    rsi: number
    macd: number | undefined
    isDroppingAfterBigRise: boolean
    allowBuying: boolean
    iHaveOneToSell: number
    shortPeriodMinDiff: number
    longPeriodMinDiff: number
    belowLastSma: boolean
  }
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
      wait: 0,
      lastActionTime: moment()
        .subtract(2, 'hours')
        .add(i * 2 - 10, 'seconds')
        .unix(),
      lastIndicatorTime: moment()
        .subtract(15, 'minutes')
        .add(i * 2, 'seconds')
        .unix(),
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
