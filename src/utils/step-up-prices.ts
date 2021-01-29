import axios from 'axios'
import {Pair} from '#db/entity/pair'
import {createConnection, getRepository} from 'typeorm'
import {bn} from '#utils/bn'
import {ClosedTransaction} from '#db/entity/closed-transactions'
import {Tick} from '#db/entity/tick'
import moment from 'moment'
const COMMIT = true
const BTC2USD = bn('0.000030')
const ETH2USD = bn('0.00071')
const minSellPrice = {
  USD: bn('4'),
  BTC: BTC2USD.multipliedBy('4'),
  ETH: ETH2USD.multipliedBy('4'),
}
const oneSellPrice = {
  USD: bn('10'),
  BTC: BTC2USD.multipliedBy('10'),
  ETH: ETH2USD.multipliedBy('10'),
}
const twoSellPrice = {
  USD: bn('30'),
  BTC: BTC2USD.multipliedBy('30'),
  ETH: ETH2USD.multipliedBy('30'),
}
const moreSellPrice = {
  USD: bn('50'),
  BTC: BTC2USD.multipliedBy('50'),
  ETH: ETH2USD.multipliedBy('50'),
}

const stepUpPrices = async () => {
  await createConnection()
  const pairs = await Pair.find({active: true})
  const timeFrom = moment().subtract(5, 'days').unix()
  await Promise.all(
    pairs.map(async (pair) => {
      //    Console.log(pair.name)

      const {howMuchDidISell, price} = await getRepository(ClosedTransaction)
        .createQueryBuilder('t')
        .where('t.pairName = :pair AND t.type = :type  AND t.opentm > :timeFrom', {
          pair: pair.name,
          type: 'sell',
          timeFrom,
        })
        .select('SUM(t.vol)', 'howMuchDidISell')
        .addSelect('MAX(t.price)', 'price')
        .getRawOne()
      if (howMuchDidISell) {
        const soldTimes = bn(howMuchDidISell)
          .multipliedBy(price)
          .dividedBy(minSellPrice[pair.coin1 as 'USD' | 'BTC' | 'ETH'])
        console.log(`${pair.name} sold ${soldTimes.toFixed(1)} for price ${price}   . VOLUME was ${pair.volume}`)

        const newVolume = oneSellPrice[pair.coin1 as 'USD' | 'BTC' | 'ETH'].dividedBy(price)
        console.log(`setting new vol : ${newVolume.toFixed(8)}`)
        pair.volume = newVolume.toFixed(8)

        if (soldTimes.isGreaterThanOrEqualTo('1.2')) {
          const newVolume = twoSellPrice[pair.coin1 as 'USD' | 'BTC' | 'ETH'].dividedBy(price)
          console.log(`setting new vol : ${newVolume.toFixed(8)}`)
          pair.volume = newVolume.toFixed(8)
        }

        if (soldTimes.isGreaterThanOrEqualTo('2.4')) {
          const newVolume = moreSellPrice[pair.coin1 as 'USD' | 'BTC' | 'ETH'].dividedBy(price)
          console.log(`setting new vol : ${newVolume.toFixed(8)}`)
          pair.volume = newVolume.toFixed(8)
        }

        if (COMMIT) await pair.save()
      } else {
        const price = await Tick.find({pair})
        const newVolume = minSellPrice[pair.coin1 as 'USD' | 'BTC' | 'ETH'].dividedBy(price[price.length - 1].closed)

        if (bn(pair.step).isLessThan(newVolume)) {
          //    Console.log(`${pair.name}]  old vol : ${pair.volume} setting new vol : ${newVolume.toFixed(8)}`)
          pair.volume = newVolume.toFixed(8)
          try {
            if (COMMIT) await pair.save()
          } catch {
            console.log(`error saving ${pair.name} with vol ${newVolume.toFixed(8)}`)
            //   Console.log(error)
            pair.volume = pair.step
            pair.active = false
            await pair.save()
          }
        } else {
          console.log(`${pair.name}]  NOOOOPE!!!! old vol : ${pair.step} setting new vol : ${newVolume.toFixed(8)}`)
          pair.volume = pair.step
          await pair.save()
        }
      }
    }),
  )
}

stepUpPrices()
