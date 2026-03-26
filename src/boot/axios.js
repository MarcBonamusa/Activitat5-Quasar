import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({ 
  baseURL: 'http://172.23.7.114:3000' 
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('mi_token_jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }