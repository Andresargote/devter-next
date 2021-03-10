import { useState, useEffect } from "react"

import styles from "../../styles/pages/Timeline.module.css"

import AppLayout from "../../components/AppLayout"
import Devit from "../../components/Devit"
import useUser from "../../hooks/useUser"

export default function Home() {
  const [timeLine, setTimeLine] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/api")
        .then((resp) => resp.json())
        .then(setTimeLine)
  }, [user])

  return (
    <AppLayout>
      <div className={styles.containerTimeline}>
        <header>
          <h1>Inicio</h1>
        </header>

        <section>
          {timeLine.map((devit) => (
            <Devit
              avatar={devit.avatar}
              id={devit.id}
              key={devit.id}
              message={devit.message}
              username={devit.username}
            />
          ))}
        </section>

        <nav></nav>
      </div>
    </AppLayout>
  )
}
