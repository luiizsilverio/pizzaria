import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'

export default function Product() {
  return (
    <>
      <Head>
        <title>My-Piza - Novo produto</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
            </select>

            <input type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
            />

            <input type="number"
              placeholder="Preço do produto (R$)"
              className={styles.input}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
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