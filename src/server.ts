import express, { Request, Response } from "express"

import next from 'next'
import fetchData from "./api/fetchData"

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
import {store} from './api/serverStore'
const addPair = (name:string)=>{
 if(store.pairs[name]) return false
 if(!store.assetPairs[name]) return false

}


app.prepare().then(() => {
  
    const server = express()
    server.get("/tick", (req: Request, res: Response) => {
        res.send(store.ticks[store.ticks.length-1])
    })
    server.get("/ticks", (req: Request, res: Response) => {
        res.send(store.ticks)
    })
    server.get("/transactions", (req: Request, res: Response) => {
        res.send(store.closedTransactions)
    })
    server.get("/balance", (req: Request, res: Response) => {
        res.send(store.balance)
    })
    server.get("/assetPairs", (req: Request, res: Response) => {
        res.send(store.assetPairs)
    })
    server.get("/pairs", (req: Request, res: Response) => {
        res.send(store.pairs)
    })
    server.all("*", (req: Request, res: Response) => {
        return handle(req, res);
      })
     

      server.listen(3000,'0.0.0.0',()=> console.log("server is listening on 3000 port"))
      fetchData()
})






