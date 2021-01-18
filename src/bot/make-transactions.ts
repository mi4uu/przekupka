import moment from 'moment'
import {store, IToSell} from '../api/server-store'
import {bn} from '../utils/bn'
import {calculatePercentage} from './calculate-percentage'

export const makeTransactions = (pair: string) => {
  const transaction = store.closedTransactions[store.tradeVars[pair].lastTransactionId]
  const lastStatus = transaction?.status
  if (lastStatus === 'closed') {
    const price = transaction.price
    const lastTransactionPrice = store.tradeVars[pair].lastTransactionPrice
      ? bn(store.tradeVars[pair].lastTransactionPrice!)
      : bn(0)

    // Reset counters so we can start trading again
    store.tradeVars[pair].highest = price
    store.tradeVars[pair].lowest = price
    store.tradeVars[pair].buy = false
    store.tradeVars[pair].sell = false
    store.tradeVars[pair].wait = 0
    store.tradeVars[pair].lastTransactionPrice = price

    // Tis is for persuade to balance param in trading. not sure if I will keep it
    if (store.tradeVars[pair].lastTransactions.length >= 2) store.tradeVars[pair].lastTransactions.shift()
    store.tradeVars[pair].lastTransactions.push(transaction.type[0] as 's' | 'b')

    if (transaction.type === 'sell') {
      // Lets find pair for our transaction (one with the highest price)
      const sold: IToSell = store.toSell[pair]
        .filter((ts: IToSell) => bn(ts.value).isLessThanOrEqualTo(bn(price)))
        .sort((a: IToSell, b: IToSell) => bn(b.value).minus(bn(a.value)).toNumber())[0]

      // We need proper transaction as a pair
      const soldTransaction = store.closedTransactions[sold.id]

      // It amount on pairs is different, we will take less (it is only to calculate profit)
      const amount =
        Number.parseFloat(soldTransaction.vol) > Number.parseFloat(transaction.vol)
          ? transaction.vol
          : soldTransaction.vol

      const transactionSoldPrice = bn(amount).multipliedBy(bn(transaction.price)).minus(bn(transaction.fee))
      const transactionBuyPrice = bn(amount).multipliedBy(bn(soldTransaction.price)).minus(bn(soldTransaction.fee))
      const profit = transactionSoldPrice.minus(transactionBuyPrice)

      // Save info about sold transaction
      // FIXME: I need to be handled in ui, this data is not used now
      if (!store.sold[pair]) store.sold[pair] = []
      store.sold[pair].push({
        transactionBuyId: store.tradeVars[pair].lastTransactionId,
        transactionSellId: sold.id,
        profit: profit.toFixed(8),
        diff: calculatePercentage(bn(soldTransaction.price), bn(transaction.price)).abs().toFixed(2),
      })

      // Just to have something to read in logs
      console.log(
        JSON.stringify({
          amount,
          stv: soldTransaction.vol,
          tv: transaction.vol,
          tfee: transaction.fee,
          stfee: soldTransaction.fee,
          transactionBuyPrice,
          transactionSoldPrice,
          profit,
          pair,
          transactionBuyId: sold.id,
          transactionSellId: store.tradeVars[pair].lastTransactionId,
        }),
      )

      // Remove sold transaction
      store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

      // It happened before to be empty string, just in case
      if (bn(store.pairs[pair].profit).isNaN()) {
        store.pairs[pair].profit = '0'
      }

      // Store profit
      store.pairs[pair].profit = store.pairs[pair].profit
        ? bn(store.pairs[pair].profit).plus(profit).toFixed(8)
        : profit.toFixed(8)
    } else {
      // Kraken specyfic extra magic
      // FIXME: need to be taken care off
      const altName = Object.entries(store.assetPairs)
        .filter(([_k, v]) => v.altname === pair)
        .map(([k, _v]) => k)[0]

      // Something to read in logs
      console.log('buy ' + pair)
      console.log(
        JSON.stringify(
          {
            value: price,
            id: store.tradeVars[pair].lastTransactionId,
            timestamp: moment().unix(),
            diff: calculatePercentage(lastTransactionPrice, price).abs().toFixed(2),
            price,
            lastTransactionPrice,
          },
          null,
          2,
        ),
      )

      // Add transaction to be sold in future
      store.toSell[pair].push({
        value: price,
        id: store.tradeVars[pair].lastTransactionId,
        timestamp: moment().unix(),
        diff: calculatePercentage(lastTransactionPrice, price).abs().toFixed(2),
      })
      if (altName && altName !== pair)
        store.toSell[altName].push({
          value: price,
          id: store.tradeVars[pair].lastTransactionId,
          timestamp: moment().unix(),
          diff: calculatePercentage(lastTransactionPrice, price).abs().toFixed(2),
        })
    }
  } else {
    console.log({lastStatus, transaction: JSON.stringify(transaction)})
  }

  if (lastStatus === 'expired') {
    store.tradeVars[pair].wait = 0
  }

  if (!lastStatus) {
    console.log(store.tradeVars[pair].lastTransactionId + ' not found, I dont expect to found it anymore')
    console.log('lets get back to trading')
    store.tradeVars[pair].wait = 0
  }
}
