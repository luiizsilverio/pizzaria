import axios from 'axios'

// -- Informe o IP do Backend, e não do BD! --

const api = axios.create({
  baseURL: 'http://192.168.100.4:3333'
})

export { api }
