import Header from "@/components/header"
import Footer from "@/components/footer"
import Head from "next/head"

export default function Layout({ children, data, title }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 md:p-5">
      <Head>
        <title>{title} | {data.sitename} | {data.siteDescription}</title>
        <meta name="description" content={data.siteDescription} />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href={data.favicon.url} />
      </Head>
      <Header headerData={data} />
      <div className='content-wrapper'>
        {children}
      </div>
      <Footer footerData={data} />
    </main>
  )
}