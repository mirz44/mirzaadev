import Link from "next/link";

export default function Nav() {
  return (
    <nav className='text-center flex ml-auto mr-auto'>
      <Link href="/">Home</Link>
    </nav>
  )
}