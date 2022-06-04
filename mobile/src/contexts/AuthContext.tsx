import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from "../services/api";

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => Promise<void>
  loadingAuth: boolean
  loading: boolean
}

type UserProps = {
  id: string
  name: string
  email: string
  token: string
}

type SignInProps = {
  email: string
  password: string
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  })

  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user.name


  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true)

    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token } = response.data
      // console.log(response.data)

      // persiste os dados do usuário no AsyncStorage
      await AsyncStorage.setItem('@pizzaria.user', JSON.stringify(response.data))

      // atualiza o token da api
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser({
        id,
        name,
        email,
        token
      })

      setLoadingAuth(false)

    } catch(err) {
      console.log('Erro ao acessar', err)
      setLoadingAuth(false)
    }
  }


  async function signOut() {
    await AsyncStorage.clear()

    setUser({
      id: '',
      name: '',
      email: '',
      token: ''
    })
  }


  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem('@pizzaria.user')

      let hasUser: UserProps = JSON.parse(userInfo || "{}")

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token
        })
      }

      setLoading(false)
    }

    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      signOut,
      loading,
      loadingAuth
    }}>

      {children}

    </AuthContext.Provider>
  )
}
