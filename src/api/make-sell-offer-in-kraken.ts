import {makePrivateCall} from './make-private-call'

export async function makeSellOfferInKraken(pair: string, price: string, volume: string) {
  return makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'sell',
    ordertype: 'limit',
    price,
    volume,
    // Userref: userRef + '',
    expiretm: '+10',
  })
}
