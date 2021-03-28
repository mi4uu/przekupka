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
  const lowestUSD = markets.sort((a, b) => a.canBuy - b.canBuy).filter((b) => b.market === 'SDT')
  const lowestBTC = markets.sort((a, b) => a.canBuy - b.canBuy).filter((b) => b.market === 'BTC')
  const lowestBNB = markets.sort((a, b) => a.canBuy - b.canBuy).filter((b) => b.market === 'BNB')
  const onlyWithCanBuy = (l: typeof markets) =>
    l.filter((_l) => _l.canBuy >= 3).sort((a, b) => b.canBuy - a.canBuy || 0)

  return (
    <>
      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>candidates USD:</b> {onlyWithCanBuy(buyableUSD).length} / {buyableUSD.length}
        </div>
        {lowestUSD.length && (
          <div className={'stats'}>
            <b>canBuy:</b> {lowestUSD[0].canBuy} <b>(</b>
            {lowestUSD[0].name}
            <b>)</b> - {lowestUSD[lowestUSD.length - 1].canBuy} <b>(</b>
            {lowestUSD[lowestUSD.length - 1].name}
            <b>)</b>
          </div>
        )}
      </div>
      <BuyingList list={onlyWithCanBuy(buyableUSD)} vars={vars} ticks={ticks} />
      <div className='table-wrapper'>
        {lowestBTC.length > 0 && (
          <div className={'stats'}>
            <b>canBuy:</b> {lowestBTC[0].canBuy} <b>(</b>
            {lowestBTC[0].name}
            <b>)</b> - <span>{lowestBTC[lowestBTC.length - 1].canBuy}</span> <b>(</b>
            {lowestBTC[lowestBTC.length - 1].name}
            <b>)</b>
          </div>
        )}
      </div>
      <BuyingList list={onlyWithCanBuy(buyableBTC)} vars={vars} ticks={ticks} />

      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>candidates BNB:</b> {onlyWithCanBuy(buyableBNB).length} / {buyableBNB.length}
        </div>

        {lowestBNB.length && (
          <div className={'stats'}>
            <b>canBuy:</b> {lowestBNB[0].canBuy} <b>(</b>
            {lowestBNB[0].name}
            <b>)</b> - {lowestBNB[lowestBNB.length - 1].canBuy} <b>(</b>
            {lowestBNB[lowestBNB.length - 1].name}
            <b>)</b>
          </div>
        )}
      </div>
      <BuyingList list={onlyWithCanBuy(buyableBNB)} vars={vars} ticks={ticks} />
    </>
  )
}
