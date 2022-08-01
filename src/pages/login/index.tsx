import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeCanvas from 'qrcode.react'
import { setToken, setUserInfo } from '@/until/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getLoginUrl, getUserInfo } from '@/api/user'
import './style.scss'
import starVision from '@/assets/image/png/starVision.png'
// import QRCode from '@/assets/image/png/QRCode.png'
import pcIcon from '@/assets/image/png/pc_icon.png'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [qrUrl, setQrUrl] = useState('')

  let getUserInfoData = (uuid: string, timer: string | number | NodeJS.Timer | undefined) => {
    getUserInfo({ clientId: 0, uuid: uuid }).then((res: any) => {
      if (res.code === 0) {
        setUserInfo(res.data)
        setToken(uuid)
        clearInterval(timer)
        navigate('/')
      }
    })
  }

  useEffect(() => {
    const uuid = uuidv4()
    getLoginUrl({ clientId: 0, uuid: uuid }).then((res) => {
      setQrUrl(res.data)
      const timer = setInterval(() => {
        getUserInfoData(uuid, timer)
      }, 500)
    })
    return () => {}
  }, [])

  return (
    <Box className="container">
      <Box className="login_box">
        <img src={starVision} className="starvisonIcon" />
        <Box className="banner">
          <Typography className="title" component="p">
            {t('login.title')}
          </Typography>
          <Typography className="subTitle" component="p">
            {t('login.subTitle')}
          </Typography>
        </Box>
        <Box className="qrCode_box">
          <Box className="qrCode">
            {/* <img src={qrUrl} /> */}
            {/* <div id="qrinvitecode"></div> */}
            <QRCodeCanvas
              id="qrCode"
              value={qrUrl}
              size={110}
              fgColor="#000"
              bgColor="#aebdd8"
              style={{ margin: 'auto' }}
              level="M"
              includeMargin
            ></QRCodeCanvas>
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
