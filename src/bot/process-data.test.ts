import BigNumber from 'bignumber.js'
import {processData} from './process-data'

test('process data', () => {
  // ProcessData(buy: boolean, sell: boolean, price, lastTrasnactionPrice, minChange, balanceTransactionType
  let result = processData(false, false, new BigNumber('1'), new BigNumber('0.9'), new BigNumber('0.5'), 0, [])
  expect(result.sell).toBeTruthy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber('1'), new BigNumber('0.995'), new BigNumber('0.5'), 0, [])
  expect(result.sell).toBeTruthy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber('1'), new BigNumber('0.995'), new BigNumber('0.5'), 0, ['s'])
  expect(result.sell).toBeTruthy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber('1'), new BigNumber('0.995'), new BigNumber('0.5'), 1, ['s'])
  expect(result.sell).toBeFalsy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber('1'), new BigNumber('0.99'), new BigNumber('0.5'), 1, ['s'])
  expect(result.sell).toBeTruthy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber('1'), new BigNumber('0.996'), new BigNumber('0.5'), 0, [])
  expect(result.sell).toBeFalsy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber(1), new BigNumber('1.005'), new BigNumber('0.5'), 0, [])
  expect(result.sell).toBeFalsy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber(1), new BigNumber('1.006'), new BigNumber('0.5'), 0, ['b'])
  expect(result.sell).toBeFalsy()
  expect(result.buy).toBeTruthy()

  result = processData(false, false, new BigNumber(1), new BigNumber('1.006'), new BigNumber('0.5'), 1, ['b'])
  expect(result.sell).toBeFalsy()
  expect(result.buy).toBeFalsy()

  result = processData(false, false, new BigNumber(1), new BigNumber('1.012'), new BigNumber('0.5'), 1, ['b'])
  expect(result.sell).toBeFalsy()
  expect(result.buy).toBeTruthy()
})
