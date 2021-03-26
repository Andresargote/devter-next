import Head from "next/head"

import Login from "../components/Login"

export default function Home() {
  return (
    <>
      <Head>
        <title>devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}
