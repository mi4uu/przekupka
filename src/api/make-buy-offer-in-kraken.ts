import {makePrivateCall} from './make-private-call'

export async function makeBuyOfferInKraken(pair: string, price: string, volume: string) {
  return makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'buy',
    ordertype: 'limit',
    price,
    volume,
    //    Userref: userRef + "",
    expiretm: '+40',
  })
}
