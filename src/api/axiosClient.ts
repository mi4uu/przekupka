import axios from 'axios'
import http from 'http'
import https from 'https'

export default axios.create({
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
