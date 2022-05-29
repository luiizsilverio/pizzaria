import Head from "next/head";
import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import styles from './styles.module.scss'

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()


  }

  return (
    <>
      <Head>
        <title>My-Pizza - Nova categoria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <form className={styles.form} onSubmit={handleRegister}>
            <input type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>

        </main>
      </div>
    </>
  )
}