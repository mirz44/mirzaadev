import Image from "next/image"
import Link from "next/link"
import Nav from "@/components/nav";

export default function Header({ headerData }) {
  const { sitename, logo } = headerData

  return (
    <header className="flex flex-col">
      <Nav />
      <Link href='/' className='flex flex-row justify-start items-center pb-3 md:pb-5' title={sitename}>
        <div className='logo w-14 md:w-28'>
          <Image src={logo.url} alt={sitename} width={100} height={100} title={sitename} />
        </div>
        <h1 className='text-center font-display text-lg md:text-2xl hidden'>{sitename}</h1>
      </Link>
    </header>
  )
}
