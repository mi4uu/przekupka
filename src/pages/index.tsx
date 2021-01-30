import React, {useEffect, useReducer, useState} from 'react'

import '../ui/main.css'
import axios from 'axios'
import {ToSell} from '../ui/toSell'

export default function layout() {
  const [store, setStore] = useState({tradeVars: {}})
  const [status, setStatus] = useState({})
  const [orderBy, setOrderBy] = useState('pair')

  const getStatus = async () => {
    const {data} = await axios.get('/status')
    setStatus(data)
    setTimeout(getStatus, 2100)
  }

  const getStore = async () => {
    const {data} = await axios.get('/store')
    setStore(data)
    setTimeout(getStore, 2000)
  }

  useEffect(() => {
    getStore().catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    getStatus().catch((error) => {
      console.log(error)
    })
  }, [])
  if (!status?.toSell) return null
  return (
    <>
      <div className='table-wrapper'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Left</th>
              <th>Balance</th>
              <th>Price</th>
              <th>Current Price</th>
              <th>Highest Price</th>
              <th>Price diff</th>
              <th>Price % diff</th>
              <th>Current Highest Diff</th>

              <th>Price $ diff</th>
              <th>Profit</th>
              <th>Worth $</th>
              <th>Can be sold</th>
              <th>Selling</th>
            </tr>
          </thead>
          <tbody>
            {status.toSell.map((ts) => (
              <ToSell toSell={ts} vars={store.tradeVars[ts.pair]} key={`${ts.pair}_${ts.price}`} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
