import {makePrivateCall as krakenPrivateCall} from './make-private-call'
import {makeBuyOfferInKraken} from './make-buy-offer-in-kraken'
import {makeSellOfferInKraken} from './make-sell-offer-in-kraken'

import {getTick as getTickFromKraken} from './get-tick'
import {convertTick as convertTickFromKraken} from './convert-tick'
import {checkBalance as checkBalanceFromKraken} from './check-balance'
import {getClosedOrders as getClosedOrdersFromKraken} from './get-closed-orders'

export const krakenApi = {
  makePrivateCall: krakenPrivateCall,
  makeSellOffer: makeSellOfferInKraken,
  makeBuyOffer: makeBuyOfferInKraken,
  getTick: getTickFromKraken,
  convertTick: convertTickFromKraken,
  checkBalance: checkBalanceFromKraken,
  getClosedOrders: getClosedOrdersFromKraken,
  initialValues: {
    pairs: [],
  },
}
