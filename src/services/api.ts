import axios from 'axios'
import { getToken } from '../utils/Token'

const api = axios.create({
  baseURL: process.env.BASE_URL
})

console.log(process.env.BASE_URL)

const token = getToken()

if(token){
  api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`
    return config
  })
}

export { api }