import {calculatePercentage} from '../bot/calculate-percentage'
import React from 'react'
import moment from 'moment'
import {bn} from '../utils/bn'

export const ToSell = ({toSell, vars}) => {
  const p = bn(toSell.diffInPricePercent)
  if (!vars) return null
  return (
    <tr
      className={[
        vars.wait > 0 && 'important',
        toSell.isSelling && 'selling',
        p.isGreaterThanOrEqualTo('0') && !toSell.isSelling && 'neutral',
        p.isLessThan('0') && p.isGreaterThanOrEqualTo('-1') && 'negative0',
        p.isLessThan('-1') && p.isGreaterThanOrEqualTo('-2') && 'negative1',
        p.isLessThan('-2') && 'negative2',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <td>
        <a name={toSell.pair}> </a>
        <a target={toSell.pair} href={'https://pl.tradingview.com/chart?symbol=BINANCE%3A' + toSell.pair}>
          {toSell.pair}
        </a>
      </td>
      <td>{bn(toSell.left).toFixed(8)}</td>
      <td>{toSell.balance}</td>
      <td>{bn(toSell.price).toFixed(8)}</td>
      <td>{toSell.currentPrice}</td>
      <td>{vars.highest}</td>

      <td>{toSell.diffInPrice}</td>
      <td>{toSell.diffInPricePercent}</td>
      <td>{calculatePercentage(vars.highest, toSell.currentPrice).toFixed(2)}</td>
      <td>{toSell.diffInPriceUSD}</td>
      <td>{toSell.profitInUSD}</td>
      <td>{toSell.worthInUSD}</td>
      <td>{toSell.canBeSold ? <div className='pill green'>YES</div> : <div className='pill red'>NO</div>}</td>

      <td>{toSell.isSelling ? <div className='pill green'>YES</div> : <div className='pill gray'>NO</div>}</td>
      <td>{toSell.safeBuy}</td>
      <td>{toSell.strategy}</td>
      <td>{moment.unix(toSell.sellUpdate).fromNow()}</td>
      <td>{moment.unix(toSell.buyUpdate).fromNow()}</td>
    </tr>
  )
}
