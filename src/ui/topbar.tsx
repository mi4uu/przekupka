import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { IState } from '.'
import BigNumber from 'bignumber.js'
const primaryCoin = 'ZUSD'


const jump = (h:string)=>{
  const top = (document.getElementById(h)?.offsetTop||0) -100 //Getting Y of target element
  window.scrollTo(0, top )                        //Go there directly or some transition
}
export default function TopBar({ store }: { store: IState }) {


  return <div className="topBar p-d-flex p-p-3 card p-jc-center p-shadow-1">
    {Object.entries(store.balance).map(([coin, value], i, { length }) =>{
      const pair = Object.entries(store.pairs).filter(([k,v])=>v.coin0===coin)
        .map(([k,v])=>k)[0]
      const price = (pair && store.ticks.length)? store.ticks[store.ticks.length-1].pairs[pair].c[0]: 0
      return (
        <div onClick={()=>jump(pair)} className={'p-mr-2'} key={coin}>
          <Button type="button" label={value} className="p-button-warning" />
          <Button type="button" label={coin} /><br/>
          {coin!==primaryCoin && <> 
            <Button type="button" 
              label={new BigNumber(value).multipliedBy(new BigNumber(price)).toFixed(2)}
              className="p-button-success" />
            <Button type="button" label={'$'} /></>}
        </div>
      )}
    )
    
    }
  </div>
}
