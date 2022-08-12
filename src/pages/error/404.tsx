import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Button from '@/components/Button'
import s from './404.module.scss'

function error404() {
  let navigate = useNavigate()

  let handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <Box className={s.error404}>
        <Box>
          <Typography className={s.font}>页面不存在!</Typography>
          <Button onClick={handleClick} className={s.btn}>
            返回首页
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default error404
