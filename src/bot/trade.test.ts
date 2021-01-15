import moment from 'moment'
jest.mock('../api/server-store', () => ({store: {}}))

jest.mock('../api/make-sell-offer-in-kraken', () => ({makeSellOfferInKraken: jest.fn()}))
jest.mock('../api/make-buy-offer-in-kraken', () => ({
  makeBuyOfferInKraken: jest.fn(() => {
    console.log('XXX{A')
  }),
}))

import {store} from '../api/server-store'
import {processData} from './process-data'
import {trade} from './trade'
import {makeSellOfferInKraken} from '../api/make-sell-offer-in-kraken'
import {makeBuyOfferInKraken} from '../api/make-buy-offer-in-kraken'
const delay = async (time = 0) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true)
    }, time),
  )
beforeEach(() => {
  // @ts-expect-error
  makeSellOfferInKraken.mockClear()

  // @ts-expect-error
  makeBuyOfferInKraken.mockClear()

  // @ts-expect-error
  store = {
    tradeBalance: {
      eb: '',
      tb: '',
      m: '',
      n: '',
      c: '',
      v: '',
      e: '',
      mf: '',
      ml: '',
    },
    tradeVars: {
      XXBTZUSD: {
        lastTrasnactionPrice: '1',
        lastTransactions: [],
      },
    },
    assetPairs: {
      XXBTZUSD: {
        pair_decimals: 8,
      },
    },
    balance: {},
    closedTransactions: {},
    ticks: [
      {
        pairs: {
          XXBTZUSD: {
            c: '1',
            a: '1',
            b: '1', // Lower than a
          },
        },
      },
    ],
    pairs: {
      XXBTZUSD: {
        changeToTrend: '1',
        changeToChangeTrend: '1',
        persuadeToBalance: 1,
        volume: '0.001', // Min 0.001
        active: true,
        coin0: 'XXBT',
        coin1: 'ZUSD',
        profit: '0',
        buyPerHour: 1, // Limit if allready not sold buys are present
      },
    },
    toSell: {
      XXBTZUSD: [],
    },
  }
})
const pair = 'XXBTZUSD'
test('no asset to sell', () => {
  expect(store.tradeVars.XXBTZUSD.noAssetsToSell).toBeFalsy()
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.noAssetsToSell).toBeTruthy()

  store.toSell.XXBTZUSD.push({
    value: '2',
    id: 'xxx',
    timestamp: 1,
    diff: '0',
  })
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.noAssetsToSell).toBeTruthy()

  store.toSell.XXBTZUSD.push({
    value: '0.5',
    id: 'xxy',
    timestamp: 1,
    diff: '0',
  })
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.noAssetsToSell).toBeFalsy()

  // Console.log(JSON.stringify(store, null, 2))
})
test('cannot afford to buy', () => {
  expect(store.tradeVars.XXBTZUSD.cantAffordToBuy).toBeFalsy()
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.cantAffordToBuy).toBeTruthy()

  store.balance[store.pairs[pair].coin1] = '10'
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.cantAffordToBuy).toBeFalsy()
  store.balance[store.pairs[pair].coin1] = '0.0011'
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.cantAffordToBuy).toBeFalsy()
  store.balance[store.pairs[pair].coin1] = '0.0010'
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.cantAffordToBuy).toBeTruthy()
})

test('limit buy per hour', () => {
  expect(store.tradeVars[pair].limitBuyPerHourReached).toBeFalsy()
  store.balance[store.pairs[pair].coin1] = '10'
  trade(pair)
  expect(store.tradeVars[pair].limitBuyPerHourReached).toBeFalsy()

  store.toSell.XXBTZUSD.push({
    value: '0.5',
    id: 'xxy',
    timestamp: moment().unix(),
    diff: '0',
  })
  trade(pair)
  expect(store.tradeVars[pair].limitBuyPerHourReached).toBeTruthy()
})

test('lets buy some shieeet', async () => {
  // Jest.useFakeTimers()
  store.balance[store.pairs[pair].coin1] = '10'
  store.tradeVars[pair] = {
    ...store.tradeVars[pair],
    buy: false,
    sell: false,
    lastTransactions: [],
    highest: '0',
    lowest: '999',
  }
  trade(pair)
  expect(store.tradeVars[pair].buy).toBeFalsy()
  expect(store.tradeVars[pair].sell).toBeFalsy()

  store.tradeVars[pair].lastTransactionPrice = '1.1'

  trade(pair)
  await delay(1)
  expect(store.tradeVars[pair].buy).toBeTruthy()
  expect(makeBuyOfferInKraken).toBeCalledTimes(0) // We create new low, now lets get back to - risk factor

  // lets reduce price from 1.1 a bit to triger buying
  store.ticks.push({
    timestamp: 1,
    pairs: {
      [pair]: {
        a: '1.06',
        b: '1.05',
        c: '1.04',
      },
    },
  })
  // @ts-expect-error
  makeBuyOfferInKraken = jest.fn(async () => Promise.resolve({data: {error: [], result: {txid: ['XXX-XXX-XXX']}}}))

  trade(pair)
  await delay(1)
  console.log(JSON.stringify(store.tradeVars, null, 2))

  expect(makeBuyOfferInKraken).toBeCalledTimes(1)
  expect(store.tradeVars[pair].lastTransactionId).toBe('XXX-XXX-XXX')

  // Console.log(JSON.stringify(store.tradeVars, null, 2))
})
