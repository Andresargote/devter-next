import styles from "../styles/components/Avatar.module.css"

export default function Avatar({ alt, src, userName }) {
  return (
    <div className={styles.avatarContainer}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {userName && <strong>{userName}</strong>}
    </div>
  )
}
