import Header from "layouts/Header"
import Footer from "layouts/Footer"

function Layout({children}) {
  return (
    <>
        <Header />
        <main style={{minHeight: '100dvh'}}>
            {children}
        </main>
        <Footer />
    </>
  )
}

export default Layout