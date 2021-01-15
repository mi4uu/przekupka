import React, {useState} from 'react'
import {IStore} from '../api/server-store'
import Chart from './chart'
export default function ChartWrap({pair, store}: {pair: string; store: IStore}) {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <div
        className='chartButton red'
        onClick={() => {
          setOpened(!opened)
        }}
      >
        {opened ? 'Hide chart' : 'Show chart'}{' '}
      </div>
      {opened && <Chart pair={pair} store={store} />}
    </>
  )
}
