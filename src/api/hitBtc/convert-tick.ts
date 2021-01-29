import {ITick} from '../server-store'

type IHitBtcTick = Array<{
  symbol: string
  ask: string
  bid: string
  last: string
  low: string
  high: string
  open: string
  volume: string
  volumeQuote: string
  timestamp: string
}>

export function convertTick(tick: IHitBtcTick): ITick['pairs'] {
  return Object.fromEntries(
    tick.map((values) => [
      values.symbol,
      {
        c: values.last,
        a: values.ask,
        b: values.bid,
      },
    ]),
  )
}
