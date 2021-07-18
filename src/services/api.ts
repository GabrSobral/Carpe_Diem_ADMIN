import axios from 'axios'
import { getToken } from '../utils/Token'

const api = axios.create({
  baseURL: 'https://carpe-diem-api.herokuapp.com'
})

const token = getToken()

if(token){
  api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`
    return config
  })
}

export { api }