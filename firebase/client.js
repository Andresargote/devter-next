import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDkRmcB5vSE7WG78fCG0PLEiTydpRHNQmo",
  authDomain: "devter-1f6d7.firebaseapp.com",
  projectId: "devter-1f6d7",
  storageBucket: "devter-1f6d7.appspot.com",
  messagingSenderId: "834013047138",
  appId: "1:834013047138:web:76af625367db191a3da43b",
  measurementId: "G-0JM6WBM9P7",
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { photoURL, email, displayName, uid } = user

  return {
    avatar: photoURL,
    name: displayName,
    email: email,
    id: uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null
    onChange(normalizeUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = (avatar) => {
  return db.collection("devits").add({
    ...avatar,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
