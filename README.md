supported providers : hitBTC / kraken / binance



**** INSTALL AND RUN:

- change src/${provider}/config.ts  add credentials 
- change params in src/${provider}/create-initial-pairs.ts
```
const changeToTrend = 1.5   // how much percentage change will start considering buying/selling . it also mean minimum profit in percentage
const changeToChangeTrend = 0.6  // how much percentage price need to change to make a move.   
const buyPerHour = 2  // how many BUY action per pair per hour can we make 
```

change db config in ./ormconfig.js

install deps:
```npm ci```
create pairs in db:
```PROVIDER='binance' npm run init:binance  ```


** and run:
```PROVIDER='binance' npm start```


by default it will trade USD/BTC on kraken and hitbtc and USDT/BTC on binance. just give him some

*** endpoints:
what the hell is going on endpoint:
http://127.0.0.1:3000/status

what the hell is going on endpoint but with colors:
http://127.0.0.1:3000/statusp

