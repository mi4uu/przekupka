import BigNumber from 'bignumber.js'
import  Chart  from './chart'
import { Panel } from 'primereact/panel'
import React, { useState } from 'react'
import { IState } from '.'
import { calculatePercentage } from '../bot/calculatePercentage'
import Color from 'color'



export default function Trader({ pair, store }: { pair: string; store: IState }) {
  const [opened, setOpened] = useState(false)
   
  const closedTransactionsCount = Object.values(store.closedTransactions)
    .filter((t) => t.descr.pair === pair || t.descr.pair === store.assetPairs[pair]?.altname)
    .filter((t) => t.status === 'closed' && t.descr.type === 'sell').length
  const firstTick = store.ticks[0]?.pairs[pair]
  const lastTick = store.ticks[store.ticks.length - 1]?.pairs[pair]
  const price24Change = calculatePercentage(new BigNumber(lastTick?.c[0]), new BigNumber(firstTick?.c[0]))
  if(!lastTick) return null
  const log = store.tradeVars[pair]
  const price =lastTick.c[0]
  let toSellAll = 0
  let toSellValid = 0
  if(store.toSell[pair])
    store.toSell[pair]
      .map((ts) => {
        if(parseFloat(ts.value) < parseFloat(store.ticks[store.ticks.length - 1].pairs[pair].c[0]))
        {
          toSellAll+=1
          toSellValid+=1
        } else toSellAll+=1

      })

  let color:string 
  const baseColor = '#000000'
  const lowColor='#ff0000'
  const highColor='#689f38'
  const priceDiff = calculatePercentage(new BigNumber(lastTick.c[0]), new BigNumber(log.lastTrasnactionPrice!))
  if(priceDiff.toNumber()>0){
    const highestDiff = calculatePercentage(new BigNumber(log.highest), new BigNumber(log.lastTrasnactionPrice!))
    const diff = Math.round(calculatePercentage(priceDiff,highestDiff).abs().toNumber())
    color = Color(highColor).desaturate(diff/100).hex()

  } else {
    const lowestDiff = calculatePercentage(new BigNumber(log.lowest), new BigNumber(log.lastTrasnactionPrice!))
    const diff = Math.round(calculatePercentage(priceDiff,lowestDiff).abs().toNumber())
    color = Color(lowColor).desaturate(diff/100).hex()

  }
  const header = (
    <div className='header'  >
      <div className='part'>
        <img style={{ width: 16 }} src={`icons/${store.pairs[pair].coin0FriendlyName.toLocaleLowerCase()}.png`} />
        {store.pairs[pair].coin0FriendlyName} /
        <img style={{ width: 16 }} src={`icons/${store.pairs[pair].coin1FriendlyName.toLocaleLowerCase()}.png`} />
        {store.pairs[pair].coin1FriendlyName}
      </div>
      <div className='part'>
      
      profit:
        <span className='p-tag gold  '>{store.pairs[pair].profit}</span>
      </div>

      <div className='part'>
      
      price:
        <span className='p-tag    '>{price}</span>
      </div>
      <div className='part'>
      
      24h change:
        <span className={'p-tag '+(price24Change.isLessThan(0)?'red':'green')}>{price24Change.toFixed(2)}</span>
      </div>

      <div className='part'>
      
      highest:
        <span className='p-tag green  '>
        + {calculatePercentage(new BigNumber(log.highest), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)}
        %
        </span>
      </div>
      <div className='part'>
      
      price:
        <span className='p-tag   ' style={{backgroundColor:color}}>
          {calculatePercentage(new BigNumber(lastTick.c[0]), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)}
        %
        </span>
      </div>

      <div className='part'>
      
      lowest:
        <span className='p-tag  bigger red'>
          {calculatePercentage(new BigNumber(log.lowest), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)} %
        </span>
      </div>

      <div className='part'>
      
      buying:
        {log.buy && <span className='p-tag  bigger red'>Yes</span>}
        {!log.buy && <span className='p-tag gray'>No</span>}
      </div>
      <div className='part'>
      selling:
        {log.sell && <span className='p-tag bigger green'>Yes</span>}
        {!log.sell && <span className='p-tag gray'>No</span>}
      </div>
      <div className='part'>
      to sell:
        <span className={'p-tag ' + (toSellValid ? 'green' : 'gray')}>{toSellValid}</span>/
        <span className={'p-tag '+(toSellAll===0?'gray':'')}>{toSellAll}</span>
      </div>
      <div className='part'>
                   sold:
        <span className='p-tag gray'>{closedTransactionsCount}</span>
      </div>
    </div>
  )
  return (
    <div id={pair} className="trader">
      <div onClick={()=>setOpened(!opened)} className="traderHeader">
        {header}
      </div>
      {opened &&  <div className="traderContent">
        <Chart pair={pair} store={store} />
      </div>}
    </div>
  )

}