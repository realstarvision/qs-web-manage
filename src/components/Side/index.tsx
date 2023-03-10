import React, { useState, useEffect } from 'react'
import { NavLink, useLocation,useNavigate} from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Box, Collapse, Toolbar, Drawer } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { menuRouter, Router } from '@/router'
import { drawerWidth, barHeight } from '@/config'
import { getUserInfo } from '@/utils/auth'
import './side.scss'

// 自定义Drawer样式
const MyDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: 99,
  '& .MuiPaper-root': {
    background: '#fff',
  },
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    border: 'none',
  },
}))

export default function index() {
  const navigator=useNavigate()
  const location = useLocation()
  // 菜单路由
  const [routers, setRouters] = useState<Router[]>(menuRouter)
  // 当前选中的路由
  const [activeRouter, setActiveRouter] = useState<number>(0)

  // 初始化用户路由权限
  useEffect(() => {
    // if (getUserInfo()) {
    //   const menuDTOS = getUserInfo().menuDTOS

    //   for (let i = 0; i < menuDTOS.length; i++) {
    //     for (let j = 0; j < routers.length; j++) {
    //       if (menuDTOS[i]['menuUrl'] === routers[j]['path']) {
    //         routers[j].show = true
    //         if (menuDTOS[i].childrenMenu) {
    //           menuDTOS[i].childrenMenu.forEach((menuDTO: { [x: string]: string }) => {
    //             if (routers[j].children) {
    //               routers[j].children.forEach((router) => {
    //                 if (menuDTO['menuUrl'] === routers[j]['path'] + '/' + router['path']) {
    //                   router.show = true
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       }
    //     }
    //   }
    // }

    menuRouter.forEach((router: Router) => {
      router['open'] = false
    })

    console.log(menuRouter)
    setRouters([...routers])
  }, [])

  // 侧边栏点击事件
  function handleClick(index: number) {
    // console.log('bbb')
    routers[index].open = !routers[index].open
    setRouters([...routers])
    // 点击跳转至子路由的第一项
    navigator(routers[index].path+'/'+routers[index].children[0].path)
  }

  // 监听路由 获取当前选中的路由
  useEffect(() => {
    setActiveRouter(0)
    let routerName = location.pathname.split('/')[1]
    routers.forEach((router: Router, index) => {

      if ('/' + routerName === router.path ) {
        setActiveRouter(index)
         router['open']=true
        setRouters([...routers])
        // console.log(router.path)
        // console.log('/' + routerName === router.path)
      }
      // else{
      //   setActiveRouter(0)
      // }
    })
    // console.log(location.pathname)

    // console.log('/' + routerName)
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
              // 显示只有一级路由的路由
              if (!prop.children) {
                return (
                  <NavLink to={prop.children[0].path} key={index}>
                    <ListItem button key={prop.path} disablePadding className="list-item">
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        {prop.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={prop.name}
                        className="item-text"
                        style={{
                          fontSize: '14px !important',
                        }}
                      />
                    </ListItem>
                  </NavLink>
                )
                // 显示有二级路由的路由
              } else if (prop.children) {
                let child = [...prop.children]
                // 删除第一项：第一项是给一级路由重定向使用的
              child.shift()
                const nav = (
                  <Box className="item">
                 
                    {child.map((item, childrenIndex) => {
                      const key = childrenIndex + '_child'
                      return (

                       <NavLink to={prop.path + '/' + item.path} key={key}  >
                          <Collapse in={prop.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className="btn">
                              <ListItem button className="list-item">
                                {/* <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                  }}
                                >
                                  {item.icon}
                                </ListItemIcon> */}
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
                  sx={{color:activeRouter===index?'#165DFF':'#666666'}}
                  //  sx={{backgroundColor:activeRouter?'red':''}}
                  >
                    <ListItem button onClick={() => handleClick(index)}  style={{height:'40px'}}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                       color:activeRouter===index?'#165DFF':'#666666',
                        }}
                      >
                          {/* 判断当前路由与对应组件的索引是否一致，一致说明当前选中，则其一级路由应为蓝色 */}
                        {/* 当前选中的更换icon */}
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
