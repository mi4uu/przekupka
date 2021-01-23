import {store} from '../server-store'
import {makePrivateGetCall} from './make-private-call'

type IHitBtcBalance = Array<{
  currency: string
  available: string
  reserved: string
}>

const coins: string[] = []
// Object.values(store.pairs).forEach((pair) => {
//   coins.push(pair.coin0)
//   coins.push(pair.coin1)
// })
const coinsInUse = new Set([...new Set(coins)])
export const checkBalance = async () => {
  const responsePromise = makePrivateGetCall('/trading/balance', {})
  const {data}: {data: IHitBtcBalance} = await responsePromise
  return Object.fromEntries(
    data
      //     .filter((value) => coinsInUse.has(value.currency))
      .map((value) => [value.currency, value.available])
      .sort((a, b) => Number.parseFloat(a[1]) - Number.parseFloat(b[1])),
  )
}
