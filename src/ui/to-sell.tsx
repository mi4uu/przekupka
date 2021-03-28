import {calculatePercentage} from '../bot/calculate-percentage'
import React from 'react'
import moment from 'moment'
import {bn} from '../utils/bn'
import axios from 'axios'

export const ToSell = ({toSell, vars}) => {
  const p = bn(toSell.diffInPricePercent)
  if (!vars) return null
  return (
    <tr
      className={[
        vars.wait > 0 && 'important',
        toSell.isSelling && 'selling',
        toSell.canBeSold && p.isGreaterThanOrEqualTo('0') && !toSell.isSelling && 'neutral',
        toSell.canBeSold && p.isLessThan('0') && p.isGreaterThanOrEqualTo('-3') && 'negative0',
        toSell.canBeSold && p.isLessThan(-3) && p.isGreaterThanOrEqualTo(-10) && 'negative1',
        toSell.canBeSold && p.isLessThan('-10') && 'negative2',
        !toSell.canBeSold && 'disabled',
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

      <td>{toSell.diffInPricePercent} %</td>
      <td>{bn(vars.takeProfit).toFixed(2)} %</td>

      <td>
        <button
          className='panicButton'
          onClick={() => {
            if (confirm('Are you sure you want to sell ' + toSell.pair + ' for market price?'))
              axios
                .post('/sell', {pair: toSell.pair})
                .then((r) => {
                  window.location.reload()
                })
                .catch((error) => {
                  console.log(error)
                  alert(error.response.data)
                })
          }}
        >
          PANIC BUTTON
        </button>
        <button
          className='safeBuy'
          onClick={() => {
            if (confirm('Are you sure you want to buy ' + toSell.pair + ' for market price?'))
              axios
                .post('/buy', {pair: toSell.pair})
                .then((r) => {
                  window.location.reload()
                })
                .catch((error) => {
                  console.log(error)
                  alert(error.response.data)
                })
          }}
        >
          ADD SAFE BUY
        </button>
      </td>
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
