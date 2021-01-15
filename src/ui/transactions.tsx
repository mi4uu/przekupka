import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

interface ITransaction {
  status: string
  volume: string
  cost: string
  fee: string
  time: number
  pair: string
  type: string
  ordertype: string
  price: string
  price2: string
  leverage: string
  order: string
  close: string
  date: string
}
export default function Transactions({ transactions }: { transactions: ITransaction[] }) {
  return (
    <div className='card'>
      <h5>Transactions</h5>
      <DataTable value={transactions} scrollable scrollHeight='200px'>
        <Column field='date' header='Date'></Column>
        <Column field='type' header='Type'></Column>
        <Column field='volume' header='Volume'></Column>
        <Column field='price' header='Price'></Column>
        <Column field='fee' header='Fee'></Column>
        <Column field='status' header='Status'></Column>
      </DataTable>
    </div>
  )
}
