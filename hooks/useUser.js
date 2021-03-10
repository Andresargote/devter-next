import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { onAuthStateChanged } from "../firebase/client"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user))
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
