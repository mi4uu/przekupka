import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ToggleButton } from 'primereact/togglebutton'
import { InputNumber } from 'primereact/inputnumber'

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
          onChange={(e) => console.log({value1: e.value})}
        />
      </div>

    </div>

    <div className="p-field p-grid">
      <label className="p-col-fixed" style={{width:'200px'}}  htmlFor={`${pair}_volume`}>Volume</label>
      <div className="p-col">
        <InputNumber 
          id={`${pair}_volume`}
          value={parseFloat(pairData.volume) }
          onValueChange={(e) => console.log({value1: e.value})}
          showButtons  />
      </div></div>
    <div className="p-field p-grid">
      <label className="p-col-fixed" 
        style={{width:'200px'}}  htmlFor={`${pair}_changeToTrend`}>Change to start trend</label>
      <div className="p-col">
        <InputNumber 
          id={`${pair}_changeToTrend`}
          value={parseFloat(pairData.changeToTrend) }
          onValueChange={(e) => console.log({value1: e.value})}
          showButtons  />
      </div></div>

    <div className="p-field p-grid">
      <label  className="p-col-fixed" 
        style={{width:'200px'}}  htmlFor={`${pair}_changeToChangeTrend`}>Change to change trend</label>
      <div className="p-col">
        <InputNumber   
          id={`${pair}_changeToChangeTrend`}
          value={parseFloat(pairData.changeToChangeTrend) }
          onValueChange={(e) => console.log({value1: e.value})}
          showButtons  />
      </div></div>

      
    <div className="p-field p-grid">
      <label className="p-col-fixed"
        style={{width:'200px'}}  htmlFor={`${pair}_persuade`}>Persuade to keep balance</label>
      <div className="p-col">
        <InputNumber 
          id={`${pair}_persuade`}
          value={pairData.persuadeToBalance }
          onValueChange={(e) => console.log({value1: e.value})}
          showButtons  />
      </div></div>
     

  </div>
}