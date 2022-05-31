import Head from "next/head"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from 'react-modal'

import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
  id: string
  table: string | number
  status: boolean
  draft: boolean
  name: string | null
}

interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string
  amount: number
  order_id: string
  product_id: string
  product: {
    id: string
    name: string
    description: string
    price: string | number
    banner: string
  }
  order: {
    id: string
    table: string | number
    status: boolean
    name: string | null
  }
}

Modal.setAppElement('#__next')

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal() {
    setModalVisible(false)
  }

  async function handleOpenModal(id: string) {
    const api = setupAPIClient()

    const response = await api.get('/orders/details', {
      params: {
        order_id: id,
      }
    })

    setModalItem(response.data)
    setModalVisible(true)
  }

  async function handleFinishModal(id: string) {
    const api = setupAPIClient()

    await api.put('/orders/finish', {
      order_id: id
    })

    const response = await api.get('/orders')

    setOrderList(response.data)
    setModalVisible(false)
  }

  async function handleRefresh() {
    const api = setupAPIClient()

    const response = await api.get('/orders')

    setOrderList(response.data)
  }

  return (
    <>
      <Head>
        <title>My-Pizza - Painel</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefresh}>
            <FiRefreshCcw color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOrders}>

        {
          orderList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado.
            </span>
          )
        }
        {
          orderList.map((item) => (
            <section className={styles.orderItem} key={ item.id }>
              <button onClick={() => handleOpenModal(item.id)}>
                <div className={styles.tag}></div>
                <span>Mesa { item.table }</span>
              </button>
            </section>
          ))
        }

        </article>
      </main>

      {
        modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            order={modalItem}
            onClose={handleCloseModal}
            onFinish={handleFinishModal}
          />
        )
      }
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupAPIClient(ctx)

  const response = await api.get('/orders')

  return {
    props: {
      orders: response.data || []
    }
  }
})