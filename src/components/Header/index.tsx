import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/api/user'
import { getToken, removeUserInfo, getUserInfo } from '@/until/auth'
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import { Toolbar, Divider, Typography, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, AppBar } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { removeToken } from '@/until/auth'
import { barHeight } from '@/config'
import stardust from '@/assets/image/png/stardust.png'
import avatar from '@/assets/image/png/avatar.png'
import './header.scss'

export const DrawerHeader = styled('div')(({ theme }) => ({
  height: barHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

export const MyMenu = styled(Menu)({
  '& .MuiPaper-root': {
    background: 'linear-gradient(180deg, #AEBDD8 0%, #7E98C8 85%, #8499BF 100%)',
    boxShadow: '0px 0px 8px 0px rgba(43,48,63,0.5000)',
    '& .MuiMenu-list': {
      padding: '3px 0',
    },
  },
})

export default function Header() {
  const settings = ['退出']
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  // 隐藏弹出框
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // 显示弹出框
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
    console.log(getUserInfo())
  }

  // 退出登录事件
  const handletLogout = () => {
    // logout({ clientId: 0, uuid: getToken() }).then((res: any) => {
    //   if (res.code === 0) {
    removeUserInfo()
    removeToken()
    navigate('/login')
    handleCloseUserMenu()
    // }
    // })
  }

  return (
    <AppBar
      position="fixed"
      className="header"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        className="bar"
        sx={{
          height: barHeight,
        }}
      >
        <img src={stardust} />
        <Typography sx={{ display: { xs: 'none', md: 'flex' } }} className="title">
          综合管理系统
        </Typography>

        <Box className="user">
          <Divider orientation="vertical" variant="middle" flexItem className="divider" />
          <ClickAwayListener onClickAway={handleCloseUserMenu}>
            <Tooltip title="" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={getUserInfo().avatarUrl || avatar} />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
          <Box className="user-info">
            <Typography className="name">{getUserInfo().nick}</Typography>
            <Typography className="department">
              {getUserInfo().title + '-' + getUserInfo().depts[0].deptName}
            </Typography>
          </Box>
          <MyMenu
            sx={{ mt: '45px', ml: '20px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={handletLogout}
                sx={{
                  color: '#ffffff99',
                  ':hover': {
                    background: 'none',
                    color: '#fff',
                  },
                }}
              >
                <Typography textAlign="center" sx={{ fontSize: '12px' }}>
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </MyMenu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
