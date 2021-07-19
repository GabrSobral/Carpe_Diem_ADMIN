import axios from 'axios'
import { getToken } from '../utils/Token'

const api = axios.create({
  baseURL: process.env.BASE_URL
})

const token = getToken()

if(token){
  api.interceptors.request.use((config) => {
  console.log(process.env.NEXT_PUBLIC_API_ADDRESS)
    config.headers.authorization = `Bearer ${token}`
    return config
  })
}

export { api }