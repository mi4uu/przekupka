import moment from 'moment'
import {calculatePercentage} from '../bot/calculate-percentage'
import {store} from './server-store'
import fs from 'fs'
import {bn} from '../utils/bn'
import {getTick} from '../bot/get-tick'
import api from './api'
export default function fetchData() {
  const setBalance = () => {
    api
      .checkBalance()
      .then((result) => {
        store.balance = result
      })
      .catch((error) => {
        console.log('Check balance error:', error.code)
      })
  }

  setBalance()

  setInterval(setBalance, 20000)

  setInterval(getTick, 2000)
}

setTimeout(async () => {
  await api.getClosedOrders()
}, 3000)

setInterval(async () => {
  await api.getClosedOrders()
}, 10000)
