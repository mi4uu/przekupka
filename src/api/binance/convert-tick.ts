import {bn} from '#utils/bn'
import {ITick} from '../server-store'

type IHitBtcTick = Array<{
  symbol: string
  askPrice: string
  bidPrice: string
  askQty: string
  bidQty: string
}>

export function convertTick(tick: IHitBtcTick): ITick['pairs'] {
  return Object.fromEntries(
    tick.map((values) => [
      values.symbol,
      {
        c: bn(values.askPrice).plus(values.bidPrice).dividedBy(2).toFixed(8),
        a: values.askPrice,
        b: values.bidPrice,
      },
    ]),
  )
}
