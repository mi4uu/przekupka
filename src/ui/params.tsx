import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ToggleButton } from 'primereact/togglebutton'
import { InputNumber } from 'primereact/inputnumber'
import axios from 'axios'
import { IState } from '.'
const changeParam = async (store:IState, pair:string, param:string, value:unknown)=>{
  const values = {
    ...store.pairs[pair],
    [param]:value
  }
  const {data}= await axios.post('/pair', {pair,values})
  console.log(data)
}
export default function Params({store,pair}:{store:IState,pair:string}){
  const pairData = store.pairs[pair]
  return    <div className="card">
    <h5>Parameters</h5><br/>
     
    <div className="p-field p-grid">
      <label  className="p-col-fixed" style={{width:'200px'}} htmlFor={`${pair}_persuade`}>Active</label>
      <div className="p-col">
        <ToggleButton  
          id={`${pair}_persuade`}
          checked={pairData.active }
          onChange={(e) => changeParam(store, pair, 'active', e.value)}
        />
      </div>

    </div>

    <div className="p-field p-grid">
      <label className="p-col-fixed" style={{width:'200px'}}  htmlFor={`${pair}_volume`}>Volume</label>
      <div className="p-col">
        <InputNumber 
          id={`${pair}_volume`}
          step={0.001}
          value={parseFloat(pairData.volume) }
          onValueChange={(e) => changeParam(store, pair, 'volume', e.value)}
          showButtons  />
      </div></div>
    <div className="p-field p-grid">
      <label className="p-col-fixed" 
        style={{width:'200px'}}  htmlFor={`${pair}_changeToTrend`}>Change to start trend</label>
      <div className="p-col">
        <InputNumber 
          id={`${pair}_changeToTrend`}
          step={0.1}
          value={parseFloat(pairData.changeToTrend) }
          onValueChange={(e) => changeParam(store, pair, 'changeToTrend', e.value)}
          showButtons  />
      </div></div>

    <div className="p-field p-grid">
      <label  className="p-col-fixed" 
        style={{width:'200px'}}  htmlFor={`${pair}_changeToChangeTrend`}>Change to change trend</label>
      <div className="p-col">
        <InputNumber   
          id={`${pair}_changeToChangeTrend`}
          value={parseFloat(pairData.changeToChangeTrend) }
          step={0.1}
          onValueChange={(e) => changeParam(store, pair, 'changeToChangeTrend', e.value)}
          showButtons  />
      </div></div>

      
    <div className="p-field p-grid">
      <label className="p-col-fixed"
        style={{width:'200px'}}  htmlFor={`${pair}_persuade`}>Persuade to keep balance</label>
      <div className="p-col">
        <InputNumber 
          id={`${pair}_persuade`}
          value={pairData.persuadeToBalance }
          step={0.1}
          onValueChange={(e) => changeParam(store, pair, 'persuadeToBalance', e.value)}
          showButtons  />
      </div></div>
     

  </div>
}