import { key, baseUrl } from './config'
import axios from 'axios'
import qs from 'qs'

import { getMessageSignature } from './get-message-signature'
// @ts-ignore
import { ConcurrencyManager } from 'axios-concurrency'

const api = axios.create({
  baseURL: baseUrl
})

// a concurrency parameter of 1 makes all api requests secuential
const MAX_CONCURRENT_REQUESTS = 1

// init your manager.
const manager = ConcurrencyManager(api, MAX_CONCURRENT_REQUESTS)

export const makePrivateCall = (
  path: string,
  params: { [key: string]: any }
) => {
  if (!params.nonce) {
    params.nonce =( Date.now() * 1000) // spoof microsecond
  }

  return api.post(baseUrl + path, qs.stringify(params), {
    headers: {
      'API-Key': key,
      'API-Sign': getMessageSignature(path, params),
      'User-Agent': 'Miial kraken client',
    },
  })
}
