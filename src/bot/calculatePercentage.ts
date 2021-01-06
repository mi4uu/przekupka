import BigNumber from "bignumber.js";

export const calculatePercentage = (a: BigNumber, b: BigNumber) => a.minus(b).dividedBy(b).multipliedBy(100)