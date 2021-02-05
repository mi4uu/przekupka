import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'
import {bn} from '../utils/bn'

export const BuyingList = ({status, store}: {status: any; store: IStore}) => {
  const vars = store.tradeVars
  const ticks = store.ticks[store.ticks.length - 1].pairs
  const markets = Object.entries(vars)
    .map(([pair, v]) => ({
      name: pair,
      lastPrice: v.lastTransactionPrice,
      price: ticks[pair].a,
      market: pair.split('').splice(-3).join(''),
      diff: calculatePercentage(ticks[pair].a, v.lastTransactionPrice),
    }))
    .sort((a, b) => a.diff.minus(b.diff).toNumber())
  const buyable = markets.filter((p) => p.diff.isLessThan('0'))

  const buyableBTC = buyable.filter((b) => b.market === 'BTC')
  const buyableUSD = buyable.filter((b) => b.market === 'SDT')
  const buyableBNB = buyable.filter((b) => b.market === 'BNB')

  const lowestUSD = markets.find((b) => b.market === 'SDT')?.diff.toFixed(2)
  const lowestBTC = markets.find((b) => b.market === 'BTC')?.diff.toFixed(2)
  const lowestBNB = markets.find((b) => b.market === 'BNB')?.diff.toFixed(2)

  window.a = markets
  return (
    <>
      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>candidates:</b> {buyable.length}
        </div>
        <div className={'stats'}>
          <b>candidates USD:</b> {buyableUSD.length}
        </div>
        <div className={'stats'}>
          <b>candidates BTC:</b> {buyableBTC.length}
        </div>
        <div className={'stats'}>
          <b>candidates BNB:</b> {buyableBNB.length}
        </div>
      </div>
      <div className='table-wrapper'>
        <div className={'stats'}>
          <b>lowest USD:</b> {lowestUSD}
        </div>
        <div className={'stats'}>
          <b>lowest BTC:</b> {lowestBTC}
        </div>
        <div className={'stats'}>
          <b>lowest BNB:</b> {lowestBNB}
        </div>
      </div>
      <div className='table-wrapper'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Price</th>
              <th>Last Price</th>
              <th>Lowest Price</th>
              <th>Current to Last diff</th>
              <th>Current to Lowest Diff</th>
              <th>Wait</th>
            </tr>
          </thead>
          <tbody>
            {status.buyingPairs.map((pair: string) => {
              const vars = store.tradeVars[pair]
              const tick = store.ticks[store.ticks.length - 1]

              const price = tick.pairs[pair].a

              return (
                <tr key={pair} className={vars.wait > 0 ? 'important' : ''}>
                  <td>{pair}</td>
                  <td>{price}</td>
                  <td>{vars.lastTransactionPrice}</td>
                  <td>{vars.lowest}</td>
                  <td>{calculatePercentage(price, vars.lastTransactionPrice).toFixed(2)} %</td>
                  <td>{calculatePercentage(price, vars.lowest).toFixed(2)} %</td>
                  <td>{vars.wait > 0 && <div className='pill red'>{vars.wait}</div>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
