import {makePrivateCall} from './make-private-call'

export async function makeBuyOfferInKraken(pair: string, price: string, volume: string) {
  const {data} = await makePrivateCall('/order', {
    pair,
    type: 'buy',
    ordertype: 'limit',
    price,
    volume,
    //    Userref: userRef + "",
    expiretm: '+40',
  })

  if (data.error.length > 0) {
    return false
  }

  console.log(JSON.stringify(data.result, null, 2))
  return data.result.txid[0]
}
