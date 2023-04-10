import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({ children, data }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header headerData={data} />
      <div className='content-wrapper'>
        {children}
      </div>
      <Footer footerData={data} />
    </main>
  )
}