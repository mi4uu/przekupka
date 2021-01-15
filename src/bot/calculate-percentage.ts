import BigNumber from 'bignumber.js'
import {bn} from '../utils/bn'

export const calculatePercentage = (a: BigNumber | string, b: BigNumber | string) => {
  const result = bn(a).minus(bn(b)).dividedBy(bn(b)).multipliedBy(100)
  return result
}
