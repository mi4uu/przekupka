import React, {useEffect, useReducer, useState} from 'react'

import '../ui/main.css'
import axios from 'axios'
import {ToSell} from '../ui/to-sell'
import {ToSellList} from '../ui/to-sell-list'
import {IStore} from '../api/server-store'
import {BuyingList} from '../ui/buying-list'
import {TransactionsList} from '../ui/transactions-list'
import {bn} from '../utils/bn'
import moment from 'moment'

export default function layout() {
  const [store, setStore] = useState<IStore>({tradeVars: {}, balance: {}, ticks: []})
  const [status, setStatus] = useState({})
  const [transactions, setTransactions] = useState([])

  const [orderBy, setOrderBy] = useState('pair')

  const getStatus = async () => {
    try {
      const {data} = await axios.get('/status')
      setStatus(data)
    } catch (error) {
      console.log(error)
    }

    setTimeout(getStatus, 4100)
  }

  const getTransactions = async () => {
    try {
      const {data} = await axios.get('/transactions')
      setTransactions(data)
    } catch (error) {
      console.log(error)
    }

    setTimeout(getTransactions, 6000)
  }

  const getStore = async () => {
    try {
      const {data} = await axios.get('/store')
      setStore(data)
    } catch (error) {
      console.log(error)
    }

    setTimeout(getStore, 3700)
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
  useEffect(() => {
    getTransactions().catch((error) => {
      console.log(error)
    })
  }, [])
  if (!status?.toSell) return null
  if (store.ticks.length === 0) return null

  return (
    <>
      <div className='table-wrapper'>
        <div className='pillWrap'>
          <div className='pillHeader'>Balance USD</div>
          <div className='pillContent'>{status.balanceUSD}</div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Balance BTC</div>
          <div className='pillContent'>{status.balanceBTC}</div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Balance BNB</div>
          <div className='pillContent'>{status.balanceBNB}</div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Balance SUM</div>
          <div className='pillContent'>
            {bn(status.balanceUSD.split('$')[0])
              .plus(status.balanceBTC.split('=')[1].split('$')[0])
              .plus(status.balanceBNB.split('=')[1].split('$')[0])
              .toFixed(2)}{' '}
            $
          </div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Total Welth</div>
          <div className='pillContent'>
            <b>
              {' '}
              {bn(status.balanceUSD.split('$')[0])
                .plus(status.balanceBTC.split('=')[1].split('$')[0])
                .plus(status.balanceBNB.split('=')[1].split('$')[0])
                .plus(status.toSellWorth)
                .toFixed(2)}
            </b>{' '}
            $
          </div>
        </div>
        <br />

        <div className='pillWrap'>
          <div className='pillHeader'>USD in GOODS</div>
          <div className='pillContent'>
            {status.toSell
              .filter((ts) => ts.pair.endsWith('USDT'))
              .map((ts) => bn(ts.worthInUSD))
              .reduce((a, b) => a.plus(b))
              .toFixed(2)}{' '}
            $
          </div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>BTC in GOODS</div>
          <div className='pillContent'>
            {status.toSell
              .filter((ts) => ts.pair.endsWith('BTC'))
              .map((ts) => bn(ts.worthInUSD))
              .reduce((a, b) => a.plus(b))
              .toFixed(2)}
            $
          </div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>BNB in GOODS</div>
          <div className='pillContent'>
            {status.toSell
              .filter((ts) => ts.pair.endsWith('BNB'))
              .map((ts) => bn(ts.worthInUSD))
              .reduce((a, b) => a.plus(b))
              .toFixed(2)}
            $
          </div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Balance GOODS</div>
          <div className='pillContent'>{status.toSellWorth}</div>
        </div>

        <br />
        <div className='pillWrap'>
          <div className='pillHeader'>Profit USD</div>
          <div className='pillContent'>{status.profitUSD}</div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Profit BTC</div>
          <div className='pillContent'>{status.profitBTC}</div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Profit BNB</div>
          <div className='pillContent'>{status.profitBNB}</div>
        </div>
        <div className='pillWrap'>
          <div className='pillHeader'>Profit SUM</div>
          <div className='pillContent'>{status.profitSUM}</div>
        </div>
      </div>
      <h1>Last Transactions :</h1>
      <TransactionsList transactions={transactions} store={store} />
      <h1>Buying :</h1>
      <BuyingList status={status} store={store} />
      <h1>Selling :</h1>
      <ToSellList status={status} store={store} />
    </>
  )
}
