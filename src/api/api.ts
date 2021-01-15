import {makePrivateCall as krakenPrivateCall} from './kraken/make-private-call'
import {makeBuyOfferInKraken} from './kraken/make-buy-offer-in-kraken'
import {makeSellOfferInKraken} from './kraken/make-sell-offer-in-kraken'

import {makePrivateCall as hitBtcPrivateCall} from './hitBtc/make-private-call'
import {makeBuyOfferInHitBtc} from './hitBtc/make-buy-offer-in-hitbtc'
import {makeSellOfferInHitBtc} from './hitBtc/make-sell-offer-in-hitbtc'
import {provider} from './config'
import {getTick as getTickFromKraken} from './kraken/get-tick'
import {convertTick as convertTickFromKraken} from './kraken/convert-tick'
import {getTick as getTickFromHitBtc} from './hitBtc/get-tick'
import {convertTick as convertTickFromHitBtc} from './hitBtc/convert-tick'
import {checkBalance as checkBalanceFromKraken} from './kraken/check-balance'
import {checkBalance as checkBalanceFromHitBtc} from './hitBtc/check-balance'
import {getClosedOrders as getClosedOrdersFromHitBtc} from './hitBtc/get-closed-orders'
import {getClosedOrders as getClosedOrdersFromKraken} from './kraken/get-closed-orders'

const api = {
  hitBTC: {
    makePrivateCall: hitBtcPrivateCall,
    makeBuyOffer: makeBuyOfferInHitBtc,
    makeSellOffer: makeSellOfferInHitBtc,
    getTick: getTickFromHitBtc,
    convertTick: convertTickFromHitBtc,
    checkBalance: checkBalanceFromHitBtc,
    getClosedOrders: getClosedOrdersFromHitBtc,
  },
  kraken: {
    makePrivateCall: krakenPrivateCall,
    makeSellOffer: makeSellOfferInKraken,
    makeBuyOffer: makeBuyOfferInKraken,
    getTick: getTickFromKraken,
    convertTick: convertTickFromKraken,
    checkBalance: checkBalanceFromKraken,
    getClosedOrders: getClosedOrdersFromKraken,
  },
}

export default api[provider]
