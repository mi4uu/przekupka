import axios from 'axios'
import {Pair} from '../../db/entity/pair'
import {createConnection} from 'typeorm'
import {bn} from '#utils/bn'
import {markets} from './config'
import {ToSell} from '#db/entity/to-sell'
import {calculatePercentage} from '#bot/calculate-percentage'
import {makeOffer} from './make-offer'
import fetchData from '#api/fetch-data'
import {connect} from '#db/db'

const createInitialPairs = async () => {
  const connection = connect()

  const {data: ticks} = await axios.get('https://www.binance.com/api/v3/ticker/bookTicker')
  const ts = await ToSell.find()

  ts.map(async (tosell) => {
    const pair = await tosell.pair

    const tick = ticks.find((t: any) => t.symbol === pair.name)
    const diff = calculatePercentage(tick.bidPrice, tosell.price)
    console.log(pair.name, '-', diff.toFixed(2), '%')
    if (diff.isLessThan(-3)) {
      await makeOffer(pair.name, tick.bidPrice, tosell.left, 'sell')
      pair.active = false
      await pair.save()
    }
  })
}

createInitialPairs()
setTimeout(() => {
  process.exit(1)
}, 10000)
