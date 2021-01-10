import BigNumber from 'bignumber.js'
import moment from 'moment'
jest.mock('../api/serverStore', () => ({ store: {} }))

jest.mock('../api/makeSellOfferInKraken', () => ({ makeSellOfferInKraken: jest.fn() }))
jest.mock('../api/makeBuyOfferInKraken', () => ({ makeBuyOfferInKraken: jest.fn(() => console.log('XXX{A')) }))

import { store } from '../api/serverStore'
import { processData } from './processData'
import { trade } from './trade'
import { makeSellOfferInKraken } from '../api/makeSellOfferInKraken'
import { makeBuyOfferInKraken } from '../api/makeBuyOfferInKraken'
const delay = (time = 0) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true)
    }, time),
  )
beforeEach(() => {
  // @ts-ignore
  makeSellOfferInKraken.mockClear()

  // @ts-ignore
  makeBuyOfferInKraken.mockClear()

  // @ts-ignore
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
        lastTrasnactionPrice: new BigNumber('1'),
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
            c: ['1'],
            a: ['1'],
            b: ['1'], //lower than a
          },
        },
      },
    ],
    pairs: {
      XXBTZUSD: {
        changeToTrend: new BigNumber('1'),
        changeToChangeTrend: new BigNumber('1'),
        persuadeToBalance: 1,
        volume: new BigNumber('0.001'), // min 0.001
        active: true,
        coin0: 'XXBT',
        coin1: 'ZUSD',
        profit: new BigNumber(0),
        buyPerHour: 1, // limit if allready not sold buys are present
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
    value: new BigNumber('2'),
    id: 'xxx',
    timestamp: 1,
  })
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.noAssetsToSell).toBeTruthy()

  store.toSell.XXBTZUSD.push({
    value: new BigNumber('0.5'),
    id: 'xxy',
    timestamp: 1,
  })
  trade(pair)
  expect(store.tradeVars.XXBTZUSD.noAssetsToSell).toBeFalsy()

  // console.log(JSON.stringify(store, null, 2))
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
    value: new BigNumber('0.5'),
    id: 'xxy',
    timestamp: moment().unix(),
  })
  trade(pair)
  expect(store.tradeVars[pair].limitBuyPerHourReached).toBeTruthy()
})

test('lets buy some shieeet', async () => {
  // jest.useFakeTimers()

  store.balance[store.pairs[pair].coin1] = '10'
  store.tradeVars[pair] = {
    ...store.tradeVars[pair],
    buy: false,
    sell: false,
    lastTransactions: [],
    highest: new BigNumber(0),
    lowest: new BigNumber(999),
  }
  trade(pair)
  expect(store.tradeVars[pair].buy).toBeFalsy()
  expect(store.tradeVars[pair].sell).toBeFalsy()

  store.tradeVars[pair].lastTrasnactionPrice = new BigNumber('1.1')
  trade(pair)
  await delay(1)

  expect(store.tradeVars[pair].buy).toBeTruthy()

  expect(makeBuyOfferInKraken).toBeCalledTimes(0) // we create new low, now lets get back to - risk factor

  store.ticks.push({
    pairs: {
      // @ts-ignore
      [pair]: {
        a: ['1.05'],
        b: ['1.05'],
        c: ['1.05'],
      },
    },
  })
  // @ts-ignore
  makeBuyOfferInKraken = jest.fn(() => Promise.resolve({ data: { error: [], result: { txid: ['XXX-XXX-XXX'] } } }))

  trade(pair)
  await delay(1)
  expect(makeBuyOfferInKraken).toBeCalledTimes(1)
  expect(store.tradeVars[pair].lastTransactionId).toBe('XXX-XXX-XXX')

  //console.log(JSON.stringify(store.tradeVars, null, 2))
})
