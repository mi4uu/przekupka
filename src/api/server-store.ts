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
  refid: string
  userref: number
  status: string
  reason?: unknown
  opentm: number
  closetm: number
  starttm: number
  expiretm: number
  descr: Descr
  vol: string
  vol_exec: string
  cost: string
  fee: string
  price: string
  stopprice: string
  limitprice: string
  misc: string
  oflags: string
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
  tradeBalance?: {
    eb: string // = equivalent balance (combined balance of all currencies)
    tb: string // = trade balance (combined balance of all equity currencies)
    m: string // = margin amount of open positions
    n: string // = unrealized net profit/loss of open positions
    c: string // = cost basis of open positions
    v: string // = current floating valuation of open positions
    e: string // = equity = trade balance + unrealized net profit/loss
    mf: string // = free margin = equity - initial margin (maximum margin available to open new positions)
    ml: string // = margin level = (equity / initial margin) * 100
  }
  sold: ISoldPaired
  storeLoaded: boolean
}
export const createStore = (): IStore => ({
  sold: {},
  tradeBalance: {
    eb: '',
    tb: '',
    m: '',
    n: '',
    c: '',
    v: '',
    e: '',
    mf: '',
    ml: '',
  },
  tradeVars: {},
  assetPairs: {},
  balance: {},
  closedTransactions: {},
  ticks: [],
  toSell: {},
  pairs: {
    XXBTZUSD: {
      changeToTrend: '1',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '0.004', // Min 0.001
      active: true,
      coin0: 'XXBT',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1, // Limit if allready not sold buys are present
      coin0FriendlyName: 'BTC',
      coin1FriendlyName: 'USD',
    },
    XETHZUSD: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1.8,
      volume: '0.08', // Min 0.02
      active: true,
      coin0: 'XETH',
      coin1: 'ZUSD',
      profit: '',
      buyPerHour: 1,
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'USD',
    },
    NANOUSD: {
      changeToTrend: '1',
      changeToChangeTrend: '1',
      persuadeToBalance: 1.2,
      volume: '40', // Min 10
      active: true,
      coin0: 'NANO',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'NANO',
      coin1FriendlyName: 'USD',
    },
    XXRPZUSD: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 2,
      volume: '120', // Min 30
      active: true,
      coin0: 'XXRP',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'XRP',
      coin1FriendlyName: 'USD',
    },
    XXMRZUSD: {
      changeToTrend: '1',
      changeToChangeTrend: '1',
      persuadeToBalance: 1,
      volume: '0.6', // Min 0.1
      active: true,
      coin0: 'XXMR',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'XMR',
      coin1FriendlyName: 'USD',
    },
    UNIUSD: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 2,
      volume: '1', // Min 0.25
      active: true,
      coin0: 'UNI',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'UNI',
      coin1FriendlyName: 'USD',
    },
    XXLMZUSD: {
      changeToTrend: '1',
      changeToChangeTrend: '1',
      persuadeToBalance: 2,
      volume: '120', // Min 30
      active: true,
      coin0: 'XXLM',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'XLM', // Stellar
      coin1FriendlyName: 'USD',
    },
    XLTCZUSD: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '1', // Min 0.25
      active: true,
      coin0: 'XLTC',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'LTC',
      coin1FriendlyName: 'USD',
    },
    ALGOUSD: {
      changeToTrend: '1',
      changeToChangeTrend: '0.8',
      persuadeToBalance: 1,
      volume: '200', // Min 50
      active: true,
      coin0: 'ALGO',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'ALGO',
      coin1FriendlyName: 'USD',
    },
    XETHXXBT: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '0.08', // Min 0.02
      active: true,
      coin0: 'XETH',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'BTC',
    },

    XZECZUSD: {
      changeToTrend: '1',
      changeToChangeTrend: '0.8',
      persuadeToBalance: 1,
      volume: '0.12', // Min 0.03
      active: true,
      coin0: 'XZEC',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'ZEC',
      coin1FriendlyName: 'USD',
    },
    XXRPXXBT: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '120', // Min 30
      active: true,
      coin0: 'XXRP',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'XRP',
      coin1FriendlyName: 'BTC',
    },
    XLTCXXBT: {
      changeToTrend: '1',
      changeToChangeTrend: '0.8',
      persuadeToBalance: 1,
      volume: '0.4', // Min 0.1
      active: true,
      coin0: 'XLTC',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'LTC',
      coin1FriendlyName: 'BTC',
    },
    ALGOXBT: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '200', // Min 50
      active: true,
      coin0: 'ALGO',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'ALGO',
      coin1FriendlyName: 'BTC',
    },
    NANOXBT: {
      changeToTrend: '1',
      changeToChangeTrend: '0.8',
      persuadeToBalance: 1,
      volume: '10', // Min 10
      active: true,
      coin0: 'NANO',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'NANO',
      coin1FriendlyName: 'BTC',
    },
    XZECXXBT: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '0.08', // Min 0.02
      active: true,
      coin0: 'XZEC',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'ZEC',
      coin1FriendlyName: 'BTC',
    },
    BCHXBT: {
      changeToTrend: '1',
      changeToChangeTrend: '0.8',
      persuadeToBalance: 1,
      volume: '0.1', // Min0.025
      active: true,
      coin0: 'BCH',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'BCH',
      coin1FriendlyName: 'BTC',
    },
    BCHUSD: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '0.1', // Min0.025
      active: true,
      coin0: 'BCH',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'BCH',
      coin1FriendlyName: 'USD',
    },

    UNIXBT: {
      changeToTrend: '1',
      changeToChangeTrend: '1',
      persuadeToBalance: 1,
      volume: '0.1', // Min0.025
      active: true,
      coin0: 'UNI',
      coin1: 'XXBT',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'UNI',
      coin1FriendlyName: 'BTC',
    },
    XXMRXXBT: {
      changeToTrend: '0.8',
      changeToChangeTrend: '0.5',
      persuadeToBalance: 1,
      volume: '0.4', // Min0.01
      active: true,
      coin0: 'XXMR',
      coin1: 'ZUSD',
      profit: '0',
      buyPerHour: 1,
      coin0FriendlyName: 'XMR',
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
