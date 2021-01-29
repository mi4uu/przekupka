import {makePrivateCall as hitBtcPrivateCall} from './make-private-call'
import {makeOffer} from './make-offer'
import {getTick} from './get-tick'
import {convertTick} from './convert-tick'
import {checkBalance} from './check-balance'
import {getClosedOrders} from './get-closed-orders'
import {markets, baseCoin} from './config'
import {Pair} from '#db/entity/pair'
import {bn} from '#utils/bn'

export const binanceApi = {
  makePrivateCall: hitBtcPrivateCall,
  makeBuyOffer: async (pair: string, price: string, volume: string) => makeOffer(pair, price, volume, 'BUY'),
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
