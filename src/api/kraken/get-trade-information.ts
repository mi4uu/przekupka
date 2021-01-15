import axios from 'axios'
import BigNumber from 'bignumber.js'
import {bn} from '../../utils/bn'
import {store} from '../server-store'

export const getTradeInformation = () => {
  let firstRun = !store.storeLoaded // Fetch if store is not loaded form file

  if (firstRun) {
    firstRun = false
    axios
      .get('https://api.kraken.com/0/public/AssetPairs')
      .then((result) => {
        store.assetPairs = result.data.result
        Object.entries(store.closedTransactions)
          .filter(([_k, t]) => t.status === 'closed' && t.descr.type === 'buy')
          .forEach(([k, t]) => {
            const pair = t.descr.pair
            const price = t.price
            const altName = Object.entries(store.assetPairs)

              .filter(([_k, v]) => v.altname === pair)

              .map(([k, _v]) => k)[0]

            console.log(`altname for ${pair} is ${altName}`)
            if (!store.toSell[pair]) store.toSell[pair] = []
            if (altName && !store.toSell[altName]) store.toSell[pair] = []
            store.toSell[pair].push({
              value: price,
              timestamp: t.opentm,
              id: k,
              diff: '0S',
            })
            if (altName) {
              if (!store.toSell[altName]) store.toSell[altName] = []
              store.toSell[altName].push({
                value: price,
                timestamp: t.opentm,
                id: k,
                diff: '0',
              })
            }
          })
        // Remove sold
        Object.entries(store.closedTransactions)
          .filter(([_k, t]) => t.status === 'closed' && t.descr.type === 'sell')
          .forEach(([_k, t]) => {
            const pair = t.descr.pair
            const price = t.price
            // Stupid kraken
            const altName = Object.entries(store.assetPairs)

              .filter(([_k, v]) => v.altname === pair)

              .map(([k, _v]) => k)[0]
            if (store.toSell[pair]) {
              const sold = store.toSell[pair]
                .sort((a, b) => bn(b.value).minus(a.value).toNumber())
                .find((p) => bn(p.value).isLessThan(new BigNumber(price)))
              if (sold) {
                const pairName = store.pairs[pair] ? pair : altName
                store.toSell[pair] = store.toSell[pair].filter((p) => p.id !== sold.id)

                const cost = bn(t.cost).minus(bn(t.fee).multipliedBy(2))
                const profit = cost.minus(bn(sold.value).multipliedBy(t.vol))

                if (profit.isGreaterThan(0))
                  console.log(`setting profit for ${pair}(${altName}, ${pairName}) to ${profit.toFixed(2)}`)
                //    Store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
              }
            }

            if (altName && store.toSell[altName]) {
              //           Const pairName = store.pairs[pair] ? pair : altName

              const sold = store.toSell[altName]
                .sort((a, b) => bn(b.value).minus(a.value).toNumber())
                .find((p) => bn(p.value).isLessThan(new BigNumber(price)))
              if (sold) {
                store.toSell[altName] = store.toSell[altName].filter((p) => p.id !== sold.id)

                const cost = new BigNumber(t.cost).minus(new BigNumber(t.fee).multipliedBy(2))
                const profit = cost.minus(new BigNumber(sold.value).multipliedBy(t.vol))
                if (profit.isGreaterThan(0)) console.log(`setting profit for ${altName} to ${profit.toFixed(2)}`)

                //         Store.pairs[pairName].profit = store.pairs[pairName].profit .plus(profit)
              }
            }
          })
      })
      .catch((error) => {
        console.log('there was error getting closed orders:')
        console.log(error)
      })
  }
}
