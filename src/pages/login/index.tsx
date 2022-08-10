import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeCanvas from 'qrcode.react'
import { setToken, setUserInfo } from '@/until/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getLoginUrl, getUserInfo } from '@/api/user'
import SvgIcon from '@/components/SvgIcon'
import { menuRouter } from '@/router'
import './style.scss'
import starVision from '@/assets/image/png/starVision.png'
// import QRCode from '@/assets/image/png/QRCode.png'
import pcIcon from '@/assets/image/png/pc_icon.png'
import logo from '@/assets/image/png/logo.png'
import refreshQR from '@/assets/image/png/refreshQR.png'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [qrUrl, setQrUrl] = useState('')
  const [QRCodeState, setQRCodeState] = useState(false)

  // 获取用户信息接口
  let getUserInfoData = (uuid: string, timer: string | number | NodeJS.Timer | undefined) => {
    getUserInfo({ clientId: 0, uuid: uuid }).then((res: any) => {
      if (res.code === 0) {
        // 处理路由权限
        // const menuDTOS = res.data.menuDTOS
        // for (let i = 0; i < menuDTOS.length; i++) {
        //   for (let j = 0; j < menuRouter.length; j++) {
        //     if (menuDTOS[i]['menuUrl'] === menuRouter[j]['path']) {
        //       menuRouter[j].show = true
        //       if (menuDTOS[i].childrenMenu) {
        //         menuDTOS[i].childrenMenu.forEach((menuDTO: { [x: string]: string }) => {
        //           menuRouter[j].children.forEach((router) => {
        //             if (menuDTO['menuUrl'] === menuRouter[j]['path'] + '/' + router['path']) {
        //               router.show = true
        //             }
        //           })
        //         })
        //       }
        //     }
        //   }
        // }
        // // 筛选处理后的路由
        // let newMenuRouter = menuRouter.filter((router) => {
        //   if (router.show && router.children) {
        //     return router.children.filter((childRouter) => {
        //       if (childRouter.show) {
        //         return childRouter
        //       }
        //     })
        //   } else if (router.show) {
        //     return router
        //   }
        // })

        // // res.data.filterMenuDTOS = newMenuRouter
        // let userInfo = {
        //   avatarUrl: res.data.avatarUrl,
        //   depts: res.data.depts,
        //   filterMenuDTOS: newMenuRouter,
        //   nick: res.data.nick,
        //   title: res.data.title,
        // }
        setUserInfo(res.data)
        clearInterval(timer)
        navigate('/')
      }
    })
  }

  // 获取登录地址接口
  const getLoginUrlData = (uuid: string) => {
    getLoginUrl({ clientId: 0, uuid: uuid }).then((res) => {
      setQrUrl(res.data)
      setToken(uuid)
      const timer = setInterval(() => {
        getUserInfoData(uuid, timer)
      }, 500)

      setTimeout(() => {
        clearTimeout(timer)
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

  return (
    <Box className="container">
      <Box className="login_box">
        <img src={starVision} className="starvisonIcon" />
        {/* <Box className="banner">
          <Typography className="title" component="p">
            {t('login.title')}
          </Typography>
          <Typography className="subTitle" component="p">
            {t('login.subTitle')}
          </Typography>
        </Box> */}
        <Box className="qrCode_box">
          <Box className="qrCode">
            {/* <img src={qrUrl} /> */}
            {/* <div id="qrinvitecode"></div> */}
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
                // imageSettings={{
                //   src: logo,
                //   width: 98,
                //   height: 24,
                //   excavate: true,
                // }}
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
