import BigNumber from 'bignumber.js'
import React from 'react'
import { IState } from '.'
import { calculatePercentage } from '../bot/calculatePercentage'



export function Log({store,pair}:{store:IState,pair:string}){
  if(!store.ticks.length)
    return false
  const lastTick = store.ticks.sort((a,b)=>a.timestamp-b.timestamp)[0].pairs[pair]
  const log = store.tradeVars[pair]
  return <div className="card">
    <h5>Log</h5><br/>
     
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Highest price</div>
     
      <div className="p-col">
        {log.highest}
      </div>
      <div  className="p-col-fixed" style={{width:'100px'}}>+
        {calculatePercentage( new BigNumber(log.highest), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)} %</div>
    </div>
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Current price</div>
      <div className="p-col">
        {lastTick.c[0]}
      </div>
      
    </div>
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Last transaction price</div>
      <div  className="p-col "  >{log.lastTrasnactionPrice}</div>
    </div>
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Lowest price</div>
      <div className="p-col">
        {log.lowest}
      </div>
      <div  className="p-col-fixed" style={{width:'100px'}}>
        {calculatePercentage( new BigNumber(log.lowest), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)} %</div>
    </div>
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Is trying to sell</div>
      <div className="p-col">
        {log.sell && <span className="p-tag .red">Yes</span>}
        {!log.sell && <span className="p-tag .gray">No</span>}
      </div>
    </div>
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Is trying to buy</div>
      <div className="p-col">
        {log.buy && <span className="p-tag  .green" >Yes</span>}
        {!log.buy && <span className="p-tag .gray">No</span>}
      </div>
    </div>
    <div className="p-field p-grid">
      <div  className="p-col-fixed" style={{width:'200px'}}>Wait to confirm trade</div>
      <div className="p-col">
        {log.wait===0?'No':log.wait}
      </div>
    </div>
    
  </div>
}