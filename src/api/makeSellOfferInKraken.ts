
import { makePrivateCall } from './makePrivateCall'

export   function   makeSellOfferInKraken(pair:string, price:string, volume:string) {

  return   makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'sell',
    ordertype: 'limit',
    price,
    volume,
    // userref: userRef + '',
    expiretm: '+10'
  })
}
