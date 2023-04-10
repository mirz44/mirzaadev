import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

export default function Header({ headerData }) {
  const { sitename, siteDescription, logo, favicon } = headerData

  return (
    <header className="flex">
      <Head>
        <title>{sitename} - {siteDescription}</title>
        <meta name="description" content={siteDescription} />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href={favicon.url} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <Link href='/' className='flex flex-row justify-start items-center pb-3 md:pb-5' title={sitename}>
        <div className='logo w-14 md:w-28'>
          <Image src={logo.url} alt={sitename} width={100} height={100} title={sitename} />
        </div>
        <h1 className='text-center font-display text-lg md:text-2xl'>{sitename}</h1>
      </Link>
    </header>
  )
}
