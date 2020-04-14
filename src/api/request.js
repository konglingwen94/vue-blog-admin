import axios from 'axios'
import { Loading, } from 'element-ui'
import router from '@/router.js'

let loading


const instance = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? '/api' : process.env.BASE_URL + 'data',
  validateStatus(status) {
    // validateStatus defines whether to resolve or reject the promise for a given. 
    // HTTP response status code. If validateStatus returns `true` (or is set to `null` or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.

    return status < 500
  }
})

const configuration = {
  useToken: true,
  getToken() {
    return localStorage.accessToken
  },
}

instance.interceptors.request.use(
  config => {
    if (configuration.useToken) {
      let token = configuration.getToken()
      if (token) {
        config.headers['Authorization'] = token
      }
    }

    if (process.env.NODE_ENV === 'production') {
      // config.url=config.url.replace('/api')
      config.url += '.json'
      // config.url=config.url+
      // console.log(config)
    }


    loading = Loading.service()
    return Promise.resolve(config)
  },
  err => {
    loading.close()
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    loading.close()




    return Promise.resolve(response.data)
  },
  err => {
    loading.close()
    if (err.response.status === 401) {
      router.push('/auth/login')
      localStorage.removeItem('adminInfo')
      localStorage.removeItem('accessToken')
      return
    }

    if (err.response) {
      Message.error(err.response.data.message)
      return Promise.reject(err.response.data)
    } else {
      Message.error(err.message)
      return Promise.reject(err)
    }
  }
)

export default instance
