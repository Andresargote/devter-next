import Avatar from "../components/Avatar"

import styles from "../styles/components/Devit.module.css"

export default function Devit({ avatar, username, message, id }) {
  return (
    <article key={id} className={styles.article}>
      <Avatar src={avatar} alt={username} />
      <div>
        <strong>{username}</strong>
        <p>{message}</p>
      </div>
    </article>
  )
}
