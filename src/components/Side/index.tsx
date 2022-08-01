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
    routers.forEach((router: Router) => {
      router['open'] = false
    })
  }, [])
  //
  function handleClick(index: number) {
    routers[index].open = !routers[index].open
    setRouters([...routers])
  }

  // 监听路由
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
            {menuRouter.map((prop, index) => {
              if (!prop.children) {
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
              } else {
                let child = prop.children
                const nav = (
                  <Box className="item">
                    {child.map((item, childrenIndex) => {
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
      {/* <DrawerHeader>
        <IconButton onClick={handleClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider /> */}

      {/* 菜单列表
      <List className="menuList">
        {menuRouter.map((prop, index) => {
          if (!prop.children) {
            return (
              <NavLink to={prop.path} key={index}>
                <ListItem button key={prop.path} disablePadding sx={{ display: 'block' }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {prop.icon}
                  </ListItemIcon>
                  <ListItemText primary={prop.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItem>
              </NavLink>
            )
          } else {
            let child = prop.children
            const nav = (
              <Box className="item">
                {child.map((item, childrenIndex) => {
                  const key = childrenIndex + '_child'
                  return (
                    <NavLink to={prop.path + '/' + item.path} key={key}>
                      <Collapse in={prop.open} timeout="auto" unmountOnExit>
                        <List
                          component="div"
                          disablePadding
                          sx={{
                            marginLeft: '15px',
                            color: '#666',
                          }}
                          className="btn"
                        >
                          <ListItem button>
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText disableTypography={true} primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                          </ListItem>
                        </List>
                      </Collapse>
                    </NavLink>
                  )
                })}
              </Box>
            )
            return (
              <Box>
                <ListItem button onClick={() => handleClick(index)}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {prop.icon}
                  </ListItemIcon>
                  <ListItemText disableTypography={true} primary={prop.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItem>
                {nav}
              </Box>
            )
          }
        })}
      </List> */}
    </>
  )
}
