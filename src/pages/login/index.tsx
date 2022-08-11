import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeCanvas from 'qrcode.react'
import { setToken, setUserInfo } from '@/until/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getLoginUrl, getUserInfo } from '@/api/user'
import Snackbar from '@/components/Snackbar'
import './style.scss'
import starVision from '@/assets/image/png/starVision.png'
import refreshQR from '@/assets/image/png/refreshQR.png'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [qrUrl, setQrUrl] = useState('')
  const [QRCodeState, setQRCodeState] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)

  // 获取用户信息接口
  let getUserInfoData = (uuid: string, timer: string | number | NodeJS.Timer | undefined) => {
    getUserInfo({ clientId: 0, uuid: uuid }).then((res: any) => {
      if (res.code === 0) {
        setUserInfo(res.data)
        clearInterval(timer)
        navigate('/')
      } else if (res.code === 10004) {
        setOpenMessage(true)
        clearInterval(timer)
      }
    })
  }

  // 获取登录地址接口
  const getLoginUrlData = (uuid: string) => {
    getLoginUrl({ clientId: 0, uuid: uuid }).then((res) => {
      setQrUrl(res.data)
      setToken(uuid)
      let timer = setInterval(() => {
        getUserInfoData(uuid, timer)
      }, 500)

      setTimeout(() => {
        clearInterval(timer)
        setQRCodeState(true)
      }, 120000)
    })
  }

  // 初始化
  useEffect(() => {
    initData()
  }, [])

  // 初始化事件
  let initData = () => {
    const uuid = uuidv4()
    getLoginUrlData(uuid)
  }

  // 二维码失效重新获取点击事件
  let handleQRClick = () => {
    initData()
    setQRCodeState(false)
  }

  // 提示框关闭事件
  let handleClose = () => {
    setOpenMessage(false)
  }

  let handleClick = () => {
    alert('121651')
  }
  return (
    <Box className="container">
      <Snackbar
        open={openMessage}
        message="暂无权限，请联系人事开通！"
        onClose={handleClose}
        background="#232734"
      ></Snackbar>
      <Box className="login_box">
        <img src={starVision} className="starvisonIcon" onClick={handleClick} />
        <Box className="qrCode_box">
          <Box className="qrCode">
            <Box
              sx={{
                width: '110px',
                position: 'relative',
              }}
            >
              <QRCodeCanvas
                id="qrCode"
                renderAs="svg"
                value={qrUrl}
                size={300}
                fgColor="#1C1C25"
                bgColor="#616C8C"
                style={{ margin: 'auto', width: '110px', height: '110px' }}
                level="M"
              ></QRCodeCanvas>
              {QRCodeState ? (
                <Box onClick={handleQRClick} className="qrCode_shade">
                  <Box className="box">
                    {/* <SvgIcon svgName="refreshQR" svgClass="icon"></SvgIcon> */}
                    <img src={refreshQR} className="icon" />
                    <Typography className="font">请刷新二维码</Typography>
                  </Box>
                </Box>
              ) : (
                ''
              )}
            </Box>
            <Typography className="hint" component="p">
              {t('login.prompt')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
