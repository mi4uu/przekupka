import axios from "axios"
import moment from "moment"
import { checkBalance } from "./checkBalance"
import { makePrivateCall } from "./makePrivateCall"
import { store } from "./serverStore"
export default function fetchData(){


axios.get('https://api.kraken.com/0/public/AssetPairs').then(result=>store.assetPairs=result.data.result)

const setBalance = ()=>checkBalance().then(result=>store.balance=result.result)
setBalance()
setInterval(setBalance,20000)
setInterval(()=>{
    axios.get('https://api.kraken.com/0/public/Ticker?pair='+Object.keys(store.pairs).join(',') ).then(results=>{
       const ticks = store.ticks
       if(ticks.length>100) ticks.shift()
       ticks.push({timestamp:moment().unix(),pairs:results.data.result})
       store.ticks=ticks
    })
},5000)
}
const getClosedOrders = async ()=>{
    const start = moment().subtract(1, 'days').unix()
    const {data} = await makePrivateCall('/0/private/ClosedOrders',{start})
    store.closedTransactions = {...store.closedTransactions, ...data.result.closed}

}
getClosedOrders()

setInterval(()=>{
    getClosedOrders()
},30000)