import React, { useEffect, useReducer } from 'react'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Topbar from '../ui/topbar'
import {
  fetchAssetPairs,
  fetchBalance,
  fetchPairs,
  fetchTick,
  fetchTicks,
  fetchTransactions,
  initialState,
  reducer,
} from '../ui/store'
import Traders from '../ui/traders'
import PrimeReact from 'primereact/utils'

PrimeReact.ripple = true
export default function layout() {
  const [store, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    fetchPairs(dispatch)
  }, [])
  useEffect(() => {
    fetchAssetPairs(dispatch)
  }, [])

  useEffect(() => {
    fetchBalance(dispatch)
  }, [])
  useEffect(() => {
    fetchTicks(dispatch)
  }, [])
  useEffect(() => {
    const pid = setInterval(() => fetchBalance(dispatch), 10000)
    return () => clearInterval(pid)
  }, [])
  useEffect(() => {
    const pid = setInterval(() => fetchTick(dispatch), 6000)
    return () => clearInterval(pid)
  }, [])

  useEffect(() => {
    fetchTransactions(dispatch)
    const pid = setInterval(() => fetchTransactions(dispatch), 10000)
    return () => clearInterval(pid)
  }, [])

  return (
    <>
      <Topbar store={store} />
      <Traders store={store} />
    </>
  )
}
