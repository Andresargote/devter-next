import styles from "../styles/pages/Home.module.css"

export default function AppLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.containerLayout}>{children}</div>
    </div>
  )
}
