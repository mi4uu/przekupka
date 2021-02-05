import axios from 'axios'
import http from 'http'
import https from 'https'
let tooManyRequest = false
const axiosClient = axios.create({
  // 2 sec timeout
  timeout: 2000,

  // KeepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({keepAlive: true}),
  httpsAgent: new https.Agent({keepAlive: true}),

  // Follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,

  // Cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000,
})
axiosClient.interceptors.request.use((config) => {
  if (tooManyRequest) throw new Error('tooManyRequests')
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    // Console.log(response.headers)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error?.response?.data)
    console.log(error?.response?.config?.data)
    if (error?.response?.code === 429) {
      tooManyRequest = true
      console.log('ERROR , too many requests')
      console.log(JSON.stringify(error.response.headers))
      setTimeout(() => {
        tooManyRequest = false
      }, 1000000) // 16 minutes
    }

    return Promise.reject(error)
  },
)

export default axiosClient
