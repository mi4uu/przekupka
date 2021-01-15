import BigNumber from 'bignumber.js'

export function bn(x: BigNumber | number | string) {
  return x instanceof BigNumber ? x : new BigNumber(x)
}
