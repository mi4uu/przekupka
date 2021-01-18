import moment from 'moment'
import {makePrivateCall} from './make-private-call'

export async function makeBuyOfferInHitBtc(pair: string, price: string, volume: string) {
  try {
    const {status, data} = await makePrivateCall('/order', {
      symbol: pair,
      side: 'buy',
      price,
      quantity: volume,
      expireTime: moment().add(20, 'seconds').toISOString(),
      timeInForce: 'GTD',
      type: 'limit',
    })
  } catch (error) {
    console.log(Object.keys(error), error.message)
    console.log(
      JSON.stringify({
        symbol: pair,
        side: 'buy',
        price,
        quantity: volume,
        expireTime: moment().add(20, 'seconds').toISOString(),
        timeInForce: 'GTD',
        type: 'limit',
      }),
      null,
      2,
    )
    return false
  }

  return String(data.id)
}
