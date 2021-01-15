import axios from 'axios'
import {IAction} from '.'
import {IStore} from '../api/server-store'

export const initialState: IStore = {
  balance: {},
  pairs: {},
  ticks: [],
  closedTransactions: {},
  assetPairs: {},
  tradeVars: {},
  toSell: {},
  storeLoaded: false,
  sold: {},
}

export const reducer = (state: IStore, action: IAction): IStore => {
  if (action.type === 'SET_BALANCE') {
    return {...state, balance: action.payload}
  }

  if (action.type === 'SET_PAIRS') {
    return {...state, pairs: action.payload}
  }

  if (action.type === 'ADD_TICK') {
    const newTicks = state.ticks
    if (newTicks.length > 100) {
      newTicks.splice(2, 30)
    }

    newTicks.push(action.payload)
    return {...state, ticks: newTicks}
  }

  if (action.type === 'SET_TICKS') {
    return {...state, ticks: action.payload}
  }

  if (action.type === 'SET_TRANSACTIONS') {
    return {...state, closedTransactions: action.payload}
  }

  if (action.type === 'SET_ASSETPAIRS') {
    return {...state, assetPairs: action.payload}
  }

  if (action.type === 'SET_TRADEVARS') {
    return {...state, tradeVars: action.payload}
  }

  if (action.type === 'SET_TOSELL') {
    return {...state, toSell: action.payload}
  }

  return state
}

export const fetchPairs = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/pairs').then((results) => {
    dispatch({type: 'SET_PAIRS', payload: results.data})
  })
export const fetchBalance = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/balance').then((results) => {
    dispatch({type: 'SET_BALANCE', payload: results.data})
  })

export const fetchTick = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/tick').then((results) => {
    dispatch({type: 'ADD_TICK', payload: results.data})
  })
export const fetchTicks = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/ticks').then((results) => {
    dispatch({type: 'SET_TICKS', payload: results.data})
  })
export const fetchTransactions = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/transactions').then((results) => {
    dispatch({type: 'SET_TRANSACTIONS', payload: results.data})
  })
export const fetchAssetPairs = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/assetPairs').then((results) => {
    dispatch({type: 'SET_ASSETPAIRS', payload: results.data})
  })
export const fetchTradeVars = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/tradeVars').then((results) => {
    dispatch({type: 'SET_TRADEVARS', payload: results.data})
  })

export const fetchToSell = async (dispatch: React.Dispatch<IAction>) =>
  axios.get('/toSell').then((results) => {
    dispatch({type: 'SET_TOSELL', payload: results.data})
  })
