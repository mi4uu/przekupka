import React from 'react'
import { Chart } from 'primereact/chart'
import moment from 'moment'
import Transactions from './transactions'
import Params from './params'
import { Log } from './log'
export default function trader({pair,store}:{pair:string,store:IState}){
  const log = store.tradeVars[pair]
  const lastPrices = store.ticks.map((tick:ITick)=>{
    return {
      y:tick.pairs[pair].c[0],
      x:moment.unix(tick.timestamp).format('HH:mm:ss')
    }
  })
  const transactions = Object.values(store.closedTransactions)

    .filter(t=>t.descr.pair===pair || t.descr.pair=== store.assetPairs[pair]?.altname)
    .map(t=>({
      ...t.descr,
      status:t.status,
      volume:t.vol,
      cost:t.cost,
      fee:t.fee,
      time:t.opentm,
      date:moment.unix(t.opentm).format('YYYY-MM-DD HH:mm:ss')
            
    })
    ).sort((a,b)=>b.time-a.time)
  const sellData = transactions
    .filter(t=>t.type==='sell' && t.status==='closed')
    .map(t=>({
      y:t.price,
      x: moment.unix(t.time).format('HH:mm:ss')
    }) )
  const buyData = transactions
    .filter(t=>t.type==='buy' && t.status==='closed')
    .map(t=>({
      y:t.price,
      x: moment.unix(t.time).format('HH:mm:ss')
    }) )
  const sellDataExpired = transactions
    .filter(t=>t.type==='sell' && t.status==='expired')
    .map(t=>({
      y:t.price,
      x: moment.unix(t.time).format('HH:mm:ss')
    }) )
  const buyDataExpired = transactions
    .filter(t=>t.type==='buy' && t.status==='expired')
    .map(t=>({
      y:t.price,
      x: moment.unix(t.time).format('HH:mm:ss')
    }) )

  const labels = [ ...store.ticks.map(tick=>tick.timestamp),
    ...transactions.map(t=>t.time) ].sort().map(l=>moment.unix(l).format('HH:mm:ss'))
  const basicData = {
        
    labels:labels,
    datasets: [
      {
        label:'highest',
        data:labels.map(_=>log.highest),
        fill:false,
        borderColor: '#0f0',
        pointBorderWidth:0,
        radius:0,
        lineTension:0.1,
        borderWidth:1
      },
      {
        label:'lowest',
        data:labels.map(_=>log.lowest),
        fill:false,
        borderColor: '#f00',
        pointBorderWidth:0,
        radius:0,
        lineTension:0.1,
        borderWidth:1
      },
      {
        label: 'price',
        data:lastPrices,
        fill: false,
        borderColor: '#42A5F5'
      },
      {
        label: 'buy',
        data:buyData,
        showLine:false,
        pointBorderWidth:7,
        fill: false,
        borderColor: '#10a366'
      },
      {
        label: 'sell',
        showLine:false,
        pointBorderWidth:7,
        data:sellData,
        fill: false,
        borderColor: '#a31510'
      },
      {
        label: 'expired sell',
        showLine:false,
        pointBorderWidth:1,
        data:sellDataExpired,
        fill: false,
        radius:5,

        borderStyle:'cross',
        borderColor: '#a31510'
      },
      {
        label: 'expired buy',
        showLine:false,
        pointBorderWidth:1,
        radius:5,
        data:buyDataExpired,
        fill: false,
        borderStyle:'cross',
        borderColor: '#10a366'
      },
           
    ]
  }
  return <>
    <Chart   type="line" data={basicData} style={{height:400}} options={{
      responsive:true,  maintainAspectRatio: false,
      animation:{
        duration:0
      }
    }} />
    <div className="p-fluid p-grid">
      <div className="p-field p-col-12 p-md-4"><Transactions transactions={transactions}/></div>
      <div className="p-field p-col-12 p-md-4">
        <Params store={store} pair={pair}/>

      </div>
      <div className="p-field p-col-12 p-md-4">
        <Log store={store} pair={pair}/>

      </div>
    </div>

    
  </>
}