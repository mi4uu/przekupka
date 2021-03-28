require('module-alias/register')
import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import fetchData from './api/fetch-data'
import auth from './auth'
import request from 'request'
const lastLogs: string[] = []
const cl = console.log
console.log = (...args) => {
  cl(...args)
  lastLogs.push(args.map((c) => (typeof c === 'object' ? JSON.stringify(c) : c)).join(''))
  if (lastLogs.length > 100) lastLogs.splice(1)
}

process.on('uncaughtException', (error) => {
  console.log('##########################################################################################')
  console.log(error)
  console.log('##########################################################################################')
})

const dev = process.env.NODE_ENV !== 'production'

import {store} from './api/server-store'
import {Pair} from './db/entity/pair'
import {connect} from './db/db'
import {getRepository, MoreThan as moreThan} from 'typeorm'
import {bn} from '#utils/bn'
import {ToSell} from '#db/entity/to-sell'
import {calculatePercentage} from '#bot/calculate-percentage'
import api from '#api/api'
import BigNumber from 'bignumber.js'
import {ClosedTransaction} from './db/entity/closed-transactions'
import moment from 'moment'
import {buyFn, sellFn} from '#bot/trade'

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
  if (store.ticks.length === 0) return false
  const buy: string[] = []
  const sell: string[] = []
  Object.entries(store.tradeVars).forEach(([p, v]) => {
    if (v.buy) buy.push(p)
    if (v.sell) sell.push(p)
  })

  const profit = {
    BTC: bn('0'),
    USD: bn('0'),
    BNB: bn('0'),
  }
  const pairsWithProfit = (await Pair.find({profit: moreThan('0.0')})).filter((p) => Number.parseFloat(p.profit) > 0)
  pairsWithProfit.forEach((pair) => {
    if (pair.coin1 === 'BTC' || pair.coin1 === 'BNB') profit[pair.coin1] = profit[pair.coin1].plus(pair.profit)
    else profit.USD = profit.USD.plus(pair.profit)
  })
  const profitBTCinUSD = bn(profit.BTC).multipliedBy(store.ticks[store.ticks.length - 1].pairs[`BTC${api.baseCoin}`].c)
  const profitBNBinUSD = bn(profit.BNB).multipliedBy(store.ticks[store.ticks.length - 1].pairs[`BNB${api.baseCoin}`].c)
  const toSellPositions = await ToSell.find({filled: false})
  const profitSUM = profit.USD.plus(profitBTCinUSD).plus(profitBNBinUSD)
  const toSell = await Promise.all(
    toSellPositions.map(async (p) => {
      const pair = await p.pair
      const price = bn(store.ticks[store.ticks.length - 1].pairs[pair.name].b)
      const priceUSD =
        pair.coin1 === api.baseCoin ? '1' : store.ticks[store.ticks.length - 1].pairs[`${pair.coin1}${api.baseCoin}`].c
      return {
        id: p.id,
        left: p.left,
        balance: store.balance[pair.coin0],
        pair: pair.name,
        isSelling: sell.includes(pair.name),
        price: p.price,
        currentPrice: price.toFixed(8),
        diffInPrice: bn(price).minus(p.price).toFixed(8),
        diffInPricePercent: calculatePercentage(price, p.price).toFixed(2),
        diffInPriceUSD: bn(price).minus(p.price).multipliedBy(priceUSD).toFixed(2),
        profitInUSD: bn(price).minus(p.price).multipliedBy(p.left).multipliedBy(priceUSD).toFixed(2),
        worthInUSD: bn(price).multipliedBy(p.left).multipliedBy(priceUSD).toFixed(2),
        canBeSold: api.isTransactionValid(pair, p.left, price),
        sellUpdate: p.sellUpdate,
        buyUpdate: p.buyUpdate,
        strategy: p.strategy,
        safeBuy: p.safeBuy,
      }
    }),
  )
  const timeFrom00 = moment(moment().format('YYYY-MM-DD 00:00')).unix()
  const timeFrom24h = moment().subtract(24, 'hours').unix()
  const transactions24: ClosedTransaction[] = await getRepository(ClosedTransaction)
    .createQueryBuilder('ct')
    .where('ct.opentm >= :timeFrom AND ct.type=:type', {
      timeFrom: timeFrom24h,
      type: 'sell',
    })
    .getMany()

  const t24 = await Promise.all(
    transactions24.map(async (t) => {
      const pair = await t.pair
      const priceUSD =
        pair.coin1 === api.baseCoin ? '1' : store.ticks[store.ticks.length - 1].pairs[`${pair.coin1}${api.baseCoin}`].c

      return {
        profit: bn(t.profit).multipliedBy(priceUSD).toNumber(),
        pair,
        transaction: t,
      }
    }),
  )
  const t00 = t24.filter((t) => t.transaction.opentm > timeFrom00)
  const getMinus = (a) => a.filter((aa) => aa.profit < 0)
  const getPlus = (a) => a.filter((aa) => aa.profit > 0)
  const sumItUp = (a) => a.map((aa) => aa.profit).reduce((x, y) => x + y, 0)
  const last24minus = sumItUp(getMinus(t24))
  const last24plus = sumItUp(getPlus(t24))
  const last00minus = sumItUp(getMinus(t00))
  const last00plus = sumItUp(getPlus(t00))

  // Response.send(
  //   await Promise.all(
  //     transactions.map(async (t) => ({
  //       id: t.id,
  //       timestamp: t.opentm,
  //       fee: t.fee,
  //       volume: t.vol,
  //       price: t.price,
  //       type: t.type,
  //       profit: t.profit,
  //       pair: await t.pair,
  //     })),
  //   ),
  // )

  return {
    lastLogs,
    profits: {
      last24minus,
      last24plus,
      last00minus,
      last00plus,
    },

    buying: buy.length,
    selling: sell.length,
    toSellCount: toSellPositions.length,
    toSellWorth: toSell
      .map((ts) => bn(ts.worthInUSD))
      .reduce((a, b): BigNumber => a.plus(b), bn('0'))
      .toFixed(2),

    profitUSD: profit.USD.toFixed(2) + ' $',
    profitBTC: profit.BTC.toFixed(8) + ' BTC = ' + profitBTCinUSD.toFixed(2) + ' $',
    profitBNB: profit.BNB.toFixed(8) + ' BNB = ' + profitBNBinUSD.toFixed(2) + ' $',
    profitSUM: profitSUM.toFixed(2) + ' $',
    balanceUSD: store.balance[api.baseCoin] + '$',
    balanceBTC:
      store.balance.BTC +
      'BTC = ' +
      bn(store.balance.BTC)
        .multipliedBy(store.ticks[store.ticks.length - 1].pairs[`BTC${api.baseCoin}`].c)
        .toFixed(2) +
      ' $',
    balanceBNB:
      store.balance.BNB +
      'BNB = ' +
      bn(store.balance.BNB)
        .multipliedBy(store.ticks[store.ticks.length - 1].pairs[`BNB${api.baseCoin}`].c)
        .toFixed(2) +
      ' $',
    buyingPairs: buy,
    sellingPairs: sell,

    toSell: toSell
      .sort((a, b) => bn(a.diffInPricePercent).minus(b.diffInPricePercent).toNumber())
      .sort((a, b) => (a.canBeSold ? -1 : 1)),
  }
}

