import { useEffect } from "react"
import { useRouter } from "next/router"

import styles from "../styles/components/Login.module.css"

import Button from "../components/Button"
import IconGitHub from "../components/IconGitHub"
import { loginWithGithub } from "../firebase/client"
import useUser, { USER_STATES } from "../hooks/useUser"

export default function Login() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGithub().catch((err) => console.error(err))
  }

  return (
    <div className={styles.containerLogin}>
      <h1>Devter</h1>
      <h2>
        Talk about development
        <br /> with developers
      </h2>
      {user === USER_STATES.NOT_LOGGED && (
        <Button onClick={handleClick}>
          <IconGitHub fill="#fff" />
          Login with GitHub
        </Button>
      )}
      {user === undefined && <img src="/spinner.gif" alt="Spinner gif" />}
    </div>
  )
}
