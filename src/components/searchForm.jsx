import { useRouter } from "next/router";
import { useState } from "react";
export default function SearchForm({ hasQuery }) {
  const [query, setQuery] = useState()
  const router = useRouter()
  const submitHander = (e) => {
    e.preventDefault()
    router.push(`/search?query=${query}`)
  }
  return (
    <div>
      <form
        onSubmit={submitHander}
        className="mx-auto hidden w-full justify-center md:flex"
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="search"
          className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0 dark:text-black"
          placeholder="Search"
        />
        <button
          className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
          type="submit"
          id="btn-search"
        >
          Search
        </button>
      </form>
    </div>
  )
}