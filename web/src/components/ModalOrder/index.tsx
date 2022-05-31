import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import { OrderItemProps } from '../../pages/dashboard'
import styles from './styles.module.scss'

interface ModalProps {
  isOpen: boolean
  order: OrderItemProps[]
  onClose: () => void
  onFinish: (id: string) => Promise<void>
}

const customStyles = {
  content: {
    top: '50%',
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    padding: '30px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1d1d2e'
  }
}

export function ModalOrder({ isOpen, order, onClose, onFinish }: ModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <button
        type="button"
        onClick={onClose}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color="#f34748" className={styles.svg}/>
      </button>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{ order.length && order[0].order.table }</strong>
        </span>

        {
          order.map( item => (
            <section key={ item.id } className={styles.item}>
              <span>
                { item.amount } - <strong>{ item.product.name }</strong>
              </span>
              <span className={styles.description}>
                { item.product.description }
              </span>
            </section>
          ))
        }

        <button
          className={styles.button}
          onClick={() => onFinish(order[0].order_id)}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  )
}