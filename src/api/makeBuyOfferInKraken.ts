import { makePrivateCall } from './makePrivateCall'

export function makeBuyOfferInKraken(pair: string, price: string, volume: string) {
  return makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'buy',
    ordertype: 'limit',
    price,
    volume,
    //    userref: userRef + "",
    expiretm: '+40',
  })
}
