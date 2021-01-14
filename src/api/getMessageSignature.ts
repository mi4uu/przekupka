import { secret } from './config'
import qs from 'qs'
import CryptoJS from 'crypto-js'

export const getMessageSignature = (path: string, params: any) => {
  const api_post = qs.stringify(params)
  const api_secret = CryptoJS.enc.Base64.parse(secret)
  const api_nonce = params.nonce

  const api_sha256 = CryptoJS.SHA256(api_nonce + api_post)
  const api_sign = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, api_secret)
  // @ts-ignore
  api_sign.update(path, api_secret)
  // @ts-ignore
  api_sign.update(api_sha256, api_secret)
  return api_sign.finalize().toString(CryptoJS.enc.Base64)
}
