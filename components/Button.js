import styles from "../styles/components/Button.module.css"

export default function Button({ children, disabled, onClick }) {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
