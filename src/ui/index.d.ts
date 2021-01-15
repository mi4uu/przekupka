import {
  closedTransactions,
  IAssetPairs,
  IClosedTransactionsGroupped,
  IPairs,
  ITick,
  IToSellPaired,
  ITradeVars,
  ITradeVarsPaired,
} from '../api/server-store'

type IAction =
  | {
      type: 'SET_BALANCE'
      payload: Record<string, string>
    }
  | {
      type: 'ADD_TICK'
      payload: ITick
    }
  | {
      type: 'SET_TICKS'
      payload: ITick[]
    }
  | {
      type: 'SET_PAIRS'
      payload: IPairs
    }
  | {
      type: 'SET_TRANSACTIONS'
      payload: IClosedTransactionsGroupped
    }
  | {
      type: 'SET_ASSETPAIRS'
      payload: IAssetPairs
    }
  | {
      type: 'SET_TOSELL'
      payload: IToSellPaired
    }
  | {
      type: 'SET_TRADEVARS'
      payload: ITradeVarsPaired
    }
