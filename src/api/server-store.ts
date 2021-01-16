import fs from 'fs'
import {dev} from './config'

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
  lastActionTime: number
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
    BTCUSDC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.004', // Min 0.001
      active: true,
      coin0: 'BTC',
      coin1: 'USDC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'BTC',
      coin1FriendlyName: 'USDC',
    },
    ETHBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.0001', // Min 0.0001
      active: true,
      coin0: 'ETH',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'BTC',
    },
    DOGEBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'DOGE',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'DOGE',
      coin1FriendlyName: 'BTC',
    },
    BTMBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'BTM',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'BTM',
      coin1FriendlyName: 'BTC',
    },
    WAVESBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 1
      active: true,
      coin0: 'WAVES',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'WAVES',
      coin1FriendlyName: 'BTC',
    },
    VETBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'VET',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'VET',
      coin1FriendlyName: 'BTC',
    },
    ATOMBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 0.01
      active: true,
      coin0: 'ATOM',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ATOM',
      coin1FriendlyName: 'BTC',
    },
    IOTABTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'IOTA',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'IOTA',
      coin1FriendlyName: 'BTC',
    },
    ZRXBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'ZRX',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ZRX',
      coin1FriendlyName: 'BTC',
    },
    ICXBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'ICX',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ICX',
      coin1FriendlyName: 'BTC',
    },
    TRXBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'TRX',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'TRX',
      coin1FriendlyName: 'BTC',
    },
    QTUMBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 0.01
      active: true,
      coin0: 'QTUM',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'QTUM',
      coin1FriendlyName: 'BTC',
    },

    XTZBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'XTZ',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'XTZ',
      coin1FriendlyName: 'BTC',
    },
    BNTBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'BNT',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'BNT',
      coin1FriendlyName: 'BTC',
    },
    NEBLBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 0.01
      active: true,
      coin0: 'NEBL',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'NEBL',
      coin1FriendlyName: 'BTC',
    },
    ETHUSDC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.0001', // Min 0.01
      active: true,
      coin0: 'ETH',
      coin1: 'USDC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ETC',
      coin1FriendlyName: 'USDC',
    },
    BATBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'BAT',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'BAT',
      coin1FriendlyName: 'BTC',
    },
    RENBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'REN',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'REN',
      coin1FriendlyName: 'BTC',
    },

    ENJBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'ENJ',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ENJ',
      coin1FriendlyName: 'BTC',
    },
    RVNBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'RVN',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'RVN',
      coin1FriendlyName: 'BTC',
    },
    YCCBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'YCC',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'YCC',
      coin1FriendlyName: 'BTC',
    },

    TONBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'TON',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'TON',
      coin1FriendlyName: 'BTC',
    },
    HEXBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'HEX',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'HEX',
      coin1FriendlyName: 'BTC',
    },
    YCCBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'YCC',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'YCC',
      coin1FriendlyName: 'BTC',
    },
    AIMBTC: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'AIM',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'AIM',
      coin1FriendlyName: 'BTC',
    },
    // Few eth pairs ETH

    DOGEETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'DOGE',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'DOGE',
      coin1FriendlyName: 'BTC',
    },
    BTMETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'BTM',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'BTM',
      coin1FriendlyName: 'ETH',
    },
    WAVESETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 1
      active: true,
      coin0: 'WAVES',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'WAVES',
      coin1FriendlyName: 'ETH',
    },
    VETETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '10', // Min 10
      active: true,
      coin0: 'ETH',
      coin1: 'BTC',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'BTC',
    },
    ATOMETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 0.01
      active: true,
      coin0: 'ATOM',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ATOM',
      coin1FriendlyName: 'ETH',
    },
    IOTAETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'IOTA',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'IOTA',
      coin1FriendlyName: 'ETH',
    },
    ZRXETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'ZRX',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ZRX',
      coin1FriendlyName: 'ETH',
    },
    ICXETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.1', // Min 0.1
      active: true,
      coin0: 'ICX',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'ICX',
      coin1FriendlyName: 'ETH',
    },
    TRXETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '1', // Min 1
      active: true,
      coin0: 'TRX',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'TRX',
      coin1FriendlyName: 'ETH',
    },
    QTUMETH: {
      changeToTrend: '2',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.01', // Min 0.01
      active: true,
      coin0: 'QTUM',
      coin1: 'ETH',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'QTUM',
      coin1FriendlyName: 'ETH',
    },
  },
  storeLoaded: false,
})

const loadStore = (): IStore | false => {
  if (dev) return false
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

  const data = {
    ...json,
    pairs: {...createStore().pairs, ...json.pairs},
  }

  data.storeLoaded = true
  return data
}

export const store: IStore = loadStore() || createStore()
