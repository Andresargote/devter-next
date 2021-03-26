import { useState, useEffect } from "react"
import Button from "../../components/Button"
import useUser from "../../hooks/useUser"
import { useRouter } from "next/router"

import Head from "next/head"
import { addDevit, uploadImage } from "../../firebase/client"
import Avatar from "../../components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function Divtit() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [message, setMessage] = useState("")
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImageURL] = useState(null)

  const router = useRouter()

  console.log(user)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImageURL)
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.id,
      userName: user.name,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((errr) => {
        console.error(errr)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    console.log(e.dataTransfer.files[0])
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleMessage}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            value={message}
            placeholder="¿Qué está pasando?"
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImageURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devetear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        .form-container {
          display: flex;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          outline: none;
          padding: 15px 0px;
          resize: none;
          width: 100%;
        }

        button {
          position: absolute;
          border: 0;
          border-radius: 100%;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 24px;
          cursor: pointer;
        }

        .remove-img {
          position: relative;
        }

        img {
          border-radius: 10px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
