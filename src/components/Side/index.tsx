import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
  Toolbar,
  Drawer,
  ListItemButton,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { menuRouter, Router } from '@/router'
import { drawerWidth, barHeight } from '@/config'
import { getUserInfo } from '@/until/auth'
import './side.scss'

const MyDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.black.main,
    border: 'none',
  },
}))

export default function sidebar() {
  const theme = useTheme()
  const location = useLocation()

  const [routers, setRouters] = useState<Router[]>(menuRouter)
  const [activeRouter, setActiveRouter] = useState<number>(0)

  // 初始化
  useEffect(() => {
    if (getUserInfo()) {
      const menuDTOS = getUserInfo().menuDTOS
      for (let i = 0; i < menuDTOS.length; i++) {
        for (let j = 0; j < routers.length; j++) {
          if (menuDTOS[i]['menuUrl'] === routers[j]['path']) {
            routers[j].show = true
            if (menuDTOS[i].childrenMenu) {
              menuDTOS[i].childrenMenu.forEach((menuDTO: { [x: string]: string }) => {
                routers[j].children.forEach((router) => {
                  if (menuDTO['menuUrl'] === routers[j]['path'] + '/' + router['path']) {
                    router.show = true
                  }
                })
              })
            }
          }
        }
      }

      routers.forEach((router: Router) => {
        router['open'] = false
      })
      setRouters([...routers])
    }
  }, [])
  // 侧边栏点击事件
  function handleClick(index: number) {
    routers[index].open = !routers[index].open
    setRouters([...routers])
  }

  // 监听路由 获取当前选中的路由
  useEffect(() => {
    let routerName = location.pathname.split('/')[1]
    routers.forEach((router: Router, index) => {
      if ('/' + routerName === router.path) {
        setActiveRouter(index)
      }
    })
  }, [location.pathname])

  return (
    <>
      <MyDrawer variant="permanent">
        <Toolbar
          sx={{
            height: barHeight,
          }}
        />
        <Box className="menu">
          <List className="menuList">
            {routers.map((prop, index) => {
              if (!prop.children && prop.show) {
                return (
                  <NavLink to={prop.path} key={index}>
                    <ListItem button key={prop.path} disablePadding className="list-item">
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        {prop.icon}
                      </ListItemIcon>
                      <ListItemText primary={prop.name} className="item-text" />
                    </ListItem>
                  </NavLink>
                )
              } else if (prop.children && prop.show) {
                let child = prop.children
                const nav = (
                  <Box className="item">
                    {child.map((item, childrenIndex) => {
                      if (item.show) {
                        const key = childrenIndex + '_child'
                        return (
                          <NavLink to={prop.path + '/' + item.path} key={key}>
                            <Collapse in={prop.open} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding className="btn">
                                <ListItem button>
                                  <ListItemIcon
                                    sx={{
                                      minWidth: 0,
                                    }}
                                  >
                                    {item.icon}
                                  </ListItemIcon>
                                  <ListItemText disableTypography={true} primary={item.name} className="second-text" />
                                </ListItem>
                              </List>
                            </Collapse>
                          </NavLink>
                        )
                      }
                    })}
                  </Box>
                )
                return (
                  <Box
                    sx={{
                      background: activeRouter === index ? '#2E3343' : '',
                    }}
                  >
                    <ListItem button onClick={() => handleClick(index)}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        {prop.icon}
                      </ListItemIcon>
                      <ListItemText disableTypography={true} primary={prop.name} className="item-text" />
                    </ListItem>
                    {nav}
                  </Box>
                )
              }
            })}
          </List>
        </Box>
      </MyDrawer>
    </>
  )
}
