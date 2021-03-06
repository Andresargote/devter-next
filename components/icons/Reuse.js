import * as React from "react"

function Reuse(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#2a2e3b"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 11.5l-3 3 3.002 3" />
        <path d="M16.5 9.5v2a3 3 0 01-3 3h-8" />
        <g>
          <path d="M12.5 9.5l3-3-3.002-3" />
          <path d="M4.5 11.5v-2a3 3 0 013-3h8" />
        </g>
      </g>
    </svg>
  )
}

export default Reuse
