import Header from "layouts/Header"
import Footer from "layouts/Footer"
import { useState } from "react"

function Layout({ children, setShowOffcanvas }) {
  return (
    <>
      <Header setShowOffcanvas={setShowOffcanvas} />
      <main style={{ minHeight: '100dvh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout