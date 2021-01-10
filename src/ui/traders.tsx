import React from 'react'
import { Panel } from 'primereact/panel'
import Trader from './trader'
import { IState } from '.'

export default function traders({store}:{store:IState}){
  return (
    <>
      {Object.keys(store.pairs).map((pair) => (
        <Panel id={pair} key={pair} header={pair} toggleable>
          <Trader pair={pair} store={store} />
        </Panel>
      ))}
    </>
  )
}