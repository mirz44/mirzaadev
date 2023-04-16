import Image from "next/image"
import Link from "next/link"

export default function Footer({ footerData }) {
  const { copyrightText, sitename, logo } = footerData

  return (
    <footer className='logo flex flex-col sm:flex-row items-center mt-10 mb-5'>
      <Link href='/' className='flex justify-center items-center no-underline' title={sitename}>
        <Image src={logo.url} alt={sitename} width={50} height={50} title={sitename} />
        <div className='logo-text text-white no-underline'>{sitename}</div>
      </Link>
      <span className="hidden sm:block pl-5 pr-5">|</span>
      <p className='text-center'>{copyrightText} {(new Date().getFullYear())}</p>
    </footer>
  )
}
