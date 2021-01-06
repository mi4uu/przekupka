import BigNumber from "bignumber.js";
import { makePrivateCall } from './makePrivateCall';
import { price, pairDecimals, calculatePercentage, lastTrasnactionPrice, userRef } from '../index';

export function makeSellOfferInKraken(pair:string, price:string, volume:string) {

  makePrivateCall('/0/private/AddOrder', {
    pair,
    type: 'sell',
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
