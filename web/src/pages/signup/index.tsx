import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/Home.module.scss'
import { Button } from '../../components/Button'
import { Input, TextArea } from '../../components/Input'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>My-Pizza - Cadastrar-se</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo My-Pizza" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form>
            <Input
              placeholder='Digite seu nome'
              type="text"
            />

            <Input
              placeholder='Digite seu e-mail'
              type="email"
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
            />

            <Button
              type="submit"
              loading={true}
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
