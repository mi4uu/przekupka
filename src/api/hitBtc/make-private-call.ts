import {key, secret, baseUrl} from './config'
import axios from 'axios'

// @ts-expect-error
import {ConcurrencyManager as concurrencyManager} from 'axios-concurrency'

const api = axios.create({
  baseURL: baseUrl,
})

// A concurrency parameter of 1 makes all api requests secuential
const MAX_CONCURRENT_REQUESTS = 1

// Init your manager.
concurrencyManager(api, MAX_CONCURRENT_REQUESTS)
const credentials = Buffer.from(`${key}:${secret}`).toString('base64')

export const makePrivateCall = async (path: string, parameters: Record<string, any>) => {
  return api.post(
    baseUrl + path,
    {},
    {
      headers: {
        Authorization: 'Basic ' + credentials,
        'User-Agent': 'Miial client',
      },
    },
  )
}

export const makePrivateGetCall = async (path: string, parameters: Record<string, any>) => {
  return api.get(
    baseUrl + path,

    {
      headers: {
        Authorization: 'Basic ' + credentials,
        'User-Agent': 'Miial client',
      },
    },
  )
}
