import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

export default function MainLayout() {
  const location = useLocation()

  // مصفوفة بالمسارات اللي ما بدك يظهر فيها navbar وfooter
  const noNavFooterPaths = ['/login', '/forget', '/rePass','/password','/register']

  // تحقق هل المسار الحالي موجود في المصفوفة
  const hideNavFooter = noNavFooterPaths.includes(location.pathname)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {!hideNavFooter && <Navbar />}
      <Container style={{ flex: 1 }}>
        <Outlet />
      </Container>
      {!hideNavFooter && <Footer />}
    </div>
  )
}
