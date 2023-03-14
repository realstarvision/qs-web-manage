import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeCanvas from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import { setUserInfo, setToken, getUserInfo } from '@/utils/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, FormLabel, InputAdornment } from '@mui/material'
import { LoadingButton as Button } from '@/components/Button'
import Input from '@/components/Input'
import { Login } from '@/api/user'
import SvgIcon from '@/components/SvgIcon'
import './style.scss'

const Home = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // 眼睛（密码）
  let [eyeState, setEyeState] = useState(true)
  // 登录加载状态
  let [loading, setLoading] = useState(false)
  // 报错消息
  const [helperText, setHelperText] = useState('')
  const [openMessage, setOpenMessage] = useState(false)
  const [butBol, setButBol] = useState(false)
  const [params, setParams] = useState({
    account: '',
    password: '',
  })

  /* 登录 */
  const handleLogin = () => {
    setHelperText('')
    setLoading(true)
    // setHelperText('密码错误')
    Login(params)
      .then(({ data, code, msg }: any) => {
        if (code === 200) {
          setUserInfo(data)
          setToken(data.token)
          navigate('/')
          console.log(getUserInfo());

        } else {
          setHelperText(msg)
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

    params.account = e.target.value
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
  useEffect(() => {
    if (params?.account && params?.password) {
      setButBol(false)
    }
  }, [params])
  return (
    <Box className="login-container">
      <Box className="loginMain">
        <Box className="loginMainTop">
          <Box className="loginMainTitle">智慧乔司</Box>
          <Box>
            <Grid
              container
              sx={{
                width: '100% !important',
              }}
              className="grid"
            >
              <Grid item xs={12} className="from-item">
                <Input
                  required
                  id="dataInput"
                  size="small"
                  placeholder={'请输入账号'}
                  value={params.account}
                  onChange={handleUsernameChange}
                  autoComplete="off"
                  style={{
                    width: '100%',
                    marginBottom: '28px',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon svgName="userID" svgClass="icon"></SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} className="from-item">
                <Input
                  onKeyDown={handleKeyUp}
                  required
                  id="phoneInput"
                  size="small"
                  placeholder={'请输入密码'}
                  value={params.password}
                  onChange={handlePhoneNumberChange}
                  autoComplete="off"
                  style={{
                    width: '100%',
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
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon svgName="password" svgClass="icon"></SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Box className="loginForGPass">
                {' '}
                <a>忘记密码</a>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box className="loginMainBottom">
          <CSSTransition
            in={Boolean(helperText)}
            //动画时间
            timeout={1000}
            // 前缀名注意S
            classNames="DeclineIn"
          >
            <span
              className="error"
              style={{
                color: ' #DF2E2E',
                fontSize: '12px',
              }}
            >
              {helperText}
            </span>
          </CSSTransition>
          <Grid container xs={12} className="from-item">
            <Button
              className="loginButton"
              onClick={handleLogin}
              loading={loading}
              disabled={butBol}
              style={{
                background: `${params.account === '' || params.password === '' || butBol === true ? '#B9CEFF' : '#165DFF'
                  }`,
              }}
            >
              {/* {t('login.btnText')} */}
              登录
            </Button>
          </Grid>
          {/* <Grid item xs={12} className="from-item"> */}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
