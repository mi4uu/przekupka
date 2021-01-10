import React from 'react'
import { Panel } from 'primereact/panel'
import Trader from './trader'
import { IState } from '.'
import { calculatePercentage } from '../bot/calculatePercentage'
import BigNumber from 'bignumber.js'
export default function traders({store}:{store:IState}){
  return (
    <>
      {Object.keys(store.pairs).map((pair) =>{ 
        
        const lastTick = store.ticks[store.ticks.length - 1]?.pairs[pair]
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


        const header=<div className='header'>
          <div className="part"> 
            <img  style={{width:16}}  src={`icons/${store.pairs[pair].coin0FriendlyName.toLocaleLowerCase()}.png`}/>
            {store.pairs[pair].coin0FriendlyName} /  
            <img style={{width:16}} src={`icons/${store.pairs[pair].coin1FriendlyName.toLocaleLowerCase()}.png`}/>
            {store.pairs[pair].coin1FriendlyName}
          </div>
          <div className="part"> profit: 
            <span className='p-tag gold  '>
              {store.pairs[pair].profit}  
            </span>
          </div>

          <div className="part"> price: 
            <span className='p-tag    '>
              {price}  
            </span>
        
          </div>


          <div className="part"> highest: 
            <span className='p-tag red  '>
            + {calculatePercentage(new BigNumber(log.highest), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)} %
            </span>
          </div>
          <div className="part"> price: 
      
            <span className='p-tag   '>
              {calculatePercentage(new BigNumber(lastTick.c[0]), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)} % 
            </span>
          </div>

          <div className="part"> lowest: 
            <span className='p-tag  bigger green'>
              {calculatePercentage(new BigNumber(log.lowest), new BigNumber(log.lastTrasnactionPrice!)).toFixed(2)} %
            </span>
          </div>



          <div className="part"> buying: 
            {log.buy && <span className='p-tag  bigger green'>Yes</span>}
            {!log.buy && <span className='p-tag gray'>No</span>}            
          </div>
          <div className="part"> selling: 
            {log.sell && <span className='p-tag bigger red'>Yes</span>}
            {!log.sell && <span className='p-tag gray'>No</span>}          
          </div>
          <div className="part"> to sell: 
            <span className={'p-tag '+(toSellValid?'':'gray')}>
              {toSellValid}</span>/<span className='p-tag gray'>{toSellAll}</span>  
          </div>
        </div>
        return (
          <Panel id={pair} key={pair} header={header} toggleable collapsed={true}>
            <Trader pair={pair} store={store} />
          </Panel>
        )
      }
      
      )
      }
    </>
  )
}