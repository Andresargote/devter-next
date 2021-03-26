import Avatar from "../components/Avatar"

import styles from "../styles/components/Devit.module.css"

import useTimeAgo from "../hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  avatar,
  userName,
  content,
  id,
  userId,
  createdAt,
  img,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article key={id} className={styles.article} onClick={handleArticleClick}>
        <Avatar src={avatar} alt={userName} />
        <div>
          <strong>{userName}</strong>
          <Link href={`/status/${id}`}>
            <a>
              <time>{timeAgo}</time>
            </a>
          </Link>
          <p>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </div>
      </article>
      <style jsx>
        {`
          article:hover {
            cursor: pointer;
          }

          a {
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}
