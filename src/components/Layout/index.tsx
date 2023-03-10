import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Sidebar from '@/components/Side'
import Header, { DrawerHeader } from '@/components/Header'
import Footer, { DrawerFooter } from '@/components/Footer'
import '@/assets/styles/animation.scss'
import './style.scss'

export default function Layout({ children }: { children?: any }) {
  const location = useLocation()
  // 动画状态
  const [fade, setFade] = useState(false)

  // 监听路由变化，实现动画效果
  useEffect(() => {
    setFade(false)
    setTimeout(() => {
      setFade(true)
    }, 0)
  }, [location.pathname])

  return (
    <Box className="layout">
      <CssBaseline />
      <Header />
      <Sidebar />
      {/* <Footer /> */}
      <Box component="main" className="main">
        <DrawerHeader />
        <Box className={fade ? 'translation-aimation visible' : 'hidden'}>{ children ? children : <Outlet />}</Box>
        {/* <DrawerFooter /> */}
      </Box>
    </Box>
  )
}
