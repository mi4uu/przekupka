import { makePrivateCall } from './makePrivateCall';

export const checkBalance = async () => {
  const responsePromise = makePrivateCall('/0/private/Balance', {})
  return (await responsePromise).data
};
