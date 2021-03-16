import { useState, useEffect } from "react"

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timeStamp) => {
  const now = Date.now()
  const elapsed = (timeStamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timeStamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timeStamp))

  useEffect(() => {
    const timeOut = setInterval(() => {
      const newTimeAgo = getDateDiffs(timeStamp)
      setTimeAgo(newTimeAgo)
    }, 30000)

    return () => clearInterval(timeOut)
  }, [timeStamp])

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  })

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
