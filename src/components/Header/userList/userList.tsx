import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getToken, removeUserInfo, getUserInfo } from '@/utils/auth'
import { styled } from '@mui/material/styles'
import { Toolbar, InputBase, Divider, Typography, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, AppBar } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { removeToken } from '@/utils/auth'
import { barHeight } from '@/config'
import stardust from '@/assets/image/png/stardust.png'
import avatar from '@/assets/image/Avatar.png'
import weatherPng from '@/assets/image/weather/weather.png'
import SvgIcon from '@/components/SvgIcon'
import { message } from 'antd'
// import './header.scss'
import { use } from 'i18next'
import SimpleBackdrop from '@/components/Header/userList/components/usermeasge/usermesage'
import PasswordBackdrop from '@/components/Header/userList/components/userPassword/userPassword'


function MenuCom({ anchProps, changePasswordFunC }) {
  // 个人信息遮罩层状态
  const [openDrop, setOpenDrop] = useState(false);
  //  个人遮罩层子传父修改状态
  const CloseDrop = function (value) {
    setOpenDrop(value)
  }


  // //修改密码遮罩层状态
  // const [openPassDrop, setOpenPassDrop] = useState(false);

  // // 密码遮罩层子传父修改状态
  // const ClosePassDrop = function (value) {
  //   setOpenPassDrop(value)
  // }


  // 退出登录遮罩层状态
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate()
  // 退出登录遮罩层开启事件
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  // 退出登录遮罩层确定事件
  const handleOkClose = () => {
    removeUserInfo()
    message.success('退出成功,2s后跳转到登录页');
    setOpenDialog(false);
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  };

  // 退出登录事件


  // 退出登录遮罩层取消事件
  const handleNoClose = () => {
    setOpenDialog(false);
  };
  // 退出登录遮罩层关闭事件
  const handleClose = () => {
    setOpenDialog(false);
  };

  // 自定义事件判断是否需要开启密码弹窗\
  // 修改密码弹窗在layout的header里面 是父组件而首次登录后提示用户修改密码弹窗在主体部分的index里面因此修改密码弹窗的useEffect执行速度要早于此处的

  useEffect(() => {
    // console.log('aaaa')
  })

  // 自定义menu
  const MyMenu = styled(Menu)({
    '& .MuiPaper-root': {
      overflowY: 'hidden',
      width: '280px',
      height: '290px',
      background: '#FFFFFF',
      boxShadow: '-8px 8px 20px 0px rgba(0,0,0,0.2)',
      borderRadius: '0px 0px 0px 0px',
      opacity: 1,
      paddingLeft: '13px',
      paddingRight: '20px',
      // boxShadow: '0px 0px 8px 0px rgba(43,48,63,0.5000)',
      '& .MuiMenu-list': {
        padding: '3px 0',
      },
    },
  })
  return (<MyMenu
    sx={{ mt: '40px', mr: '20px' }}
    id="menu-appbar"
    anchorEl={anchProps}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchProps)}
  >
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

    <Box className='userBox'>
      <Box>
        <Avatar
          src={avatar}
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '8px 8px 8px 8px',
            cursor: 'pointer',
            marginTop: '5px',
            '&:hover': {
              opacity: 0.6,

            },
          }}
        />
      </Box>
      <Box className='userMessage'>
        <Box className="user-info">
          <Typography className="name">{getUserInfo() ? getUserInfo().name : '暂无啊'} </Typography>
          <Typography className="nameRole">{getUserInfo() ? getUserInfo()?.roleEntity?.roleDescr : '暂无啊'} </Typography>
        </Box>
        <Box className="user-info">
          <Typography className="department">
            {getUserInfo() && getUserInfo().roleEntity ? getUserInfo()?.roleEntity?.roleDescr + ',' : 'XX职位' + `\u00A0\u00A0`}
          </Typography>
          <Typography className="department">
            {getUserInfo() && getUserInfo().roleEntity ? getUserInfo()?.roleEntity?.roleDescr : 'XX职务'}
          </Typography>
        </Box>
      </Box>
    </Box>
    {/* <Box className='svgBox'>
    {<svg style={{ height: '20px', width: '20px', color: 'red' }}> <use xlinkHref={'#icon-order_menu_icon'} /></svg>}
  </Box> */}
    {/* e 基本信息 */}
    <Typography
      component="li"
      textAlign="left"
      onClick={() => {
        setOpenDrop(true)
      }}
      sx={{
        fontSize: '16px', paddingLeft: "12px",
        height: '50px', lineHeight: '55px',
        fontFamily: " PingFang SC-Regular, PingFang SC",
        cursor: 'pointer', minWidth: '54px',
        color: "#333333", '&:hover': {
          background: '#eee',
        },
      }}>
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
      onClick={() => {
        changePasswordFunC()
      }}
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

      onClick={() => {
        handleClickOpen()
      }}
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
    {/* 退出登录弹窗 */}
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        温馨提示
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          您确定要退出吗?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNoClose}>取消</Button>
        <Button onClick={handleOkClose} autoFocus> 确定 </Button>
      </DialogActions>
    </Dialog>
    <SimpleBackdrop opEn={openDrop} closDropChild={CloseDrop} />
    <PasswordBackdrop />
  </MyMenu>

  )

}

// 定义修改全局状态的方法
const changePasswordKey = (dispatch) => {
  return {
    changePasswordFunC() {
      dispatch({ type: 'changePasswordType' })
    }
  }
}

export default connect(null, changePasswordKey)(MenuCom)