import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

import { api } from '../services/apiClient'

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)


export function signOut() {
  try {
    destroyCookie(undefined, '@pizza.token')
    Router.push('/')

  } catch {
    console.log('Erro ao deslogar')
  }
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user


  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      console.log(response.data.email)
      const { id, name, token } = response.data

      setCookie(undefined, '@pizza.token', token, {
        maxAge: 60 * 60 * 24 * 30, // expira em 1 mês
        path: "/" // todas as rotas terão acesso ao cookie
      })

      setUser({
        id,
        name,
        email
      })

      // passar para as próximas requisições o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Logado com sucesso!")

      // redirecionar o usuário para o dashboard
      Router.push('/dashboard')

    } catch(err) {
      console.log("ERRO AO ACESSAR:", err)
      toast.error("Erro ao acessar!")
    }
  }


  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      toast.success('Conta criada com sucesso!')

      Router.push('/')

    } catch(err) {
      console.log("erro ao cadastrar o usuário")
      toast.error("Erro ao cadastrar!")
    }
  }


  useEffect(() => {
    const cookies = parseCookies()
    const token = cookies['@pizza.token']

    if (token) {
      api.get('/users/me').then(response => {
        const { id, name, email } = response.data

        setUser({
          id,
          name,
          email
        })
      })

      .catch ((err) => {
        signOut() // se deu erro, deslogar o usuário
      })
    }
  }, [])


  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      signOut,
      signUp
     }}>

      {children}

    </AuthContext.Provider>
  )
}

