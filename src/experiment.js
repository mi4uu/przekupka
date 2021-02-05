const sma = require('trading-indicator').sma
const ichimokuCloud = require('trading-indicator').ichimokuCloud
const bb = require('trading-indicator').bb
const getIndicators = async (symbol, period) => {

 console.log((await ichimokuCloud(9, 26, 52, 26), 'binance', 'PIVX/BTC', '1d', false)).splice(-1))
 let smaData = await sma(10, "close", "binance", 'PIVX/BTC', "1d", true)
 console.log(10, smaData[smaData.length - 1])
 smaData = await sma(20, "close", "binance", 'PIVX/BTC', "1d", true)
 console.log(20,smaData[smaData.length - 1])
 smaData = await sma(50, "close", "binance", 'PIVX/BTC', "1d", true)
 console.log('50',smaData[smaData.length - 1])

}

getIndicators('BTC/USDT', '1D')
