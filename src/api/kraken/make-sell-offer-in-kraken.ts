import {makePrivateCall} from './make-private-call'

export async function makeSellOfferInKraken(pair: string, price: string, volume: string) {
  const {data} = await makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'sell',
    ordertype: 'limit',
    price,
    volume,
    // Userref: userRef + '',
    expiretm: '+20',
  })
  if (data.error.length > 0) {
    return false
  }

  console.log(JSON.stringify(data.result, null, 2))
  return data.result.txid[0]
}
