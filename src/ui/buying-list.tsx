import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'

export const BuyingList = ({status, store}: {status: any; store: IStore}) => (
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
            <tr key={pair}>
              <td>{pair}</td>
              <td>{price}</td>
              <td>{vars.lastTransactionPrice}</td>
              <td>{vars.lowest}</td>
              <td>{calculatePercentage(price, vars.lastTransactionPrice).toFixed(2)} %</td>
              <td>{calculatePercentage(price, vars.lowest).toFixed(2)} %</td>
              <td>
                {vars.wait === 0 ? <div className='pill green'>--</div> : <div className='pill red'>{vars.wait}</div>}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)
