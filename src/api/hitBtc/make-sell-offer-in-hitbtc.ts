import moment from 'moment'
import {makePrivateCall} from './make-private-call'

export async function makeSellOfferInHitBtc(pair: string, price: string, volume: string) {
  const {status, data} = await makePrivateCall('/order', {
    symbol: pair,
    side: 'sell',
    price,
    quantity: volume,
    expireTime: moment().add(20, 'seconds').toISOString(),
    timeInForce: 'GTD',
    type: 'limit',
  })
  if (status !== 200) {
    console.log(JSON.stringify(data.error, null, 2))
    return false
  }

  return String(data.id)
}
