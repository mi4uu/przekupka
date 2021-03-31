import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'
import {bn} from '../utils/bn'
import {BuyingList} from './buying-list'

export const Buying = ({status, store}: {status: any; store: IStore}) => {
  const vars = store.tradeVars
  const ticks = store.ticks[store.ticks.length - 1].pairs
  const markets = Object.entries(vars)
    .map(([pair, v]) => ({
      name: pair,
      lastPrice: v.lastTransactionPrice,
      price: ticks[pair].a,
      market: pair.split('').splice(-3).join(''),
      canBuy: v.canBuy,
      buying: pair in status.buyingPairs,
      diff: calculatePercentage(ticks[pair].a, v.lastTransactionPrice).toNumber(),
    }))
    .sort((a, b) => a.diff - b.diff)
    .filter((m) => typeof m.canBuy === 'number')
  const buyable = markets

  const buyableBTC = buyable.filter((b) => b.market === 'BTC')
  const buyableUSD = buyable.filter((b) => b.market === 'SDT')
  const buyableBNB = buyable.filter((b) => b.market === 'BNB')

  const onlyWithCanBuy = (l: typeof markets) => l
  // L.filter((_l) => _l.canBuy >= 3).sort((a, b) => b.canBuy - a.canBuy || 0)

  return (
    <>
      <BuyingList list={onlyWithCanBuy(buyableUSD)} vars={vars} ticks={ticks} />

      <BuyingList list={onlyWithCanBuy(buyableBTC)} vars={vars} ticks={ticks} />

      <BuyingList list={onlyWithCanBuy(buyableBNB)} vars={vars} ticks={ticks} />
    </>
  )
}
