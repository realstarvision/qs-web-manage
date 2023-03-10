import React, { useState } from 'react'
import { useHref, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getToken, removeUserInfo, getUserInfo } from '@/utils/auth'
import { styled } from '@mui/material/styles'
import { Toolbar, InputBase, Divider, Typography, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, AppBar } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { removeToken } from '@/utils/auth'
import { barHeight } from '@/config'
import stardust from '@/assets/image/png/stardust.png'
import avatar from '@/assets/image/Avatar.png'
import weatherPng from '@/assets/image/weather/weather.png'
import SvgIcon from '@/components/SvgIcon'
import { message } from 'antd'
import './header.scss'
import { use } from 'i18next'
import { isAbsolute } from 'path/win32'
import MenuList from './userList/userList'
import SimpleBackdrop from '@/components/Header/userList/components/usermeasge/usermesage'

// 自定义Header占位框
export const DrawerHeader = styled('div')(({ theme }) => ({
  height: barHeight,
  display: 'flex',
  alignItems: 'center',
  
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

// // 自定义menu
// export const MyMenu = styled(Menu)({
//   '& .MuiPaper-root': {
//     width: '300px',
//     height: '290px',
//     background: '#FFFFFF',
//     boxShadow: '-8px 8px 20px 0px rgba(0,0,0,0.2)',
//     borderRadius: '0px 0px 0px 0px',
//     opacity: 1,
//     paddingLeft: '13px',
//     paddingRight: '20px',
//     // boxShadow: '0px 0px 8px 0px rgba(43,48,63,0.5000)',
//     '& .MuiMenu-list': {
//       padding: '3px 0',
//     },
//   },
// })


// header 组件
export default function Header() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  // 绑定点击头像按钮，用于（打开/关闭）弹出框
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  // 设置头像框状态样式名
  const [anchorElClassName, setAnchorElClassName] = useState<null | string>('userPhoto')
  // 搜索框状态
  const [searchState, setSearchState] = useState<null | string | Number>('')
  // 隐藏弹出框 修改头像类名
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
    setAnchorElClassName('userPhoto')
  }
  // 显示弹出框 修改头像类名
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
    setAnchorElClassName('userPhotoOpen')
  }
  //搜索框事件
  const searchFunction = (event: any) => {
    setSearchState(event.target.value)
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
        style={{ height: 'barHeight', minHeight: '60px' }}
        sx={{
          height: barHeight,
        }}
      >
        {/* <img src={stardust} /> */}
        <SvgIcon svgName="logo" svgClass="logo"></SvgIcon>
        <Box className='titleQiaoSi'>乔司街道智慧护民管理后台</Box>
<Box className='weatherBigBox'>
        {/* 天气图标 */}
        <SvgIcon svgName="weather" svgClass="weatherIcon"></SvgIcon>
        {/* 天气接口 */}
        <Box className='weatherBox'>天气</Box>
        </Box>
        {/* 导航菜单 */}
        {/* <Box className='workAllBox'>
<Box className='workBox'>工作台</Box>
<Box  className='workCenterBox'>处理中心</Box>
<Box  className='workGovernmentBox'>政务大厅</Box>
</Box>
 */}
        {/*  用户搜索及头像个人信息 */}
        <Box className="user">
          <Box className='searchBox'>

            <InputBase
              placeholder="输入内容查询"
              className='searchInput'
              // classes={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
              value={searchState}
              onChange={searchFunction}
              inputProps={{ 'aria-label': 'search' }}
            />
            <SvgIcon svgName="addAfter" svgClass="searchIcon"></SvgIcon>
          </Box>
          {/* <Divider orientation="vertical" variant="middle" flexItem className="divider" /> */}

          {/* s 头像 */}
          <ClickAwayListener onClickAway={handleCloseUserMenu}>
            <Tooltip title='' className={anchorElClassName} arrow style={{ width: '32px', height: '32px', }}>
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

          {/* s 弹出框 */}
         <MenuList anchProps={anchorElUser}    />
        
          {/* <MyMenu
            sx={{ mt: '44px', mr: '20px' }}
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
          > */}
            {/* <Typography
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
              </Typography> */}
            {/* s 基本信息 */}

            {/* <Box className='userBox'>
              <Box>
                <Avatar
                  src={avatar}
                  sx={{
                    cursor: 'pointer',
                    marginTop: '5px',
                    '&:hover': {
                      opacity: 0.6,

                    },
                  }}
                />
              </Box> */}
              {/* <Box className='userMessage'>
                <Box className="user-info">
                  <Typography className="name">{getUserInfo() ? getUserInfo().userName : '暂无啊'} </Typography>
                  <Typography className="nameRole">{getUserInfo() ? getUserInfo().userName : '暂无啊'} </Typography>
                </Box>
                <Box className="user-info">
                  <Typography className="department">
                    {getUserInfo() && getUserInfo().roleEntitie ? getUserInfo().roleEntitie.roleName + ',' : 'XX职位' + `\u00A0\u00A0`}
                  </Typography>
                  <Typography className="department">
                    {getUserInfo() && getUserInfo().roleEntitie ? getUserInfo().roleEntitie.roleName : 'XX职务'}
                  </Typography>
                </Box>
              </Box>
            </Box> */}
            {/* <Box className='svgBox'>
              {<svg style={{ height: '20px', width: '20px', color: 'red' }}> <use xlinkHref={'#icon-order_menu_icon'} /></svg>}
            </Box> */}
            {/* e 基本信息 */}
            {/* <Typography
              textAlign="left"
              sx={{
                fontSize: '16px',
                paddingLeft: "13px",
                height: '55px',
                lineHeight: '55px',
                fontFamily: " PingFang SC-Regular, PingFang SC",

                cursor: 'pointer',
                minWidth: '55px',
                color: "#333333",


                '&:hover': {
                  background: '#eee',
                },
              }}
            >
              个人信息
            </Typography>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '16px',
                paddingLeft: "13px",
                height: '55px',
                lineHeight: '55px',
                fontFamily: " PingFang SC-Regular, PingFang SC",

                cursor: 'pointer',
                minWidth: '55px',
                color: "#333333",
                borderBottom: '1px solid #EBECED',
                borderTop: '1px solid #EBECED',
                '&:hover': {
                  background: '#eee',
                },
              }}
            >
              设置
            </Typography>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '16px',
                paddingLeft: "13px",
                height: '50px',
                lineHeight: '50px',
                fontFamily: " PingFang SC-Regular, PingFang SC",

                cursor: 'pointer',
                minWidth: '50px',
                color: "#333333",

                '&:hover': {
                  background: '#eee',
                },
              }}
            >
              修改密码
            </Typography>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '16px',
                paddingLeft: "13px",
                height: '50px',
                lineHeight: '50px',
                fontFamily: " PingFang SC-Regular, PingFang SC",

                cursor: 'pointer',
                minWidth: '50px',
                color: "#333333",

                '&:hover': {
                  background: '#eee',
                },
              }}
            >
              退出登录
            </Typography>
          </MyMenu> */}
          {/* e 弹出框 */}
        </Box>
       
      </Toolbar>
      {contextHolder}
    
    </AppBar>
  )
}
