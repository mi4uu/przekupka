import React from 'react'
import {ToggleButton} from 'primereact/togglebutton'
import {InputNumber} from 'primereact/inputnumber'
import axios from 'axios'
import {IStore} from '../api/server-store'
const changeParameter = async (store: IStore, pair: string, parameter: string, value: unknown) => {
  const {data} = await axios.post('/pair', {pair, key: parameter, value})
  console.log(data)
}

export default function Parameters_({store, pair}: {store: IStore; pair: string}) {
  const pairData = store.pairs[pair]
  return (
    <div className='card'>
      <h5>Parameters</h5>
      <br />

      <div className='p-field p-grid'>
        <label className='p-col-fixed' style={{width: '200px'}} htmlFor={`${pair}_persuade`}>
          Active
        </label>
        <div className='p-col'>
          <ToggleButton
            id={`${pair}_persuade`}
            checked={pairData.active}
            onChange={async (e) => changeParameter(store, pair, 'active', e.value)}
          />
        </div>
      </div>

      <div className='p-field p-grid'>
        <label className='p-col-fixed' style={{width: '200px'}} htmlFor={`${pair}_volume`}>
          Volume
        </label>
        <div className='p-col'>
          <InputNumber
            id={`${pair}_volume`}
            step={0.001}
            value={Number.parseFloat(pairData.volume)}
            onValueChange={async (e) => changeParameter(store, pair, 'volume', e.value)}
            showButtons
          />
        </div>
      </div>
      <div className='p-field p-grid'>
        <label className='p-col-fixed' style={{width: '200px'}} htmlFor={`${pair}_changeToTrend`}>
          Change to start trend
        </label>
        <div className='p-col'>
          <InputNumber
            id={`${pair}_changeToTrend`}
            step={0.1}
            value={Number.parseFloat(pairData.changeToTrend)}
            onValueChange={async (e) => changeParameter(store, pair, 'changeToTrend', e.value)}
            showButtons
          />
        </div>
      </div>

      <div className='p-field p-grid'>
        <label className='p-col-fixed' style={{width: '200px'}} htmlFor={`${pair}_changeToChangeTrend`}>
          Change to change trend
        </label>
        <div className='p-col'>
          <InputNumber
            id={`${pair}_changeToChangeTrend`}
            value={Number.parseFloat(pairData.changeToChangeTrend)}
            step={0.1}
            onValueChange={async (e) => changeParameter(store, pair, 'changeToChangeTrend', e.value)}
            showButtons
          />
        </div>
      </div>

      <div className='p-field p-grid'>
        <label className='p-col-fixed' style={{width: '200px'}} htmlFor={`${pair}_persuade`}>
          Persuade to keep balance
        </label>
        <div className='p-col'>
          <InputNumber
            id={`${pair}_persuade`}
            value={pairData.persuadeToBalance}
            step={0.1}
            onValueChange={async (e) => changeParameter(store, pair, 'persuadeToBalance', e.value)}
            showButtons
          />
        </div>
      </div>
    </div>
  )
}
