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

import {IPair, store} from './api/server-store'
import {startTrading, trade} from './bot/trade'
import BigNumber from 'bignumber.js'

const args = process.argv.slice(2)
const port = args[0] ? Number.parseInt(args[0], 10) : 3000

// App.prepare().then(() => {
const server = express()
server.use(auth)

server.use(bodyParser.json())
server.get('/tick', (_request: Request, response: Response) => {
  response.send(store.ticks[store.ticks.length - 1])
})
server.get('/store', (_request: Request, response: Response) => {
  response.send(store)
})
server.get('/ticks', (_request: Request, response: Response) => {
  response.send(store.ticks)
})
server.get('/sold', (_request: Request, response: Response) => {
  response.send(store.sold)
})
server.get('/transactions', (_request: Request, response: Response) => {
  response.send(store.closedTransactions)
})
server.get('/balance', (_request: Request, response: Response) => {
  response.send(store.balance)
})
server.get('/assetPairs', (_request: Request, response: Response) => {
  response.send(store.assetPairs)
})
server.get('/pairs', (_request: Request, response: Response) => {
  response.send(store.pairs)
})
server.post('/pair', (request: Request, response: Response) => {
  const {pair, key, value} = request.body as {
    pair: string
    key: string
    value: string
  }

  store.pairs[pair] = {
    ...store.pairs[pair],
    [key]: value,
  }

  response.send(store.pairs)
})
server.get('/tradeVars', (_request: Request, response: Response) => {
  response.send(store.tradeVars)
})

server.get('/toSell', (_request: Request, response: Response) => {
  response.send(store.toSell)
})
server.all('*', (_request: Request, response: Response) => {
  console.log(_request.originalUrl)
  _request.pipe(request('http://localhost:1234' + _request.originalUrl)).pipe(response)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`server is listening on ${port} port`)
})
fetchData()
startTrading()
// })
