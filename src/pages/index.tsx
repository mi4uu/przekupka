import React, {useEffect, useReducer} from 'react'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/mdc-dark-indigo/theme.css'

import Topbar from '../ui/topbar'
import {
  fetchAssetPairs,
  fetchBalance,
  fetchPairs,
  fetchTick,
  fetchTicks,
  fetchToSell,
  fetchTradeVars,
  fetchTransactions,
  initialState,
  reducer,
} from '../ui/store'
import Traders from '../ui/traders'
import PrimeReact from 'primereact/utils'
import '../ui/main.css'

PrimeReact.ripple = true
export default function layout() {
  const [store, dispatch] = useReducer(reducer, initialState)
  // @ts-expect-error
  window.store = store
  useEffect(() => {
    fetchPairs(dispatch).catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    fetchAssetPairs(dispatch).catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    fetchTradeVars(dispatch).catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    fetchBalance(dispatch).catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    fetchTicks(dispatch).catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    const pid = setInterval(async () => fetchBalance(dispatch), 11000)
    return () => {
      clearInterval(pid)
    }
  }, [])
  useEffect(() => {
    const pid = setInterval(async () => fetchTick(dispatch), 5000)
    return () => {
      clearInterval(pid)
    }
  }, [])
  useEffect(() => {
    const pid = setInterval(async () => fetchToSell(dispatch), 10000)
    return () => {
      clearInterval(pid)
    }
  }, [])

  useEffect(() => {
    fetchTransactions(dispatch).catch((error) => {
      console.log(error)
    })
    const pid = setInterval(async () => fetchTransactions(dispatch), 9000)
    return () => {
      clearInterval(pid)
    }
  }, [])
  useEffect(() => {
    const pid = setInterval(async () => fetchTradeVars(dispatch), 6000)
    return () => {
      clearInterval(pid)
    }
  }, [])
  useEffect(() => {
    const pid = setInterval(async () => fetchPairs(dispatch), 80000)
    return () => {
      clearInterval(pid)
    }
  }, [])
  return (
    <>
      <Topbar store={store} />
      <Traders store={store} />
    </>
  )
}
