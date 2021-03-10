import { useState } from "react"
import AppLayout from "../../components/AppLayout"
import Button from "../../components/Button"
import useUser from "../../hooks/useUser"

import { addDevit } from "../../firebase/client"

export default function Divtit() {
  const user = useUser()
  const [message, setMessage] = useState("")

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.id,
      userName: user.name,
    })
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleMessage}
            value={message}
            placeholder="¿Qué está pasando?"
          ></textarea>
          <Button disabled={message.length === 0}>Devetear</Button>
        </form>
      </AppLayout>
      <style jsx>{`
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          outline: none;
          padding: 15px 0px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
