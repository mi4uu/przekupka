import React from 'react'
import Trader from './trader'

import {IStore} from '../api/server-store'
export default function traders({store}: {store: IStore}) {
  if (
    !store.pairs ||
    store.ticks.length === 0 ||
    !store.assetPairs ||
    !store.balance ||
    Object.keys(store.closedTransactions).length === 0
  )
    return <div>loading...</div>
  return (
    <>
      {Object.keys(store.pairs).map((pair) => {
        return <Trader key={pair} store={store} pair={pair} />
      })}
    </>
  )
}
