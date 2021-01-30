import React from 'react'
import { ToSell } from './to-sell'

export const ToSellList = ({ status, store }) => (
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
          <th>Selling</th>
        </tr>
      </thead>
      <tbody>
        {status.toSell.map((ts) => (
          <ToSell toSell={ts} vars={store.tradeVars[ts.pair]} key={`${ts.pair}_${ts.price}`} />
        ))}
      </tbody>
    </table>
  </div>
)
