import {ITick} from './server-store'

type IKrakenTick = Record<
  string,
  {
    a: string[]
    b: string[]
    c: string[]
  }
>
export function convertTick(tick: IKrakenTick): ITick['pairs'] {
  return Object.fromEntries(
    Object.entries(tick).map(([pair, values]) => [
      pair,
      {
        c: values.c[0],
        a: values.a[0],
        b: values.b[0],
      },
    ]),
  )
}
