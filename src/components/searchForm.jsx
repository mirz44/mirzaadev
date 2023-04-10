import { useRouter } from "next/router"
import { useState } from "react"
export default function SearchForm() {
  const [query, setQuery] = useState()
  const router = useRouter()
  const submitHander = (e) => {
    e.preventDefault()
    router.push(`/search?query=${query}`)
  }
  return (
    <div className="hidden">
      <form onSubmit={submitHander}>
        <input onChange={(e) => setQuery(e.target.value)} value={query} type="search" placeholder="Search" />
        <button type="submit" id="btn-search">Search</button>
      </form>
    </div>
  )
}