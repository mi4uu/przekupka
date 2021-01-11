import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import fetchData from './api/fetchData'
import auth from './auth'


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
import { IPair, store } from './api/serverStore'
import { startTrading, trade } from './bot/trade'
import BigNumber from 'bignumber.js'

const args = process.argv.slice(2)
const port = args[0] ? parseInt(args[0]) : 3000

app.prepare().then(() => {
  const server = express()
  server.use(auth)

  server.use(express.static('public'))
  server.use(bodyParser.json())
  server.get('/tick', (req: Request, res: Response) => {
    res.send(store.ticks[store.ticks.length - 1])
  })
  server.get('/ticks', (req: Request, res: Response) => {
    res.send(store.ticks)
  })
  server.get('/transactions', (req: Request, res: Response) => {
    res.send(store.closedTransactions)
  })
  server.get('/balance', (req: Request, res: Response) => {
    res.send(store.balance)
  })
  server.get('/assetPairs', (req: Request, res: Response) => {
    res.send(store.assetPairs)
  })
  server.get('/pairs', (req: Request, res: Response) => {
    res.send(store.pairs)
  })
  server.post('/pair', (req: Request, res: Response) => {
    const { pair, values } = req.body as {
      pair: string
      values: IPair
    }

    store.pairs[pair] = {
      ...store.pairs[pair],
      ...values,
      changeToTrend: new BigNumber(values.changeToTrend),
      changeToChangeTrend: new BigNumber(values.changeToChangeTrend),
      volume: new BigNumber(values.volume), // min 50
    }

    res.send(store.pairs)
  })
  server.get('/tradeVars', (req: Request, res: Response) => {
    res.send(store.tradeVars)
  })
  server.get('/tradeBalance', (req: Request, res: Response) => {
    res.send(store.tradeBalance)
  })
  server.get('/toSell', (req: Request, res: Response) => {
    res.send(store.toSell)
  })
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(port, '0.0.0.0', () => console.log(`server is listening on ${port} port`))
  fetchData()
  startTrading()
})

