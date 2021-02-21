import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'
import {bn} from '../utils/bn'

export const BuyingList = ({list, vars, ticks}: {list: any; vars: any; ticks: any}) => {
  return (
    <div className='table-wrapper'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Buying</th>
            <th>Pair</th>
            <th>Price</th>
            <th>Last Price</th>
            <th>Price diff</th>
            <th>to Lowest Diff</th>
            <th>Can buy?</th>
            <th>Wait</th>
          </tr>
        </thead>
        <tbody>
          {list.map((pair) => {
            const v = vars[pair.name]
            const price = ticks[pair.name].a

            return (
              <tr key={pair.name} className={v.wait > 0 ? 'important' : ''}>
                <td>
                  {v.buy && <div className='pill green'>YES</div>}
                  {!v.buy && <div className='pill red '>NO</div>}
                </td>

                <td>{pair.name}</td>
                <td>{price}</td>
                <td>{v.lastTransactionPrice}</td>
                <td>{bn(pair.diff).toFixed(1)} %</td>
                <td>{calculatePercentage(price, v.lowest).toFixed(2)} %</td>

                <td>
                  {v.canBuy <= 5 && <div className='pill '>{v.canBuy}</div>}
                  {v.canBuy > 5 && <div className='pill  '>{v.canBuy}</div>}
                </td>
                <td>{v.wait > 0 && <div className='pill red'>{v.wait}</div>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
