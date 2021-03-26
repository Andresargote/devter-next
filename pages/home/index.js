import { useState, useEffect } from "react"

import styles from "../../styles/pages/Timeline.module.css"

import Head from "next/head"
import Link from "next/link"
import Devit from "../../components/Devit"
import useUser from "../../hooks/useUser"
import { listenLatestDevit } from "../../firebase/client"
import Search from "../../components/icons/Search"
import Create from "../../components/icons/Create"
import HomeIcon from "../../components/icons/Home"

export default function Home() {
  const [timeLine, setTimeLine] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevit(setTimeLine)
    }

    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Home / Devit</title>
      </Head>
      <div className={styles.containerTimeline}>
        <header>
          <h1>Inicio</h1>
        </header>

        <section>
          {timeLine.map((devit) => (
            <Devit
              avatar={devit.avatar}
              createdAt={devit.createdAt}
              id={devit.id}
              key={devit.id}
              content={devit.content}
              userName={devit.userName}
              userId={devit.userId}
              img={devit.img}
            />
          ))}
        </section>

        <nav>
          <Link href="/home">
            <a>
              <HomeIcon width={24} height={24} />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search width={24} height={24} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/devit">
            <a>
              <Create width={24} height={24} stroke="#09f" />
            </a>
          </Link>
        </nav>
      </div>
      <style jsx>
        {`
          nav {
            display: flex;
            align-items: center;
            justify-content: center;
            justify-content: space-around;
          }

          nav a:hover {
            background: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            backgrond-position: center;
          }
        `}
      </style>
    </>
  )
}
