import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'
import moment from 'moment'
import {bn} from '../utils/bn'
const priceInUSD = (coin, store) => {
  const m = {
    BTC: store.ticks[store.ticks.length - 1].pairs.BTCUSDT.c,
    BNB: store.ticks[store.ticks.length - 1].pairs.BNBUSDT.c,
  }
  return m[coin] || '1'
}

export const TransactionsList = ({transactions, store}: {transactions: any; store: IStore}) => (
  <div className='table-wrapper'>
    <table className='fl-table'>
      <thead>
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>Pair</th>
          <th>Price</th>
          <th>Volume</th>
          <th>Fee</th>
          <th>Cost</th>
          <th>Profit</th>
          <th>time to sell</th>
          <th>strategy</th>
          <th>diff</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => {
          return (
            <tr key={t.id}>
              <td>{moment.unix(t.timestamp).format('YYYY-MM-DD HH:mm')}</td>
              <td>{t.type === 'buy' ? <div className='pill green'>BUY</div> : <div className='pill red'>SELL</div>}</td>
              <td>
                <a href={'#' + t.pair.name}>{t.pair.name}</a>
              </td>
              <td>{t.price}</td>
              <td>{t.volume}</td>
              <td>{bn(t.fee).multipliedBy(priceInUSD('BNB', store)).toFixed(2)}</td>
              <td>{bn(t.price).multipliedBy(t.volume).multipliedBy(priceInUSD(t.pair.coin1, store)).toFixed(2)}</td>

              {t.type === 'sell' && (
                <>
                  <td>{bn(t.profit).multipliedBy(priceInUSD(t.pair.coin1, store)).toFixed(2)} $</td>

                  <td>{moment.duration(t.timeToSell, 'seconds').humanize(true)}</td>
                  <td>{t.strategy}</td>
                  <td>{bn(t.diff).toFixed(2)} %</td>
                </>
              )}
              {t.type === 'buy' && (
                <>
                  <td> </td>

                  <td> </td>
                  <td>{t.strategy}</td>
                  <td> </td>
                </>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)
