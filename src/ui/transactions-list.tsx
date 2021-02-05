import React from 'react'
import { ToSell } from './to-sell'
import { calculatePercentage } from '../bot/calculate-percentage'
import { IStore } from '../api/server-store'
import moment from 'moment'
import { bn } from '../utils/bn'

export const TransactionsList = ({ transactions, store }: { transactions: any; store: IStore }) => (
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
        </tr>
      </thead>
      <tbody>
        {transactions.map((t: string) => {
          return (
            <tr key={t.id}>
              <td>{moment.unix(t.timestamp).format('YYYY-MM-DD HH:mm')}</td>
              <td>{t.type === 'buy' ? <div className='pill green'>BUY</div> : <div className='pill red'>SELL</div>}</td>
              <td>{t.pair.name}</td>
              <td>{t.price}</td>
              <td>{t.volume}</td>
              <td>{t.fee}</td>
              <td>{bn(t.price).multipliedBy(t.volume).toFixed(t.pair.coin1Precision)}</td>
              <td>{t.profit}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)
