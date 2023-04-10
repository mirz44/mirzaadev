import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

export default function Header({ headerData }) {
  const { sitename, siteDescription, logo, favicon } = headerData

  return (
    <header>
      <Head>
        <title>{sitename} - {siteDescription}</title>
        <meta name="description" content={siteDescription} />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href={favicon.url} />
      </Head>
      <Link href='/' className='flex flex-col justify-center items-center' title={sitename}>
        <div className='logo'>
          <Image src={logo.url} alt={sitename} width={100} height={100} title={sitename} />
        </div>
        <h1 className='text-center'>{sitename}</h1>
      </Link>
    </header>
  )
}
