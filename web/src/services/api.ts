import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@pizza.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;

  }, (error: AxiosError) => {
    // qualquer erro 401 (nao autorizado), devemos deslogar o usuário
    if (error.response.status === 401) {
      if (typeof window !== undefined) {
        signOut()

      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error)
  })

  return api
}