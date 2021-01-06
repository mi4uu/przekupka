import axios from 'axios'

export const initialState:IState = {
  balance:{},
  pairs:{},
  ticks:[],
  closedTransactions:[],
  assetPairs:{},
  tradeVars:{}
}

export const reducer=(state:IState,action:IAction):IState=>{
  if(action.type==='SET_BALANCE'){
    return {...state, balance:action.payload}
  }
  if(action.type==='SET_PAIRS'){
    return {...state, pairs:action.payload}
  }
  if(action.type==='ADD_TICK'){
    const newTicks = state.ticks
    if(newTicks.length>100)
      newTicks.shift()
    newTicks.push(action.payload)
    return {...state, ticks:newTicks}
  }
  if(action.type==='SET_TICKS'){
    return {...state, ticks:action.payload}
  }
  if(action.type==='SET_TRANSACTIONS'){
    return {...state, closedTransactions:action.payload}
  }
  if(action.type==='SET_ASSETPAIRS'){
    return {...state, assetPairs:action.payload}
  }
  if(action.type==='SET_TRADEVARS'){
    return {...state, tradeVars:action.payload}
  }
  return state
}


export const fetchPairs = (dispatch:React.Dispatch<IAction>)=>axios.get('/pairs').then(results=> dispatch({type:'SET_PAIRS', payload:results.data}) )
export const fetchBalance = (dispatch:React.Dispatch<IAction>)=>axios.get('/balance').then(results=> dispatch({type:'SET_BALANCE', payload:results.data}) )

export const fetchTick = (dispatch:React.Dispatch<IAction>)=>axios.get('/tick').then(results=> dispatch({type:'ADD_TICK', payload:results.data}) )
export const fetchTicks = (dispatch:React.Dispatch<IAction>)=>axios.get('/ticks').then(results=> dispatch({type:'SET_TICKS', payload:results.data}) )
export const fetchTransactions = (dispatch:React.Dispatch<IAction>)=>axios.get('/transactions').then(results=> dispatch({type:'SET_TRANSACTIONS', payload:results.data}) )
export const fetchAssetPairs = (dispatch:React.Dispatch<IAction>)=>axios.get('/assetPairs').then(results=> dispatch({type:'SET_ASSETPAIRS', payload:results.data}) )
export const fetchTradeVars = (dispatch:React.Dispatch<IAction>)=>axios.get('/tradeVars').then(results=> dispatch({type:'SET_TRADEVARS', payload:results.data}) )