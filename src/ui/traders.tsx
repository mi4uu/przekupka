import React from 'react'
import { Panel } from 'primereact/panel'
import Trader from './trader'
import { IState } from '.'
import { calculatePercentage } from '../bot/calculatePercentage'
import BigNumber from 'bignumber.js'
export default function traders({store}:{store:IState}){
  if(!store.pairs 
    || !store.ticks.length 
    || !store.assetPairs 
    || !store.balance 
    || !Object.keys(store.closedTransactions).length)  return <div>loading...</div>
  return (
    <>
      {Object.keys(store.pairs).map((pair) =>{
        return  <Trader key={pair} store={store} pair={pair}/>

      }
      
      )
      }
    </>
  )
}