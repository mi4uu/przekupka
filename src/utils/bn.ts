import BigNumber from 'bignumber.js'
BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_DOWN})

export function bn(x: BigNumber | number | string) {
  return x instanceof BigNumber ? x : new BigNumber(x)
}
