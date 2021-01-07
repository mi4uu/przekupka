import BigNumber from 'bignumber.js'
export interface  ITradeVars {
    buy : boolean
    sell : boolean
    lastTrasnactionPrice?:BigNumber
    highest : BigNumber
    lowest :  BigNumber
    lastTransactions:  ('b' | 's')[]
   }
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
interface IStore {
    tradeVars:{[pair:string]:ITradeVars}
    assetPairs:{[pair:string]: {
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
      balance:{
        [coin:string]:string
    }
    pairs:{
        [pair:string]:{
            changeToTrend:BigNumber
            changeToChangeTrend:BigNumber
            persuadeToBalance:number
            volume:BigNumber
            active:boolean
        }
    }
    ticks:{
        timestamp: number;
        pairs:{
                [pair:string]: {
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
    }[]
    closedTransactions:closedTransactions[]
}
export const store:IStore = {

  tradeVars:{},
  assetPairs:{},
  balance:{},
  closedTransactions:[],
  ticks:[],
  pairs:{
    XXBTZUSD:{
      changeToTrend: new BigNumber('0.6'),
      changeToChangeTrend: new BigNumber('0.3'),
      persuadeToBalance: 0.1,
      volume: new BigNumber('0.001'),
      active: true
    },
    XETHZUSD:{
      changeToTrend: new BigNumber('0.6'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 0.1,
      volume: new BigNumber('0.05'),
      active: true
    },
    NANOUSD:{
      changeToTrend: new BigNumber('0.4'),
      changeToChangeTrend: new BigNumber('0.2'),
      persuadeToBalance: 0.2,
      volume: new BigNumber('10'),
      active: true
    },
    XXRPZUSD:{
      changeToTrend: new BigNumber('0.8'),
      changeToChangeTrend: new BigNumber('0.2'),
      persuadeToBalance: 0.4,
      volume: new BigNumber('30'),
      active: true
    }
  }
}