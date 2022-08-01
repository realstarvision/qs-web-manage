import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams, useRoutes, useNavigate } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import router, { whiteList } from './router'
import { getToken } from '@/until/auth'
import './App.scss'

function App() {
  let location = useLocation()
  let navigate = useNavigate()
  // 路由守卫
  useEffect(() => {
    if (getToken()) {
      if (location.pathname === '/login') {
        navigate('/')
      }
    } else {
      if (!whiteList.includes(location.pathname)) {
        navigate('/login')
      }
    }
  }, [location.pathname])

  return (
    <Box className="app">
      {/* <Routes>
        {router.map((item, i) => {
          return (
            <Route
              key={i}
              path={item.path}
              element={
                <Suspense>
                  <RequireAuth data={item}>
                    <item.component />
                  </RequireAuth>
                </Suspense>
              }
            />
          )
        })}
      </Routes> */}
      {useRoutes(router)}
    </Box>
  )
}

// 判断
// export function RequireAuth({ children, data }: { children: JSX.Element; data: { auth: boolean } }) {
//   let singeRoute = ['/login']
//   let location = useLocation()
//   const componentType = !singeRoute.includes(location.pathname) ? <Layout>{children}</Layout> : children
//   if (getToken()) {
//     if (location.pathname === '/login') {
//       return <Navigate to="/" state={{ from: location }} replace />
//     } else {
//       return componentType
//     }
//   } else {
//     if (!data.auth) {
//       return componentType
//     } else {
//       return <Navigate to="/login" state={{ from: location }} replace />
//     }
//   }
// }

export default App
