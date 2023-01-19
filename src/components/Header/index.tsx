import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getToken, removeUserInfo, getUserInfo } from '@/utils/auth'
import { styled } from '@mui/material/styles'
import { Toolbar, Divider, Typography, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, AppBar } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { removeToken } from '@/utils/auth'
import { barHeight } from '@/config'
import stardust from '@/assets/image/png/stardust.png'
import avatar from '@/assets/image/avatar.png'
import SvgIcon from '@/components/SvgIcon'
import { message } from 'antd'
import './header.scss'

// 自定义Header占位框
export const DrawerHeader = styled('div')(({ theme }) => ({
  height: barHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

// 自定义menu
export const MyMenu = styled(Menu)({
  '& .MuiPaper-root': {
    background: '#fff',
    // boxShadow: '0px 0px 8px 0px rgba(43,48,63,0.5000)',
    '& .MuiMenu-list': {
      padding: '3px 0',
    },
  },
})

export default function Header() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  // 绑定点击头像按钮，用于（打开/关闭）弹出框
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  // 隐藏弹出框
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // 显示弹出框
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  // 退出登录事件
  const handleLogout = () => {
    removeUserInfo()
    messageApi.success('退出成功，2s后跳转到登录页')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <AppBar
      position="fixed"
      className="header"
      sx={{
        zIndex: 100,
      }}
    >
      <Toolbar
        className="bar"
        sx={{
          height: barHeight,
        }}
      >
        {/* <img src={stardust} /> */}
        <SvgIcon svgName="logo" svgClass="logo"></SvgIcon>

        <Box className="user">
          {/* <Divider orientation="vertical" variant="middle" flexItem className="divider" /> */}

          {/* s 头像 */}
          <ClickAwayListener onClickAway={handleCloseUserMenu}>
            <Tooltip title="" arrow>
              <Avatar
                onClick={handleOpenUserMenu}
                src={avatar}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.6,
                  },
                }}
              />
            </Tooltip>
          </ClickAwayListener>
          {/* e 头像 */}

          {/* s 基本信息 */}
          {/* <Box className="user-info">
            <Typography className="name">{getUserInfo() ? getUserInfo().userName : ''} </Typography>
            <Typography className="department">
              {getUserInfo() && getUserInfo().roleEntitie ? getUserInfo().roleEntitie.roleName : '无职务'}
            </Typography>
          </Box> */}
          {/* e 基本信息 */}

          {/* s 弹出框 */}
          <MyMenu
            sx={{ mt: '45px', mr: '20px' }}
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
            <Typography
              textAlign="center"
              sx={{
                fontSize: '12px',
                padding: '8px',
                margin: '5px 0',
                cursor: 'pointer',
                minWidth: '70px',
                '&:hover': {
                  background: '#eee',
                },
              }}
              onClick={handleLogout}
            >
              {t('header.logout')}
            </Typography>
          </MyMenu>
          {/* e 弹出框 */}
        </Box>
      </Toolbar>
      {contextHolder}
    </AppBar>
  )
}
