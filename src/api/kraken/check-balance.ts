import {makePrivateCall} from './make-private-call'

export const checkBalance = async () => {
  const responsePromise = makePrivateCall('/0/private/Balance', {})
  return (await responsePromise).data.result
}
