import {calculatePercentage} from '../bot/calculate-percentage'
import React from 'react'

export const ToSell = ({toSell, vars}) => {
  return (
    <tr>
      <td>{toSell.pair}</td>
      <td>{toSell.left}</td>
      <td>{toSell.balance}</td>
      <td>{toSell.price}</td>
      <td>{toSell.currentPrice}</td>
      <td>{vars.highest}</td>

      <td>{toSell.diffInPrice}</td>
      <td>{toSell.diffInPricePercent}</td>
      <td>{calculatePercentage(vars.highest, toSell.currentPrice).toFixed(2)}</td>
      <td>{toSell.diffInPriceUSD}</td>
      <td>{toSell.profitInUSD}</td>
      <td>{toSell.worthInUSD}</td>
      <td>{toSell.canBeSold ? <div className='pill green'>YES</div> : <div className='pill red'>NO</div>}</td>
      <td>{toSell.isSelling ? <div className='pill green'>YES</div> : <div className='pill red'>NO</div>}</td>
    </tr>
  )
}
