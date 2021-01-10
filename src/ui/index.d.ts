import { ITradeVars } from '../api/serverStore'

interface IAssetPairs {
    [pair:string]: {
    altname: string;
    wsname: string;
    aclass_base: string;
    base: string;
    aclass_quote: string;
    quote: string;
    lot: string;
    pair_decimals: number;
    lot_decimals: number;
    lot_multiplier: number;
    leverage_buy: any[];
    leverage_sell: any[];
    fees: number[][];
    fees_maker: number[][];
    fee_volume_currency: string;
    margin_call: number;
    margin_stop: number;
    ordermin: string;
  }}
interface closedTransactions {
    refid?: any;
    userref: number;
    status: string;
    reason?: any;
    opentm: number;
    closetm: number;
    starttm: number;
    expiretm: number;
    descr: Descr;
    vol: string;
    vol_exec: string;
    cost: string;
    fee: string;
    price: string;
    stopprice: string;
    limitprice: string;
    misc: string;
    oflags: string;
  }
  
  interface Descr {
    pair: string;
    type: string;
    ordertype: string;
    price: string;
    price2: string;
    leverage: string;
    order: string;
    close: string;
  }
interface IPairs {
  [pair: string]: {
    changeToTrend: string
    changeToChangeTrend: string
    persuadeToBalance: number
    volume: string
    active: boolean
    coin0: string
    coin1: string
    profit: string
    coin0FriendlyName: string
    coin1FriendlyName: string
  }
}
interface ITick {
    pairs:{
    [pair:string]:{
        a: string[]
        b: string[]
        c: string[]
        v: string[]
        p: string[]
        t: number[]
        l: string[]
        h: string[]
        o: string
      }
    }
      timestamp: number

}
interface IState {
  toSell: {
    [pair: string]: {
      value: string
      id: string
      timestamp: number
    }[]
  }
  tradeVars: {
    [pair: string]: ITradeVars
  }
  balance: {
    [key: string]: string
  }
  pairs: IPairs
  ticks: ITick[]
  closedTransactions:   {
    [id:   string]:   closedTransactions
  
  
  }
  assetPairs: IAssetPairs
}
type IAction = 
| {
    type:'SET_BALANCE'
    payload: {
        [key:string]:string
    }
}
| {
    type:'ADD_TICK'
    payload:ITick
}
| {
    type:'SET_TICKS'
    payload:ITick[]
}
| {
    type:'SET_PAIRS'
    payload:IPairs
}
| {
    type:'SET_TRANSACTIONS'
    payload:closedTransactions[]
}
| {
    type:'SET_ASSETPAIRS'
    payload:IAssetPairs
}