import React from 'react'
import {ToSell} from './to-sell'
import {calculatePercentage} from '../bot/calculate-percentage'
import {IStore} from '../api/server-store'
import {bn} from '../utils/bn'
const YesNo = ({condition, colors}) => (
  <td>
    {condition ? (
      <div className={colors ? 'pill green' : 'pill'}>YES</div>
    ) : (
      <div className={colors ? 'pill red' : 'pill'}>NO</div>
    )}
  </td>
)
export const BuyingList = ({list, vars, ticks}: {list: any; vars: any; ticks: any}) => {
  return (
    <div className='table-wrapper'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Buying</th>
            <th>Pair</th>
            <th>Price</th>
            <th>Price diff</th>
            <th>Below short BB?</th>
            <th>Below long BB?</th>
            <th>RSI 14</th>
            <th>Strong BULLISH</th>

            <th>below long SMA ?</th>
            <th>Is drop after pump?</th>
            <th>Allow buying</th>
            <th>Have one to sell?</th>
          </tr>
        </thead>
        <tbody>
          {list.map((pair) => {
            const v = vars[pair.name]
            const price = ticks[pair.name].a

            return (
              <tr key={pair.name}>
                <YesNo condition={v.buy} colors={true} />
                <td>{pair.name}</td>
                <td>{price}</td>
                <td>{bn(pair.diff).toFixed(1)} %</td>
                <td>
                  {v.stats.belowBB0 && <div className='pill green'>{bn(v.stats.shortPeriodMinDiff).toFixed(1)} %</div>}
                  {!v.stats.belowBB0 && <div className='pill red '>{bn(v.stats.shortPeriodMinDiff).toFixed(1)} %</div>}
                </td>
                <td>
                  {v.stats.belowBB1 && <div className='pill green'>{bn(v.stats.longPeriodMinDiff).toFixed(1)} %</div>}
                  {!v.stats.belowBB1 && <div className='pill red '>{bn(v.stats.longPeriodMinDiff).toFixed(1)} %</div>}
                </td>
                <td>
                  {v.stats.rsi < 20 && <div className='pill green'>{Math.round(v.stats.rsi)}</div>}
                  {v.stats.rsi < 70 && v.stats.rsi > 20 && <div className='pill  '>{Math.round(v.stats.rsi)}</div>}
                  {v.stats.rsi >= 70 && <div className='pill red '>{Math.round(v.stats.rsi)}</div>}
                </td>{' '}
                <YesNo condition={v.stats.isStrongBullish} colors={true} />
                <YesNo condition={v.stats.belowLastSma} colors={true} />
                <YesNo condition={v.stats.isDroppingAfterBigRise} colors={false} />
                <YesNo condition={v.stats.allowBuying} colors={true} />
                <YesNo condition={v.stats.iHaveOneToSell} colors={false} />
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
