import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>My-Pizza - Painel</title>
      </Head>
      <Header />
      <h1>Painel</h1>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})