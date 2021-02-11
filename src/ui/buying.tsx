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
  const buyable = markets.filter((p) => p.diff < 0)

  const buyableBTC = buyable.filter((b) => b.market === 'BTC')
  const buyableUSD = buyable.filter((b) => b.market === 'SDT')
  const buyableBNB = buyable.filter((b) => b.market === 'BNB')
  const lowestUSD = markets.find((b) => b.market === 'SDT')
  const lowestBTC = markets.find((b) => b.market === 'BTC')
  const lowestBNB = markets.find((b) => b.market === 'BNB')
  const onlyWithCanBuy = (l) => l.filter((_l) => _l.canBuy > 4)

  return (
    <>
      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>candidates USD:</b> {onlyWithCanBuy(buyableUSD).length} / {buyableUSD.length}
        </div>
        <div className={'stats'}>
          <b>lowest USD:</b> {lowestUSD?.diff.toFixed(2)}% <b>(</b>
          {lowestUSD?.name}
          <b>)</b>
        </div>
      </div>
      <BuyingList list={onlyWithCanBuy(buyableUSD)} vars={vars} ticks={ticks} />
      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>candidates BTC:</b> {onlyWithCanBuy(buyableBTC).length} / {buyableBTC.length}
        </div>{' '}
        <div className={'stats'}>
          <b>lowest BTC:</b> {lowestBTC?.diff.toFixed(2)}% <b>(</b>
          {lowestBTC?.name}
          <b>)</b>
        </div>
      </div>
      <BuyingList list={onlyWithCanBuy(buyableBTC)} vars={vars} ticks={ticks} />

      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>candidates BNB:</b> {onlyWithCanBuy(buyableBNB).length} / {buyableBNB.length}
        </div>

        <div className={'stats'}>
          <b>lowest BNB:</b> {lowestBNB?.diff.toFixed(2)}% <b>(</b>
          {lowestBNB?.name}
          <b>)</b>
        </div>
      </div>
      <BuyingList list={onlyWithCanBuy(buyableBNB)} vars={vars} ticks={ticks} />
    </>
  )
}
