import BigNumber from 'bignumber.js'

import React, {useState} from 'react'
import {calculatePercentage} from '../bot/calculate-percentage'
import color from 'color'
import {bn} from '../utils/bn'
import ChartWrap from './chart-wrap'
import PairDetails from './pair-details'
import {IStore} from '../api/server-store'

export default function Trader({pair, store}: {pair: string; store: IStore}) {
  const [opened, setOpened] = useState(false)

  const closedTransactionsCount = Object.values(store.closedTransactions)
    .filter((t) => t.pair === pair || t.pair === store.assetPairs[pair]?.altname)
    .filter((t) => t.status === 'closed' && t.type === 'sell').length
  const firstTick = store.ticks[0]?.pairs[pair]
  const lastTick = store.ticks[store.ticks.length - 1]?.pairs[pair]
  const price24Change = calculatePercentage(lastTick?.c, firstTick?.c)
  if (!lastTick) return null
  const log = store.tradeVars[pair]
  const price = lastTick.c
  let toSellAll = 0
  let toSellValid = 0
  if (store.toSell[pair])
    store.toSell[pair].map((ts) => {
      if (Number.parseFloat(ts.value) < Number.parseFloat(store.ticks[store.ticks.length - 1].pairs[pair].c)) {
        toSellAll += 1
        toSellValid += 1
      } else toSellAll += 1
    })

  let color_: string
  const lowColor = '#ff0000'
  const highColor = '#689f38'
  const priceDiff = calculatePercentage(bn(lastTick.c), new BigNumber(log.lastTransactionPrice!))
  if (priceDiff.toNumber() > 0) {
    const highestDiff = calculatePercentage(new BigNumber(log.highest), new BigNumber(log.lastTransactionPrice!))
    const diff = Math.round(calculatePercentage(priceDiff, highestDiff).abs().toNumber())
    color_ = color(highColor)
      .desaturate(diff / 100)
      .hex()
  } else {
    const lowestDiff = calculatePercentage(new BigNumber(log.lowest), new BigNumber(log.lastTransactionPrice!))
    const diff = Math.round(calculatePercentage(priceDiff, lowestDiff).abs().toNumber())
    color_ = color(lowColor)
      .desaturate(diff / 100)
      .hex()
  }

  const header = (
    <div className='header'>
      <div className='part'>
        <img style={{width: 16}} src={`icons/${store.pairs[pair]?.coin0FriendlyName?.toLocaleLowerCase()}.png`} />
        {store.pairs[pair].coin0FriendlyName} /
        <img style={{width: 16}} src={`icons/${store.pairs[pair]?.coin1FriendlyName?.toLocaleLowerCase()}.png`} />
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
        <span className={'p-tag ' + (price24Change.isLessThan(0) ? 'red' : 'green')}>{price24Change.toFixed(2)}</span>
      </div>

      <div className='part'>
        highest:
        <span className='p-tag green  '>
          + {calculatePercentage(new BigNumber(log.highest), new BigNumber(log.lastTransactionPrice!)).toFixed(2)}%
        </span>
      </div>
      <div className='part'>
        price:
        <span className='p-tag   ' style={{backgroundColor: color_}}>
          {calculatePercentage(new BigNumber(lastTick.c), new BigNumber(log.lastTransactionPrice!)).toFixed(2)}%
        </span>
      </div>

      <div className='part'>
        lowest:
        <span className='p-tag  bigger red'>
          {calculatePercentage(new BigNumber(log.lowest), new BigNumber(log.lastTransactionPrice!)).toFixed(2)} %
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
        <span className={'p-tag ' + (toSellAll === 0 ? 'gray' : '')}>{toSellAll}</span>
      </div>
      <div className='part'>
        sold:
        <span className='p-tag gray'>{closedTransactionsCount}</span>
      </div>
    </div>
  )
  return (
    <div id={pair} className='trader'>
      <div
        onClick={() => {
          setOpened(!opened)
        }}
        className='traderHeader'
      >
        {header}
      </div>
      {opened && (
        <div className='traderContent'>
          <ChartWrap pair={pair} store={store} />
          <PairDetails pair={pair} store={store} />
        </div>
      )}
    </div>
  )
}
