import {key, secret, baseUrl} from './config'
import axios from 'axios'
import axiosClient from '../axiosClient'

const credentials = Buffer.from(`${key}:${secret}`).toString('base64')

export const makePrivateCall = async (path: string, parameters: Record<string, any>) => {
  return axiosClient.post(
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
  return axiosClient.get(
    baseUrl + path,

    {
      headers: {
        Authorization: 'Basic ' + credentials,
        'User-Agent': 'Miial client',
      },
    },
  )
}
