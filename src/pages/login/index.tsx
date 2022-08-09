import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeCanvas from 'qrcode.react'
import { setToken, setUserInfo } from '@/until/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getLoginUrl, getUserInfo } from '@/api/user'
import { menuRouter } from '@/router'
import './style.scss'
import starVision from '@/assets/image/png/starVision.png'
// import QRCode from '@/assets/image/png/QRCode.png'
import pcIcon from '@/assets/image/png/pc_icon.png'
import logo from '@/assets/image/png/logo.png'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [qrUrl, setQrUrl] = useState('')

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
        //   filterMenuDTOS: menuRouter,
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
    })
  }

  // 初始化
  useEffect(() => {
    const uuid = uuidv4()
    getLoginUrlData(uuid)
    let timerQR = setInterval(() => {
      getLoginUrlData(uuid)
    }, 180000)

    return () => {
      clearInterval(timerQR)
    }
  }, [])

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
            <QRCodeCanvas
              id="qrCode"
              renderAs="svg"
              value={qrUrl}
              size={300}
              fgColor="#1C1C25"
              bgColor="#616C8C"
              style={{ margin: 'auto', width: '110px', height: '110px' }}
              level="M"
              // includeMargin
              // imageSettings={{
              //   src: logo,
              //   width: 98,
              //   height: 24,
              //   excavate: true,
              // }}
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
