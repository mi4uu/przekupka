import {bn} from '../utils/bn'
import moment from 'moment'
import React from 'react'
import {ToSell} from './to-sell'
import BigNumber from 'bignumber.js'

export const ToSellList = ({status, store}) => {
  const last24hours = moment().subtract(24, 'hours').unix()
  const last48hours = moment().subtract(48, 'hours').unix()
  const lowLoss = -15
  const highLoss = -100
  const getStatsClass = (profit: BigNumber) =>
    [
      'stats',
      profit.isGreaterThanOrEqualTo(lowLoss) && 'greenBorder',
      profit.isLessThanOrEqualTo(highLoss) && 'redBorder',
    ]
      .filter(Boolean)
      .join(' ')

  const sellingProfit = status.toSell.map((ts) => ts.profitInUSD).reduce((a, b) => a.plus(b), bn('0'))
  const selling24Profit = status.toSell
    .filter((ts) => ts.buyUpdate > last24hours)
    .map((ts) => ts.profitInUSD)
    .reduce((a, b) => a.plus(b), bn('0'))

  const selling48Profit = status.toSell
    .filter((ts) => ts.buyUpdate > last48hours && ts.buyUpdate < last24hours)
    .map((ts) => ts.profitInUSD)
    .reduce((a, b) => a.plus(b), bn('0'))
  const sellingOlder = sellingProfit.minus(selling24Profit).minus(selling48Profit)

  return (
    <>
      <div className='table-wrapper'>
        <div className={getStatsClass(sellingProfit)}>
          <b>profit:</b> {sellingProfit.toFixed(2)}$
        </div>
        <div className={getStatsClass(selling24Profit)}>
          <b>last 24h:</b> {selling24Profit.toFixed(2)}$
        </div>
        <div className={getStatsClass(selling48Profit)}>
          <b>next 24h:</b> {selling48Profit.toFixed(2)}$
        </div>
        <div className={getStatsClass(sellingOlder)}>
          <b>older:</b> {sellingOlder.toFixed(2)}$
        </div>
      </div>
      <div className='table-wrapper'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Left</th>
              <th>Balance</th>
              <th>Price</th>
              <th>Current Price</th>
              <th>Highest Price</th>
              <th>Price diff</th>
              <th>Price % diff</th>
              <th>Current Highest Diff</th>

              <th>Price $ diff</th>
              <th>Profit</th>
              <th>Worth $</th>
              <th>Wait</th>
              <th>Soldable</th>
              <th>Selling</th>
              <th>Sell Update</th>
              <th>Buy Update</th>
            </tr>
          </thead>
          <tbody>
            {status.toSell.map((ts) => (
              <ToSell toSell={ts} vars={store.tradeVars[ts.pair]} key={ts.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
