import BigNumber from 'bignumber.js'
import { makePrivateCall } from './makePrivateCall'

export function makeSellOfferInKraken(pair:string, price:string, volume:string) {

  makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'sell',
    ordertype: 'limit',
    price,
    volume,
    // userref: userRef + '',
    expiretm: '+40'
  }).then(result => {
    console.log(result.data)
  }).catch(err => {
    console.log(err)
  })
}