server.get('/toSellNotIncluded', async (_request: Request, response: Response) => {
  const toSellPositions = await ToSell.find({filled: false})
  const toSell = await Promise.all(
    toSellPositions.map(async (p) => {
      const pair = await p.pair
      return pair.coin0
    }),
  )
  const b: string[] = Object.keys(store.balance)
    .filter((ba) => bn(store.balance[ba]).isGreaterThan('0.0001'))
    .filter((ba) => !toSell.includes(ba))
  const result = b.map(async (b_) => {
    const pairName = `${b_}BTC`
    const pair = await Pair.findOne(pairName)
    if (!pair) return {pairName}
    const price = store.ticks[store.ticks.length - 1].pairs[pairName]?.b
    const canBeSold = api.isTransactionValid(pair, store.balance[b_], price)

    return {
      name: b_,
      balance: store.balance[b_],
      canBeSold,
    }
  })
  response.send((await Promise.all(result)).filter((a) => a.canBeSold))
})

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
  response.send({...store, ticks: [store.ticks[store.ticks.length - 1]]})
})
server.get('/ticks', (_request: Request, response: Response) => {
  response.send(store.ticks)
})

server.post('/buy', async (request: Request, response: Response) => {
  const {pair}: {pair: string} = request.body
  console.log('BUY signal received for', pair)

  const {howMuchToSell, lowestBuy} = await getRepository(ToSell)
    .createQueryBuilder('t')
    .where('t.pairName = :pair AND t.filled = :filled ', {
      pair,
      filled: false,
    })
    .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
    .addSelect('COALESCE(MIN(t.price),0)', 'lowestBuy')
    .getRawOne()
  console.log('SAFETY BUY', pair, 'volume:', howMuchToSell)
  const r = await buyFn(pair, bn('1'), howMuchToSell, store.tradeVars[pair], 'Manual safety buy')
  if (r) response.send('ok')
  else {
    response.status(500)
    response.send('error, last logs:\n\n' + [...lastLogs].splice(-2).join('\n'))
  }
})
server.post('/sell', async (request: Request, response: Response) => {
  const {pair} = request.body
  console.log('SELL signal received for', pair)

  const {howMuchToSell, lowestBuy} = await getRepository(ToSell)
    .createQueryBuilder('t')
    .where('t.pairName = :pair AND t.filled = :filled ', {
      pair,
      filled: false,
    })
    .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
    .addSelect('COALESCE(MIN(t.price),0)', 'lowestBuy')
    .getRawOne()
  console.log('PANIC SELL', pair, 'volume:', howMuchToSell, 'was bought for:', lowestBuy)
  if (howMuchToSell && bn(howMuchToSell).isGreaterThan('0')) {
    const r = await sellFn(pair, bn('1'), howMuchToSell, store.tradeVars[pair])
    if (r) response.send('ok')
    else {
      response.status(500)
      response.send('error, last logs:\n\n' + [...lastLogs].splice(-2).join('\n'))
    }
  } else console.log('nothing to sell')
})

server.get('/transactions', async (_request: Request, response: Response) => {
  const transactions: ClosedTransaction[] = await getRepository(ClosedTransaction)
    .createQueryBuilder('ct')
    .orderBy('ct.opentm', 'DESC')
    .limit(25)
    .getMany()
  response.send(
    await Promise.all(
      transactions.map(async (t) => ({
        id: t.id,
        timestamp: t.opentm,
        fee: t.fee,
        volume: t.vol,
        price: t.price,
        type: t.type,
        profit: t.profit,
        pair: await t.pair,
        strategy: t.strategy,
        timeToSell: t.timeToSell,
        diff: t.diff,
      })),
    ),
  )
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
