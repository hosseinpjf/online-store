import Header from "layouts/Header"
import Footer from "layouts/Footer"

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="py-4 px-1 px-sm-3 py-md-5" style={{ minHeight: '100dvh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout