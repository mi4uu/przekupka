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
import {calculatePercentage} from '#bot/calculate-percentage'
import api from '#api/api'

const args = process.argv.slice(2)
const port = args[0] ? Number.parseInt(args[0], 10) : 3000
function syntaxHighlight(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return json.replace(
    /("(\\u[a-zA-Z\d]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'number'
      if (match.startsWith('"')) {
        cls = match.endsWith(':') ? 'key' : 'string'
      } else if (/true|false/.test(match)) {
        cls = 'boolean'
      } else if (match.includes('null')) {
        cls = 'null'
      }

      return '<span class="' + cls + '">' + match + '</span>'
    },
  )
}

// App.prepare().then(() => {
const server = express()
server.use(auth)

server.use(bodyParser.json())
const getStatus = async () => {
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
  }
  const pairsWithProfit = (await Pair.find({profit: moreThan('0.0')})).filter((p) => Number.parseFloat(p.profit) > 0)
  pairsWithProfit.forEach((pair) => {
    if (pair.coin1 === 'BTC' || pair.coin1 === 'ETH') profit[pair.coin1] = profit[pair.coin1].plus(pair.profit)
    else profit.USD = profit.USD.plus(pair.profit)
  })
  const profitBTCinUSD = bn(profit.BTC).multipliedBy(store.ticks[store.ticks.length - 1].pairs[`BTC${api.baseCoin}`].c)
  const profitETHinUSD = bn(profit.BTC).multipliedBy(store.ticks[store.ticks.length - 1].pairs[`ETH${api.baseCoin}`].c)
  const toSellPositions = await ToSell.find({filled: false})
  const profitSUM = profit.USD.plus(profitBTCinUSD).plus(profitETHinUSD)
  return {
    buying: buy.length,
    selling: sell.length,
    toSellCount: toSellPositions.length,

    profitUSD: profit.USD.toFixed(2) + ' $',
    profitBTC: profit.BTC.toFixed(8) + ' BTC = ' + profitBTCinUSD.toFixed(2) + ' $',
    profitETH: profit.ETH.toFixed(8) + ' ETH = ' + profitETHinUSD.toFixed(2) + ' $',
    profitSUM: profitSUM.toFixed(2) + ' $',
    balanceUSD: store.balance[api.baseCoin] + '$',
    balanceBTC:
      store.balance.BTC +
      'BTC = ' +
      bn(store.balance.BTC)
        .multipliedBy(store.ticks[store.ticks.length - 1].pairs[`BTC${api.baseCoin}`].c)
        .toFixed(2) +
      ' $',
    balanceETH:
      store.balance.ETH +
      'ETH = ' +
      bn(store.balance.ETH)
        .multipliedBy(store.ticks[store.ticks.length - 1].pairs[`ETH${api.baseCoin}`].c)
        .toFixed(2) +
      ' $',
    buyingPairs: buy,
    sellingPairs: sell,

    toSell: (
      await Promise.all(
        toSellPositions.map(async (p) => {
          const pair = await p.pair
          const price = bn(store.ticks[store.ticks.length - 1].pairs[pair.name].b)
          const priceUSD =
            pair.coin1 === api.baseCoin
              ? '1'
              : store.ticks[store.ticks.length - 1].pairs[`${pair.coin1}${api.baseCoin}`].c
          return {
            left: p.left,
            balance: store.balance[pair.coin0],
            pair: pair.name,
            isSelling: sell.includes(pair.name),
            price: p.price,
            currentPrice: price.toFixed(8),
            diffInPrice: bn(price).minus(p.price).toFixed(8),
            diffInPricePercent: calculatePercentage(price, p.price).toFixed(2) + ' %',
            diffInPriceUSD: bn(price).minus(p.price).multipliedBy(priceUSD).toFixed(2),
            profitInUSD: bn(price).minus(p.price).multipliedBy(p.vol).multipliedBy(priceUSD).toFixed(2),
          }
        }),
      )
    ).sort((a, b) => bn(b.profitInUSD).minus(a.profitInUSD).toNumber()),
    profitablePairs: pairsWithProfit
      .map((p) => ({
        name: p.name,
        profit: p.profit,
        profitInUsd:
          p.coin1 === api.baseCoin
            ? p.profit
            : bn(p.profit)
                .multipliedBy(store.ticks[store.ticks.length - 1].pairs[`${p.coin1}${api.baseCoin}`].c)
                .toFixed(4),
      }))
      .sort((a, b) => bn(b.profitInUsd).minus(a.profitInUsd).toNumber()),
  }
}

server.get('/status', async (_request: Request, response: Response) => {
  response.send(await getStatus())
})
server.get('/statusp', async (_request: Request, response: Response) => {
  const r = await getStatus()
  const style = `<style>pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
  .string { color: green; }
  .number { color: darkorange; }
  .boolean { color: blue; }
  .null { color: magenta; }
  .key { color: red; }
  </style>`
  const content = syntaxHighlight(JSON.stringify(r, null, 4))

  response.send(`<html><head>${style}</head><body><pre>${content}</pre></body></html>`)
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
