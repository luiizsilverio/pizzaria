import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    if (!name) return;

    const apiClient = setupAPIClient()

    await apiClient.post('/categories', { name })

    toast.info('Categoria cadastrada com sucesso!')

    setName('')
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})