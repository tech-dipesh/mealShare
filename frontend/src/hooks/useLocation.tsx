import { useEffect, useState } from "react"

export const useLocation = () => {
  const [location, setLocation] = useState("")

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => setLocation(data.country_name))
      .catch(() => setLocation("Unknown"))
  }, [])

  return location
}
