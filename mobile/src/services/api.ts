import axios from 'axios'

// o Endpoint é do backend, não é do BD!
const api = axios.create({
  baseURL: 'http://192.168.100.5:3333'
})

export { api }