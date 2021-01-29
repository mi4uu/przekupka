import BigNumber from 'bignumber.js'

export const calculateProfit = ({
  volume,
  buyPrice,
  sellPrice,
}: {
  volume: BigNumber
  buyPrice: BigNumber
  sellPrice: BigNumber
}) => {
  const buyFor = volume.multipliedBy(buyPrice)
  const soldFor = volume.multipliedBy(sellPrice)
  return soldFor.minus(buyFor)
}
