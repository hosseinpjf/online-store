import Header from "layouts/Header"
import Footer from "layouts/Footer"

function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100dvh - 70px - 60px)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout