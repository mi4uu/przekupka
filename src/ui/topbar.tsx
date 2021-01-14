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
  let profit = new BigNumber(0)
  if(store.pairs && store.ticks)
    Object.entries(store.pairs).map(([pair,v])=>{
      if(v.coin1!==primaryCoin)
      {
        const traidingPair =  Object.entries(store.pairs).filter(([p_,v_])=>v_.coin0===v.coin1).map(([p_])=>p_)[0]
        const lastPrice = store.ticks[store.ticks.length-1]?.pairs[traidingPair].c[0]
        if(lastPrice)
          profit = profit.plus((new BigNumber(v.profit)).multipliedBy(new BigNumber(lastPrice)))
      } else 
        profit = profit.plus(new BigNumber(v.profit))
    })
  return <div className="topBar  p-p-3 card p-jc-center p-shadow-1">
    {Object.entries(store.balance).map(([coin, value], i, { length }) =>{
      const pair = Object.entries(store.pairs).filter(([k,v])=>v.coin0===coin)
        .map(([k,v])=>k)[0]
      const price = (pair && store.ticks.length)? store.ticks[store.ticks.length-1].pairs[pair].c[0]: 0
      return (
        <div onClick={()=>jump(pair)} className={'coin'} key={coin}>
          <Button type="button" label={value} className="p-button-warning" />
          <Button type="button" label={coin} /><br/>
          {coin!==primaryCoin && <> 
            <Button type="button" 
              label={new BigNumber(value).multipliedBy(new BigNumber(price)).toFixed(2)}
              className="p-button-success" />
            <Button type="button" label={'$'} /></>}
          {coin===primaryCoin && <> 
            <Button type="button" 
              label={profit.toFixed(2)}
              className="p-button-success" />
            <Button type="button" label={'profit'} /></>}
        </div>
        
      )}
    )
    
    }
  </div>
}
