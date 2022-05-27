import Head from 'next/head'
import Image from 'next/image'

import logoImg from '../../public/logo.svg'
import styles from '../../styles/Home.module.scss'
import { Input, TextArea } from '../components/Input'

export default function Home() {
  return (
    <>
      <Head>
        <title>My-Pizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo My-Pizza" />
        <div className={styles.login}>
          <form>
            <Input
              placeholder='Digite seu e-mail'
              type="email"
            />
            <Input
              placeholder='Digite sua senha'
              type="password"
            />
          </form>
        </div>
      </div>
    </>
  )
}
