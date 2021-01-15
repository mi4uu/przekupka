import fs from 'fs'

export interface IToSell {
  value: string
  id: string
  timestamp: number
  diff: string
}
export interface ITradeVars {
  buyHighlyNotProfitable?: boolean
  sellHighlyNotProfitable?: boolean
  highlyNotProfitable?: boolean
  processData?: {
    buy: boolean
    sell: boolean
  }
  buy: boolean
  sell: boolean
  lastTransactionPrice?: string
  highest: string
  lowest: string
  lastTransactions: Array<'b' | 's'>
  wait: number
  lastTransactionId: string
  noAssetsToSell?: boolean
  cantAffordToBuy?: boolean
  limitBuyPerHourReached?: boolean
}
export interface ISold {
  transactionSellId: string
  transactionBuyId: string
  diff: string
  profit: string
}
export interface IPair {
  changeToTrend: string
  changeToChangeTrend: string
  persuadeToBalance: number
  volume: string
  active: boolean
  coin0: string
  coin1: string
  profit: string
  buyPerHour: number
  coin0FriendlyName?: string
  coin1FriendlyName?: string
}
export interface closedTransactions {
  pair: string
  refid: string
  userref: number
  status: string
  opentm: number
  vol: string
  fee: string
  price: string
  type: string
}

export interface Descr {
  pair: string
  type: string
  ordertype: string
  price: string
  price2: string
  leverage: string
  order: string
  close: string
}
export interface IMessage {
  timestamp: number
  msg: string
}
export interface IAssetPair {
  altname: string
  wsname: string
  aclass_base: string
  base: string
  aclass_quote: string
  quote: string
  lot: string
  pair_decimals: number
  lot_decimals: number
  lot_multiplier: number
  fees: number[][]
  fees_maker: number[][]
  fee_volume_currency: string
  margin_call: number
  margin_stop: number
  ordermin: string
}
export type IAssetPairs = Record<string, IAssetPair>
export type ITradeVarsPaired = Record<string, ITradeVars>
export type IToSellPaired = Record<string, IToSell[]>
export type IBalances = Record<string, string>
export type IPairs = Record<string, IPair>
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

export type ISoldPaired = Record<string, ISold[]>
export type IClosedTransactionsGroupped = Record<string, closedTransactions>
export interface IStore {
  tradeVars: ITradeVarsPaired
  assetPairs: IAssetPairs
  balance: IBalances
  toSell: IToSellPaired
  pairs: IPairs
  ticks: ITick[]
  closedTransactions: IClosedTransactionsGroupped

  sold: ISoldPaired
  storeLoaded: boolean
}
export const createStore = (): IStore => ({
  sold: {},

  tradeVars: {},
  assetPairs: {},
  balance: {},
  closedTransactions: {},
  ticks: [],
  toSell: {},
  pairs: {
    ETHBTC: {
      changeToTrend: '1.5',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.004', // Min 0.001
      active: true,
      coin0: 'ETH',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'BTC',
    },
  },
  storeLoaded: false,
})

const loadStore = (): IStore | false => {
  let json
  try {
    // @ts-expect-error
    json = JSON.parse(fs.readFileSync('store.json'))
  } catch (error: unknown) {
    console.log('cant parse store.json')
    console.log(error)
    try {
      // @ts-expect-error
      json = JSON.parse(fs.readFileSync('store2.json'))
    } catch (error_: unknown) {
      console.log('cant parse store2.json')
      console.log(error_)
      return false
    }
  }

  const data = json

  data.storeLoaded = true
  return data
}

export const store: IStore = loadStore() || createStore()
