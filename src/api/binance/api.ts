import {makePrivateCall as hitBtcPrivateCall} from './make-private-call'
import {makeOffer} from './make-offer'
import {getTick} from './get-tick'
import {convertTick} from './convert-tick'
import {checkBalance} from './check-balance'
import {getClosedOrders} from './get-closed-orders'
import {Pair} from '#db/entity/pair'
import {bn} from '#utils/bn'
import * as config from './config'
const {markets, baseCoin} = config
export const binanceApi = {
  config,
  makePrivateCall: hitBtcPrivateCall,
  makeBuyOffer: async (pair: string, price: string, volume: string, strategy?: string) =>
    makeOffer(pair, price, volume, 'BUY', strategy),
  makeSellOffer: async (pair: string, price: string, volume: string) => makeOffer(pair, price, volume, 'SELL'),
  getTick,
  convertTick,
  checkBalance,
  getClosedOrders,
  markets,
  baseCoin,
  isTransactionValid: (pair: Pair, volume: string, price: string) => {
    const validVolume = bn(volume).toFixed(Number.parseInt(pair.step, 10))

    return bn(validVolume).multipliedBy(price).isGreaterThan(pair.param0)
  },
}
