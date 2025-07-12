import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import OffersBanner from '../components/offersBanner/OffersBanner' // ✅ استيراد المكون

export default function MainLayout() {
  const location = useLocation()

  const noNavFooterPaths = ['/login', '/forget', '/rePass', '/password', '/register']
  const hideNavFooter = noNavFooterPaths.includes(location.pathname)

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {!hideNavFooter && (
        <>
          <Navbar
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
          />

          {/* ✅ يظهر فقط في الصفحة الرئيسية */}
          {location.pathname === '/' && <OffersBanner />}
          {location.pathname === '/Home' && <OffersBanner />}
        </>
      )}

      <Container style={{ flex: 1 }}>
        <Outlet context={{ isUserMenuOpen }} />
      </Container>

      {!hideNavFooter && <Footer />}
    </div>
  )
}
