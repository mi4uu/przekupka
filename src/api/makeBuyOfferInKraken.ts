import { makePrivateCall } from './makePrivateCall'

export function makeBuyOfferInKraken(pair:string, price:string, volume:string) {

  makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'buy',
    ordertype: 'limit',
    price,
    volume,
    //    userref: userRef + "",
    expiretm: '+40'
  }).then(result => {
    console.log(result.data)
  }).catch(err => {
    console.log(err)
  })
}
