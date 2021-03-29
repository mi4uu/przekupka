import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'
import {bn} from '../utils/bn'
const YesNo = ({condition, green, red}) => (
  <td>
    {condition ? (
      <div className={green ? 'pill green' : 'pill'}>YES</div>
    ) : (
      <div className={red ? 'pill red' : 'pill'}>NO</div>
    )}
  </td>
)
export const BuyingList = ({list, vars, ticks}: {list: any; vars: any; ticks: any}) => {
  return (
    <div className='table-wrapper'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Buying</th>
            <th>Pair</th>
            <th>
              <b>Price</b>/Target
            </th>
            <th>last transaction diff</th>
            <th>target diff</th>

            <th>can buy</th>
            <th>cant afford</th>
            <th>time limit reached</th>
          </tr>
        </thead>
        <tbody>
          {list.map((pair) => {
            const price = ticks[pair.name].a

            const v = vars[pair.name]
            if (!v || !price) {
              console.log('wrong', pair.name)
              return null
            }

            return (
              <tr key={pair.name}>
                <YesNo condition={v.buy} green={true} red={false} />
                <td>{pair.name}</td>
                <td>
                  <b>{price}</b>
                  <br />
                  {v.buyBelowPrice}
                </td>
                <td>{calculatePercentage(price, v.lastTransactionPrice).toFixed(2)} %</td>
                <td>-{v.buyAtDropBy.toFixed(1)}</td>

                <td>{v.canBuy}</td>
                <YesNo condition={v.cantAffordToBuy} green={true} red={false} />
                <YesNo condition={v.limitBuyPerHourReached} green={true} red={false} />
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
