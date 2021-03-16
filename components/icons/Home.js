import * as React from "react"

function Home(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={50}
      height={50}
      {...props}
    >
      <path
        d="M24.965 1.055a.997.997 0 00-.578.21l-23 17.946a1.001 1.001 0 101.23 1.578L4 19.711V46c0 .55.45 1 1 1h13.832c.11.02.219.02.328 0h11.672c.11.02.219.02.328 0H45c.55 0 1-.45 1-1V19.71l1.387 1.08a.991.991 0 00.988.136 1 1 0 00.617-.79 1 1 0 00-.379-.925L41 13.27V6h-6v2.586l-9.387-7.32a.999.999 0 00-.652-.211zM25 3.32l19 14.828V45H32V26H18v19H6V18.148zM37 8h2v3.707l-2-1.562zM20 28h10v17H20zm0 0"
        fill="#09f"
      />
    </svg>
  )
}

export default Home
