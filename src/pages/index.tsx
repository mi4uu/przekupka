import React, { useEffect, useReducer, useState } from 'react'

import '../ui/main.css'
import axios from 'axios'
import { ToSell } from '../ui/to-sell'
import { ToSellList } from '../ui/to-sell-list'
import { IStore } from '../api/server-store'
import { BuyingList } from '../ui/buying-list'

export default function layout() {
  const [store, setStore] = useState<IStore>({ tradeVars: {}, balance: {}, ticks: [] })
  const [status, setStatus] = useState({})
  const [orderBy, setOrderBy] = useState('pair')

  const getStatus = async () => {
    const { data } = await axios.get('/status')
    setStatus(data)
    setTimeout(getStatus, 2100)
  }

  const getStore = async () => {
    const { data } = await axios.get('/store')
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
  if (store.ticks.length === 0) return null

  return (
    <>
      <BuyingList status={status} store={store} />
      <ToSellList status={status} store={store} />
    </>
  )
}
