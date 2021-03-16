import Avatar from "../components/Avatar"

import styles from "../styles/components/Devit.module.css"

import useTimeAgo from "../hooks/useTimeAgo"

export default function Devit({
  avatar,
  userName,
  content,
  id,
  userId,
  createdAt,
}) {
  const timeAgo = useTimeAgo(createdAt)

  return (
    <article key={id} className={styles.article}>
      <Avatar src={avatar} alt={userName} />
      <div>
        <strong>{userName}</strong>
        <date>{timeAgo}</date>
        <p>{content}</p>
      </div>
    </article>
  )
}
