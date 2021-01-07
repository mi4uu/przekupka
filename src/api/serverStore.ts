import BigNumber from 'bignumber.js'
export interface  ITradeVars {
    buy : boolean
    sell : boolean
    lastTrasnactionPrice?:BigNumber
    highest : BigNumber
    lowest :  BigNumber
    lastTransactions:  ('b' | 's')[]
    wait:number
    lastTransactionId:string
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
            active:boolean,
            coin0:string,
            coin1:string
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
    closedTransactions:{
      [key:string]:closedTransactions
    }
  tradeBalance:{
    eb:string // = equivalent balance (combined balance of all currencies)
    tb:string // = trade balance (combined balance of all equity currencies)
    m:string // = margin amount of open positions
    n:string // = unrealized net profit/loss of open positions
    c:string // = cost basis of open positions
    v:string // = current floating valuation of open positions
    e:string // = equity = trade balance + unrealized net profit/loss
    mf:string // = free margin = equity - initial margin (maximum margin available to open new positions)
    ml:string // = margin level = (equity / initial margin) * 100
  }
}
export const store:IStore = {
  tradeBalance:{
    eb:'',
    tb:'',
    m:'',
    n:'',
    c:'',
    v:'',
    e:'',
    mf:'',
    ml:'',
  },
  tradeVars:{},
  assetPairs:{},
  balance:{},
  closedTransactions:{},
  ticks:[],
  pairs:{
    XXBTZUSD:{
      changeToTrend: new BigNumber('1.6'),
      changeToChangeTrend: new BigNumber('0.4'),
      persuadeToBalance: 0.8,
      volume: new BigNumber('0.002'),    // min 0.001
      active: true,
      coin0: 'XXBT',
      coin1:'ZUSD'
    },
    XETHZUSD:{
      changeToTrend: new BigNumber('1.2'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 0.8,
      volume: new BigNumber('0.05'), // min 0.02
      active: true,
      coin0: 'XETH',
      coin1:'ZUSD'
    },
    NANOUSD:{
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 2,
      volume: new BigNumber('30'), // min 10
      active: true,
      coin0: 'NANO',
      coin1:'ZUSD'
    },
    XXRPZUSD:{
      changeToTrend: new BigNumber('1.3'),
      changeToChangeTrend: new BigNumber('0.4'),
      persuadeToBalance: 2,
      volume: new BigNumber('60'), // min 30
      active: true,
      coin0: 'XXRP',
      coin1:'ZUSD'
    },
    XXMRZUSD:{
      changeToTrend: new BigNumber('1.7'),
      changeToChangeTrend: new BigNumber('0.3'),
      persuadeToBalance: 2,
      volume: new BigNumber('0.6'), // min 0.1
      active: true,
      coin0: 'XXMR',
      coin1:'ZUSD'
    },
    DASHUSD:{
      changeToTrend: new BigNumber('1.7'),
      changeToChangeTrend: new BigNumber('0.3'),
      persuadeToBalance: 2,
      volume: new BigNumber('0.06'), //min 0.03
      active: true,
      coin0: 'DASH',
      coin1:'ZUSD'
    },
    ALGOUSD:{
      changeToTrend: new BigNumber('1.7'),
      changeToChangeTrend: new BigNumber('0.3'),
      persuadeToBalance: 2,
      volume: new BigNumber('100'), // min 50
      active: true,
      coin0: 'ALGO',
      coin1:'ZUSD'
    }
  }
}