require('module-alias/register')
import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import fetchData from './api/fetch-data'
import auth from './auth'
import request from 'request'
process.on('uncaughtException', (error) => {
  console.log('##########################################################################################')
  console.log(error)
  console.log('##########################################################################################')
})

const dev = process.env.NODE_ENV !== 'production'

import {store} from './api/server-store'
import {Pair} from './db/entity/pair'
import {connect} from './db/db'
import {MoreThan as moreThan} from 'typeorm'
import {bn} from '#utils/bn'
import {ToSell} from '#db/entity/to-sell'

const args = process.argv.slice(2)
const port = args[0] ? Number.parseInt(args[0], 10) : 3000

// App.prepare().then(() => {
const server = express()
server.use(auth)

server.use(bodyParser.json())
server.get('/status', async (_request: Request, response: Response) => {
  const buy: string[] = []
  const sell: string[] = []
  Object.entries(store.tradeVars).forEach(([p, v]) => {
    if (v.buy) buy.push(p)
    if (v.sell) sell.push(p)
  })

  const profit = {
    BTC: bn('0'),
    USD: bn('0'),
    ETH: bn('0'),
    SUM: bn('0'),
  }
  const pairsWithProfit = await Pair.find({profit: moreThan('0')})
  pairsWithProfit.forEach((pair) => {
    if (pair.coin1 === 'BTC' || pair.coin1 === 'ETH' || pair.coin1 === 'USD')
      profit[pair.coin1] = profit[pair.coin1].plus(pair.profit)
    if (pair.coin1 === 'USD') profit.SUM = profit[pair.coin1].plus(pair.profit)
    if (pair.coin1 === 'BTC' || pair.coin1 === 'ETH') {
      profit.SUM = profit[pair.coin1].plus(
        bn(pair.profit).multipliedBy(store.ticks[store.ticks.length - 1].pairs[pair.name].c),
      )
    }
  })
  const toSellPositions = await ToSell.find({filled: false})
  response.send({
    buyingPairs: buy,
    sellingPairs: sell,
    buying: buy.length,
    selling: sell.length,
    toSell: toSellPositions,
    profit,
    balanceUSD: store.balance.USD,
    balanceBTC: store.balance.BTC,
    balanceETH: store.balance.ETH,
  })
})
server.get('/tick', (_request: Request, response: Response) => {
  response.send(store.ticks[store.ticks.length - 1])
})
server.get('/store', (_request: Request, response: Response) => {
  response.send(store)
})
server.get('/ticks', (_request: Request, response: Response) => {
  response.send(store.ticks)
})

server.get('/transactions', (_request: Request, response: Response) => {
  // Response.send(store.closedTransactions)
})
server.get('/balance', (_request: Request, response: Response) => {
  response.send(store.balance)
})

server.get('/pairs', async (_request: Request, response: Response) => {
  const pairs = await Pair.find()
  response.send(pairs)
})
server.post('/pair', (request: Request, response: Response) => {
  // Const {pair, key, value} = request.body as {
  //   pair: string
  //   key: string
  //   value: string
  // }
  // store.pairs[pair] = {
  //   ...store.pairs[pair],
  //   [key]: value,
  // }
  // response.send(store.pairs)
})
server.get('/tradeVars', (_request: Request, response: Response) => {
  response.send(store.tradeVars)
})

server.get('/toSell', (_request: Request, response: Response) => {
  // Response.send(store.toSell)
})

if (dev) {
  server.all('*', (_request: Request, response: Response) => {
    console.log(_request.originalUrl)
    _request.pipe(request('http://localhost:1234' + _request.originalUrl)).pipe(response)
  })
}

server.listen(port, '0.0.0.0', () => {
  console.log(`server is listening on ${port} port`)
})
fetchData()
// })

connect().catch((error) => {
  console.log('error connectiong to db')
  console.log(error)
})
