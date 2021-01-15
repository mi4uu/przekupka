import BigNumber from 'bignumber.js'
import React from 'react'
import {IStore} from '../api/server-store'
import {calculatePercentage} from '../bot/calculate-percentage'
import {bn} from '../utils/bn'

export function Log({store, pair}: {store: IStore; pair: string}) {
  if (store.ticks.length === 0) return null
  const lastTick = store.ticks[store.ticks.length - 1].pairs[pair]
  const log = store.tradeVars[pair]
  const price = lastTick.c
  return (
    <div className='card'>
      <h5>Log</h5>
      <br />

      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Profit
        </div>

        <div className='p-col'> </div>
        <div className='p-col-fixed' style={{width: '130px'}}>
          <span className='p-tag gold bigger '>{store.pairs[pair].profit}</span>
        </div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Highest price
        </div>

        <div className='p-col'>{log.highest}</div>
        <div className='p-col-fixed' style={{width: '130px'}}>
          <span className='p-tag green bigger '>
            + {calculatePercentage(new BigNumber(log.highest), new BigNumber(log.lastTransactionPrice!)).toFixed(2)} %
          </span>
        </div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed currentPrice' style={{width: '200px'}}>
          Current price
        </div>
        <div className='p-col'>{price}</div>
        <div className='p-col-fixed' style={{width: '200px'}}>
          <span className='p-tag red bigger '>
            {calculatePercentage(new BigNumber(log.lowest), new BigNumber(price)).toFixed(2)} %
          </span>
          <span className='p-tag  bigger '>
            {calculatePercentage(new BigNumber(lastTick.c), new BigNumber(log.lastTransactionPrice!)).toFixed(2)} %
          </span>
          <span className='p-tag green bigger  '>
            + {calculatePercentage(new BigNumber(log.highest), new BigNumber(price)).toFixed(2)} %
          </span>
        </div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed ' style={{width: '200px'}}>
          Last transaction price
        </div>
        <div className='p-col '>{log.lastTransactionPrice}</div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Lowest price
        </div>
        <div className='p-col'>{log.lowest}</div>
        <div className='p-col-fixed' style={{width: '130px'}}>
          <span className='p-tag  bigger red'>
            {calculatePercentage(new BigNumber(log.lowest), new BigNumber(log.lastTransactionPrice!)).toFixed(2)} %
          </span>
        </div>
      </div>

      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Market liquidity
        </div>
        <div className='p-col'>{log.lowest}</div>
        <div className='p-col-fixed' style={{width: '130px'}}>
          <span className='p-tag  bigger'>
            {calculatePercentage(
              bn(store.ticks[store.ticks.length - 1].pairs[pair].a),
              bn(store.ticks[store.ticks.length - 1].pairs[pair].b),
            ).toFixed(2)}{' '}
            %
          </span>
        </div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Ask for:
        </div>
        <div className='p-col'> {store.ticks[store.ticks.length - 1].pairs[pair].a}</div>
        <div className='p-col-fixed' style={{width: '130px'}}></div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Bid For:
        </div>
        <div className='p-col'> {store.ticks[store.ticks.length - 1].pairs[pair].b} </div>
        <div className='p-col-fixed' style={{width: '130px'}}></div>
      </div>

      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Is trying to buy ({log.processData?.buy ? 'Y' : 'N'})
        </div>
        <div className='p-col'>
          {log.buy && <span className='p-tag  bigger green'>Yes</span>}
          {!log.buy && <span className='p-tag gray'>No</span>}
        </div>
      </div>

      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Can't afford to buy
        </div>
        <div className='p-col'>
          {log.cantAffordToBuy && <span className='p-tag  bigger green'>Yes</span>}
          {!log.cantAffordToBuy && <span className='p-tag gray'>No</span>}
        </div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col'></div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Is trying to sell ({log.processData?.sell ? 'Y' : 'N'})
        </div>
        <div className='p-col'>
          {log.sell && <span className='p-tag bigger red'>Yes</span>}
          {!log.sell && <span className='p-tag gray'>No</span>}
        </div>
      </div>
      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Have nothing to sell
        </div>
        <div className='p-col'>
          {log.noAssetsToSell && <span className='p-tag  bigger green'>Yes</span>}
          {!log.noAssetsToSell && <span className='p-tag gray'>No</span>}
        </div>
      </div>

      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Is buy per hour limit reached?
        </div>
        <div className='p-col'>
          {log.limitBuyPerHourReached && <span className='p-tag  bigger green'>Yes</span>}
          {!log.limitBuyPerHourReached && <span className='p-tag gray'>No</span>}
        </div>
      </div>

      <div className='p-field p-grid'>
        <div className='p-col-fixed' style={{width: '200px'}}>
          Wait to confirm trade
        </div>
        <div className='p-col'>
          {log.wait === 0 ? <span className='p-tag gray'>No</span> : <b className='p-tag bigger red'>{log.wait}</b>}
        </div>
      </div>
    </div>
  )
}
