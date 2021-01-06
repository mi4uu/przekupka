import { makePrivateCall } from './makePrivateCall';
import { pairDecimals, minSize, howMuchToTrade, userRef } from '../index';
import BigNumber from 'bignumber.js';

export function makeBuyOfferInKraken(pair:string, price:string, volume:string) {

  makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'buy',
    ordertype: 'limit',
    price,
    volume,
    userref: userRef + "",
    expiretm: '+20'
  }).then(result => {
    console.log(result.data);
  }).catch(err => {
    console.log(err);
  });
}
