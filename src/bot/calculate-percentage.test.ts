import {calculatePercentage} from './calculate-percentage'

test('it should return percentage diff', () => {
  expect(calculatePercentage('1', '1').toFixed(2)).toBe('0.00')
  expect(calculatePercentage('2', '1').toFixed(2)).toBe('100.00')
  expect(calculatePercentage('1', '2').toFixed(2)).toBe('-50.00')
  expect(calculatePercentage('1.1', '1').toFixed(2)).toBe('10.00')
  expect(calculatePercentage('0.9', '1').toFixed(2)).toBe('-10.00')
  expect(calculatePercentage('0.09', '1').toFixed(2)).toBe('-91.00')
  expect(calculatePercentage('1.01', '1').toFixed(2)).toBe('1.00')
  expect(calculatePercentage('1', '100').toFixed(2)).toBe('-99.00')
  expect(calculatePercentage('100', '1').toFixed(2)).toBe('9900.00')
})
