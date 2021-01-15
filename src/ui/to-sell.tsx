import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import moment from 'moment'
import {IStore} from '../api/server-store'

export default function ToSell({pair, store}: {pair: string; store: IStore}) {
  const transactions = store.closedTransactions
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
    }))
    .sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
  return (
    <div className='card'>
      <h5>To Sell</h5>
      <DataTable value={toSell} scrollable scrollHeight='200px'>
        <Column field='date' header='Date'></Column>
        <Column field='volume' header='Volume'></Column>
        <Column field='price' header='Price'></Column>
        <Column field='status' header='Status'></Column>
      </DataTable>
    </div>
  )
}
