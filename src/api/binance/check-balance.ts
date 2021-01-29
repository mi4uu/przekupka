import {store} from '../server-store'
import {makePrivateGetCall} from './make-private-call'

type IAccointInfo = {
  balances: Array<{
    asset: string
    free: string
    locked: string
  }>
}

export const checkBalance = async () => {
  const responsePromise = makePrivateGetCall('/account', {})
  const {data}: {data: IAccointInfo} = await responsePromise
  return Object.fromEntries(
    data.balances
      //     .filter((value) => coinsInUse.has(value.currency))
      .map((value) => [value.asset, value.free])
      .sort((a, b) => Number.parseFloat(a[1]) - Number.parseFloat(b[1])),
  )
}
