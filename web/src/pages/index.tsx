import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'

import logoImg from '../../public/logo.svg'
import styles from '../../styles/Home.module.scss'
import { Button } from '../components/Button'
import { Input, TextArea } from '../components/Input'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>My-Pizza - Faça seu Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo My-Pizza" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>
              Não possui uma conta? Cadastre-se
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
