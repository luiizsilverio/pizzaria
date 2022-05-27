import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode
}

export function Button({loading, children, ...rest}: ButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={loading}
      {...rest}
    >
      {
        loading
          ? <FaSpinner color="#fff" size={16} />
          : (
              <a className={styles.buttonText}>
                {children}
              </a>
          )
      }
    </button>
  )
}
