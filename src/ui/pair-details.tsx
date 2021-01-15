import React from 'react'
import moment from 'moment'
import Transactions from './transactions'
import Params from './params'
import {Log} from './log'
import ToSell from './to-sell'
import {IStore} from '../api/server-store'
export default function PairDetails({pair, store}: {pair: string; store: IStore}) {
  const transactions = Object.values(store.closedTransactions)
    .filter((t) => t.descr.pair === pair || t.descr.pair === store.assetPairs[pair]?.altname)
    .map((t) => ({
      ...t.descr,
      status: t.status,
      volume: t.vol,
      cost: t.cost,
      fee: t.fee,
      time: t.opentm,
      date: moment.unix(t.opentm).format('YYYY-MM-DD HH:mm:ss'),
      price: Number.parseFloat(t.price) > 0 ? t.price : t.descr.price,
    }))
    .sort((a, b) => b.time - a.time)
  return (
    <>
      <div className='p-fluid p-grid'>
        <div className='p-field p-col-12 p-md-4'>
          <ToSell pair={pair} store={store} />
          <Transactions transactions={transactions} />
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <Params store={store} pair={pair} />
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <Log store={store} pair={pair} />
        </div>
      </div>
    </>
  )
}
