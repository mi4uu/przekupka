import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import moment from 'moment'
import {IStore} from '../api/server-store'
import {calculatePercentage} from '../bot/calculate-percentage'
import {bn} from '../utils/bn'

export default function ToSell({pair, store}: {pair: string; store: IStore}) {
  const transactions = store.closedTransactions
  const price = store.ticks[store.ticks.length - 1].pairs[pair].b
  const highest = bn(store.tradeVars[pair].highest)
  const risk = bn(store.pairs[pair].changeToChangeTrend)
  const minProfit = bn(store.pairs[pair].changeToTrend)
  const sellPriceDiff = highest.multipliedBy(risk.dividedBy(100))
  const sellAt = highest.minus(sellPriceDiff)
  const sellAtPercentage = calculatePercentage(price, sellAt)
  if (!store.toSell[pair] || !store.ticks) return null
  const toSell = store.toSell[pair]
    .map((ts) => ({
      date: moment.unix(ts.timestamp).format('YYYY-MM-DD HH:mm'),
      volume: transactions[ts.id]?.vol,
      price: ts.value,
      status:
        Number.parseFloat(ts.value) < Number.parseFloat(store.ticks[store.ticks.length - 1].pairs[pair].c)
          ? 'OK'
          : 'too high',
      diff: calculatePercentage(price, ts.value).toFixed(2) + '%',
      willSellAt: calculatePercentage(price, ts.value).isGreaterThan(minProfit)
        ? bn('100').minus(sellAtPercentage).toFixed(2) + '%'
        : '--',
    }))
    .sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
  return (
    <div className='card'>
      <h5>To Sell</h5>
      <DataTable value={toSell} scrollable scrollHeight='200px'>
        <Column field='date' header='Date'></Column>
        <Column field='volume' header='Volume'></Column>
        <Column field='price' header='Price'></Column>
        <Column field='diff' header='Diff'></Column>
        <Column field='willSellAt' header='Closed in'></Column>
      </DataTable>
    </div>
  )
}
