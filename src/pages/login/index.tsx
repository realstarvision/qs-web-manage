import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeCanvas from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import { setToken, setUserInfo } from '@/utils/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, FormLabel, InputAdornment } from '@mui/material'
import { LoadingButton as Button } from '@/components/Button'
import Input from '@/components/Input'
import { Login } from '@/api/user'
import SvgIcon from '@/components/SvgIcon'
import './style.scss'

// 图片
import logo from '@/assets/image/logo.png'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // 眼睛（密码）
  let [eyeState, setEyeState] = useState(true)
  // 登录加载状态
  let [loading, setLoading] = useState(false)
  // 报错消息
  const [helperText, setHelperText] = useState('')
  const [openMessage, setOpenMessage] = useState(false)
  const [params, setParams] = useState({
    name: '',
    password: '',
  })

  /* 登录 */
  const handleLogin = () => {
    setHelperText('')
    setLoading(true)
    Login(params)
      .then(({ data, code }: any) => {
        if (code === 200) {
          setUserInfo(data)
          navigate('/')
        } else {
          setHelperText(t('login.helperText'))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  /* 键盘按下登录 */
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleLogin()
    }
  }
  /* 设置账户密码 */
  const handleUsernameChange = (e) => {
    params.name = e.target.value
    setParams({ ...params })
  }
  const handlePhoneNumberChange = (e) => {
    params.password = e.target.value
    setParams({ ...params })
  }

  /* 密码眼睛切换 */
  const handleEyeClick = () => {
    eyeState = !eyeState
    setEyeState(eyeState)
  }
  return (
    <Box className="login-container">
      <Box className="login-wapper">
        <img src={logo} className="logo_img" />
        <Grid
          container
          spacing={{ xs: 4 }}
          sx={{
            padding: '20px 0',
            width: '400px !important',
          }}
          className="grid"
        >
          <Grid item xs={12} className="from-item">
            <Input
              required
              id="dataInput"
              size="small"
              placeholder={t('login.userPlaceholder')}
              // value={formParams.firstInput}
              onChange={handleUsernameChange}
              autoComplete="off"
              style={{
                width: '65%',
              }}
            />
          </Grid>

          <Grid item xs={12} className="from-item">
            <Input
              onKeyDown={handleKeyUp}
              required
              id="phoneInput"
              size="small"
              placeholder={t('login.passwordPlaceholder')}
              value={params.password}
              onChange={handlePhoneNumberChange}
              autoComplete="off"
              style={{
                width: '65%',
              }}
              type={eyeState ? 'password' : 'text'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SvgIcon
                      svgName={eyeState ? 'eye_hidden' : 'eye_visible'}
                      svgClass="icon"
                      onClick={handleEyeClick}
                    ></SvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} className="from-item">
            <Button
              onClick={handleLogin}
              loading={loading}
              sx={{
                width: '65%',
                height: '36px',
                background: '#2E6EDF',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '12px',
                '&:hover': {
                  background: '#2E6EDF',
                },
              }}
            >
              {t('login.btnText')}
            </Button>
          </Grid>
          {/* <Grid item xs={12} className="from-item"> */}
          <CSSTransition
            in={Boolean(helperText)}
            //动画时间
            timeout={1000}
            // 前缀名注意S
            classNames="DeclineIn"
          >
            <span className="error">{helperText}</span>
          </CSSTransition>

          {/* </Grid> */}
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
