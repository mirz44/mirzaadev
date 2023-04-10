import Image from "next/image";
import Link from "next/link";

export default function Footer({ footerData }) {
  const { copyrightText, sitename, logo } = footerData

  return (
    <footer>
      <Link href='/' className='flex flex-col justify-center items-center' title={sitename}>
        <div className='logo flex items-center'>
          <Image src={logo.url} alt={sitename} width={50} height={50} title={sitename} />
          <div className='logo-text'>{sitename}</div>
        </div>
        <p className='text-center'>{copyrightText} {(new Date().getFullYear())}</p>
      </Link>
    </footer>
  )
}
