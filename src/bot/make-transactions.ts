import moment from 'moment'
import {store, IToSell} from '../api/server-store'
import {bn} from '../utils/bn'
import {calculatePercentage} from './calculate-percentage'

export const makeTransactions = (pair: string) => {
  const transaction = store.closedTransactions[store.tradeVars[pair].lastTransactionId]
  const lastStatus = transaction?.status
  if (lastStatus === 'closed') {
    const price = transaction.price
    const oldLowest = store.tradeVars[pair].lowest
    store.tradeVars[pair].highest = price
    store.tradeVars[pair].lowest = price
    store.tradeVars[pair].buy = false
    store.tradeVars[pair].sell = false
    store.tradeVars[pair].wait = 0
    store.tradeVars[pair].lastTransactionPrice = price
    if (store.tradeVars[pair].lastTransactions.length >= 2) store.tradeVars[pair].lastTransactions.shift()
    store.tradeVars[pair].lastTransactions.push(transaction.descr.type[0] as 's' | 'b')

    if (transaction.descr.type === 'sell') {
      const sold: IToSell = store.toSell[pair]
        .filter((ts: IToSell) => bn(ts.value).isLessThanOrEqualTo(bn(price)))
        .sort((a: IToSell, b: IToSell) => bn(b.value).minus(bn(a.value)).toNumber())[0]
      const soldTransaction = store.closedTransactions[sold.id]
      const amount =
        Number.parseFloat(soldTransaction.vol) > Number.parseFloat(transaction.vol)
          ? transaction.vol
          : soldTransaction.vol
      const transactionSoldPrice = bn(amount).multipliedBy(bn(transaction.price)).minus(bn(transaction.fee))
      const transactionBuy = store.closedTransactions[sold.id]
      const transactionBuyPrice = bn(amount).multipliedBy(bn(transactionBuy.price)).minus(bn(transactionBuy.fee))

      const profit = transactionSoldPrice.minus(transactionBuyPrice)
      if (!store.sold[pair]) store.sold[pair] = []
      store.sold[pair].push({
        transactionBuyId: store.tradeVars[pair].lastTransactionId,
        transactionSellId: sold.id,
        profit: profit.toFixed(8),
        diff: calculatePercentage(bn(soldTransaction.price), bn(transaction.price)).abs().toFixed(2),
      })
      console.log(
        JSON.stringify({
          transactionBuyPrice,
          transactionSoldPrice,
          profit,
          pair,
          transactionBuyId: sold.id,
          transactionSellId: store.tradeVars[pair].lastTransactionId,
        }),
      )
      store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)
      if (bn(store.pairs[pair].profit).isNaN()) {
        store.pairs[pair].profit = '0'
      }

      store.pairs[pair].profit = store.pairs[pair].profit
        ? bn(store.pairs[pair].profit).plus(profit).toFixed(8)
        : profit.toFixed(8)
    } else {
      const altName = Object.entries(store.assetPairs)
        .filter(([_k, v]) => v.altname === pair)
        .map(([k, _v]) => k)[0]
      console.log('buy ' + pair)
      console.log(
        JSON.stringify(
          {
            value: price,
            id: store.tradeVars[pair].lastTransactionId,
            timestamp: moment().unix(),
            diff: calculatePercentage(oldLowest, price).abs().toFixed(2),
            price,
            oldLowest,
          },
          null,
          2,
        ),
      )
      store.toSell[pair].push({
        value: price,
        id: store.tradeVars[pair].lastTransactionId,
        timestamp: moment().unix(),
        diff: calculatePercentage(oldLowest, price).abs().toFixed(2),
      })
      if (altName && altName !== pair)
        store.toSell[altName].push({
          value: price,
          id: store.tradeVars[pair].lastTransactionId,
          timestamp: moment().unix(),
          diff: calculatePercentage(oldLowest, price).abs().toFixed(2),
        })
    }
  } else {
    console.log({lastStatus, transaction: JSON.stringify(transaction)})
  }

  if (lastStatus === 'expired') {
    store.tradeVars[pair].wait = 0
  }

  if (!lastStatus) {
    console.log(store.tradeVars[pair].lastTransactionId + ' not found, will wait longer')
  }
}
