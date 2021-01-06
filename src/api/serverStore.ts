import BigNumber from "bignumber.js";
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
    // {"XETHZUSD":{"a":["1084.25000","30","30.000"],"b":["1083.49000","6","6.000"],"c":["1083.93000","2.00000000"],"v":["8506.97431786","255717.51776701"],"p":["1085.79834","1060.09509"],"t":[2783,73108],"l":["1064.26000","975.00000"],"h":["1113.32000","1134.00000"],"o":"1103.48000"}}
}
export const store:IStore = {
    assetPairs:{},
    balance:{},
    closedTransactions:[],
    ticks:[],
    pairs:{
        XXBTZUSD:{
            changeToTrend: new BigNumber('0.6'),
            changeToChangeTrend: new BigNumber('0.2'),
            persuadeToBalance: 0.2,
            volume: new BigNumber('0.001'),
            active: false
        },
        XETHZUSD:{
            changeToTrend: new BigNumber('0.6'),
            changeToChangeTrend: new BigNumber('0.2'),
            persuadeToBalance: 0.2,
            volume: new BigNumber('0.001'),
            active: false
        },
        NANOUSD:{
            changeToTrend: new BigNumber('0.6'),
            changeToChangeTrend: new BigNumber('0.2'),
            persuadeToBalance: 0.2,
            volume: new BigNumber('0.01'),
            active: false
        }
    }
}