import {key, baseUrl} from './config'
import axios from 'axios'
import qs from 'qs'

import {getMessageSignature} from './get-message-signature'
// @ts-expect-error
import {ConcurrencyManager} from 'axios-concurrency'

const api = axios.create({
  baseURL: baseUrl,
})

// A concurrency parameter of 1 makes all api requests secuential
const MAX_CONCURRENT_REQUESTS = 1

// Init your manager.
const manager = ConcurrencyManager(api, MAX_CONCURRENT_REQUESTS)

export const makePrivateCall = async (path: string, parameters: Record<string, any>) => {
  if (!parameters.nonce) {
    parameters.nonce = Date.now() * 1000 // Spoof microsecond
  }

  return api.post(baseUrl + path, qs.stringify(parameters), {
    headers: {
      'API-Key': key,
      'API-Sign': getMessageSignature(path, parameters),
      'User-Agent': 'Miial kraken client',
    },
  })
}
