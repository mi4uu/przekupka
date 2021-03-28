import {IBalances} from '#api/server-store'
import {ClosedTransaction} from '#db/entity/closed-transactions'
import {ToSell} from '#db/entity/to-sell'
import {bn} from '#utils/bn'
import {createConnection, getRepository} from 'typeorm'
import {checkBalance} from './check-balance'

const cleanUp = async () => {
  const connection = await createConnection()

  const balances: IBalances = await checkBalance()

  const closeThings = async () => {
    const toSell = await getRepository(ToSell).createQueryBuilder('toSell').orderBy('toSell.price', 'DESC').getMany()
    return Promise.all(
      toSell.map(async (ts) => {
        if (ts.filled || bn(ts.left).isZero()) {
          console.log(ts.id, 'removing')
          await ts.remove()
        }
      }),
    )
  }

  console.log('-----------------------------------------------------------')
  const fixThings = (coin1: string, coin2: string, coin3: string) =>
    Object.entries(balances).map(async ([coin0, b]) => {
      if (bn(b).isZero()) {
        const {howMuchToSell} = await getRepository(ToSell)
          .createQueryBuilder('t')
          .where('(t.pairName = :pair0  or t.pairName = :pair1  or t.pairName = :pair3) AND t.filled = :filled ', {
            pair0: coin0 + coin2,
            pair1: coin0 + coin1,
            pair3: coin0 + coin3,

            filled: false,
          })
          .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
          .getRawOne()
        if (bn(howMuchToSell).isGreaterThan('0')) {
          const tspos = await getRepository(ToSell)
            .createQueryBuilder('t')
            .where('t.pairName = :pair0  or t.pairName = :pair1 or t.pairName = :pair3', {
              pair0: coin0 + coin2,
              pair1: coin0 + coin1,
              pair3: coin0 + coin3,
            })
            .getMany()
          await ToSell.remove(tspos)
        }
      }

      if (bn(b).isGreaterThan('0') && coin0 !== coin1 && coin0 !== coin2 && coin0 !== coin3) {
        const toSellPosition: ToSell[] = await getRepository(ToSell)
          .createQueryBuilder('toSell')
          .orderBy('toSell.price', 'DESC')
          .where(
            '(toSell.pairName = :pair0 or toSell.pairName = :pair1 or toSell.pairName = :pair3) AND toSell.filled = :filled',
            {
              pair0: coin0 + coin2,
              pair1: coin0 + coin1,
              pair3: coin0 + coin3,
              filled: false,
            },
          )
          .getMany()
        const {howMuchToSell} = await getRepository(ToSell)
          .createQueryBuilder('t')
          .where('(t.pairName = :pair0  or t.pairName = :pair1 or t.pairName = :pair3) AND t.filled = :filled ', {
            pair0: coin0 + coin2,
            pair1: coin0 + coin1,
            pair3: coin0 + coin3,

            filled: false,
          })
          .select('COALESCE(SUM(t.left),0)', 'howMuchToSell')
          .getRawOne()

        const diff = bn(b).minus(bn(howMuchToSell))
        if (toSellPosition.length > 0 && diff.isGreaterThan(0)) {
          const ts = toSellPosition[0]
          console.log(
            `${ts.id} changed ${coin0} from ${howMuchToSell} by ${diff}   (balance:${b}), will be removed:`,
            bn(ts.left).isLessThan(0),
          )
          ts.left = bn(ts.left).plus(diff).toFixed(8)
          ts.filled = false
          await (bn(ts.left).isLessThan(0) ? ts.remove() : ts.save())
        }
      }
    })
  await Promise.all(fixThings('BTC', 'USDT', 'BNB'))
  // Await Promise.all(fixThings())

  await closeThings()

  // Await Promise.all(fixThings('BTC'))
  //   await Promise.all(fixThings())

  await closeThings()
}

cleanUp()
