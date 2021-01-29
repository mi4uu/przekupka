import {key, secret, baseUrl} from './config'
import axiosClient from '../axiosClient'
import qs from 'qs'
import CryptoJS from 'crypto-js'

const makeQueryString = (q: any) =>
  q
    ? `?${Object.keys(q)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
        .join('&')}`
    : ''
const signature = (data: any) => {
  const api_sign = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret)
  api_sign.update(qs.stringify(data))
  return api_sign.finalize().toString()
}

export const makePrivateCall = async (path: string, parameters: Record<string, any>) => {
  const data = parameters.timestamp ? parameters : {...parameters, timestamp: Date.now()}
  const signedParameters = qs.stringify({...data, signature: signature(data)})
  return axiosClient.post(baseUrl + path, signedParameters, {
    headers: {
      'X-MBX-APIKEY': key,
      'User-Agent': 'Miial client',
    },
  })
}

export const makePrivateGetCall = async (path: string, parameters: Record<string, any>) => {
  const data = parameters.timestamp ? parameters : {...parameters, timestamp: Date.now()}
  const signedParameters = makeQueryString({...data, signature: signature(data)})

  return axiosClient.get(
    baseUrl + path + signedParameters,

    {
      headers: {
        'X-MBX-APIKEY': key,
        'User-Agent': 'Miial client',
      },
    },
  )
}

export const makePrivateDeleteCall = async (path: string, parameters: Record<string, any>) => {
  const data = parameters.timestamp ? parameters : {...parameters, timestamp: Date.now()}
  const signedParameters = makeQueryString({...data, signature: signature(data)})

  return axiosClient.delete(
    baseUrl + path + signedParameters,

    {
      headers: {
        'X-MBX-APIKEY': key,
        'User-Agent': 'Miial client',
      },
    },
  )
}
