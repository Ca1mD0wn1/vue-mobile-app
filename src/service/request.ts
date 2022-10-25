
// 1.引入axios
import axios from 'axios'
import router from '@/router'

// 2.项目环境
// 生产环境 process.env.NODE_ENV === 'production'  cnpm run build
// 测试环境 ？
// 开发环境 process.env.NODE_ENV === 'devlopment   cnpm run dev
const isDev = process.env.NODE_ENV === 'development'

axios.defaults.withCredentials = false

const ins = axios.create({
  baseURL: isDev ? 'http://121.89.205.189:3001/api' : 'http://121.89.205.189:3001/api',
  timeout: 6000
})

ins.interceptors.request.use((config) => {

  (config.headers!.token as string) = localStorage.getItem('token')!
  return config
}, (err) => {
  return Promise.reject(err)
})

ins.interceptors.response.use((response) => {

  if (response.data.code === '10119') {
    router.push('/login')
    return
  } else {
    return response
  }
}, (err) => Promise.reject(err))

// 6.暴露自定义axios
export default ins