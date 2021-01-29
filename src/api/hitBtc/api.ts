import {makePrivateCall as hitBtcPrivateCall} from './make-private-call'
import {makeBuyOfferInHitBtc} from './make-buy-offer-in-hitbtc'
import {makeSellOfferInHitBtc} from './make-sell-offer-in-hitbtc'
import {getTick as getTickFromHitBtc} from './get-tick'
import {convertTick as convertTickFromHitBtc} from './convert-tick'
import {checkBalance as checkBalanceFromHitBtc} from './check-balance'
import {getClosedOrders as getClosedOrdersFromHitBtc} from './get-closed-orders'
import {pairsInitialHitBtc} from './pairs-initial'
import {markets, baseCoin} from './config'
import {Pair} from '#db/entity/pair'
import {bn} from '#utils/bn'
export const hitBtcApi = {
  makePrivateCall: hitBtcPrivateCall,
  makeBuyOffer: makeBuyOfferInHitBtc,
  makeSellOffer: makeSellOfferInHitBtc,
  getTick: getTickFromHitBtc,
  convertTick: convertTickFromHitBtc,
  checkBalance: checkBalanceFromHitBtc,
  getClosedOrders: getClosedOrdersFromHitBtc,
  isTransactionValid: (pair: Pair, volume: string, price: string) => {
    return bn(volume).isGreaterThan(pair.step)
  },
  initialValues: {
    pairs: pairsInitialHitBtc,
  },
  markets,
  baseCoin,
}
