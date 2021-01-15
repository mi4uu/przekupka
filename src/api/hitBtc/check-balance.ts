import {makePrivateGetCall} from './make-private-call'

type IHitBtcBalance = Array<{
  currency: string
  avilable: string
  reserved: string
}>

export const checkBalance = async () => {
  const responsePromise = makePrivateGetCall('/0/private/Balance', {})
  const {data}: {data: IHitBtcBalance} = await responsePromise
  return Object.fromEntries(data.map((value) => [value.currency, value.avilable]))
}
