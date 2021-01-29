import axios from 'axios'
import {
  IAssetPairs,
  IBalances,
  IClosedTransactionsGroupped,
  ISoldPaired,
  ITick,
  IToSellPaired,
  ITradeVarsPaired,
} from '../api/server-store'
import {createStore, State, action, Action, thunk, Thunk, createTypedHooks, computed, Computed} from 'easy-peasy'
import {Pair} from '../db/entity/pair'

export interface IStore {
  tradeVars: ITradeVarsPaired
  assetPairs: IAssetPairs
  balance: IBalances
  toSell: IToSellPaired
  pairs: Pair[]
  ticks: ITick[]
  closedTransactions: IClosedTransactionsGroupped
  sold: ISoldPaired
  setPairs: Action<IStore, Pair[]>
  fetchPairs: Thunk<IStore, Pair[]>
  getPair: Computed<IStore, (pair: string) => Pair | undefined>
}

export const store = createStore<IStore>({
  balance: {},
  pairs: [],
  ticks: [],
  closedTransactions: {},
  assetPairs: {},
  tradeVars: {},
  toSell: {},
  sold: {},
  setPairs: action((state, payload) => {
    state.pairs = payload
  }),
  fetchPairs: thunk(async (actions, payload) => {
    const result = await axios.get('/pairs')
    actions.setPairs(result.data)
  }),
  getPair: computed((state) => (pair) => state.pairs.find((p) => p.name === pair)),
  // FetchBalance: thunk(async (actions, payload) => {
  //   const result = await axios.get('/balance')
  // }),

  // fetchTick: thunk(async (actions, payload) => {
  //   const result = await axios.get('/tick')
  // }),
  // fetchTicks: thunk(async (actions, payload) => {
  //   const result = await axios.get('/ticks')
  // }),
  // fetchTransactions: thunk(async (actions, payload) => {
  //   const result = await axios.get('/transactions')
  // }),
  // fetchAssetPairs: thunk(async (actions, payload) => {
  //   const result = await axios.get('/assetPairs')
  // }),
  // fetchTradeVars: thunk(async (actions, payload) => {
  //   const result = await axios.get('/tradeVars')
  // }),

  // fetchToSell: thunk(async (actions, payload) => {
  //   const result = await axios.get('/toSell')
  // }),
})

const typedHooks = createTypedHooks<IStore>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState
