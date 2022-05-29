import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/Home.module.scss'
import { Button } from '../../components/Button'
import { Input, TextArea } from '../../components/Input'
import { AuthContext } from '../../contexts/AuthContext'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signUp } = useContext(AuthContext)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()

    if (!name || !email || !password) {
      toast.error("PREENCHA TODOS OS CAMPOS")
      return
    }

    setLoading(true)

    await signUp({ name, email, password })

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>My-Pizza - Cadastrar-se</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo My-Pizza" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder='Digite seu e-mail'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}>
              Já possui uma conta? Faça login!
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
