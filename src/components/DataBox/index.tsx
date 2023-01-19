import React from 'react'
import s from './styles.module.scss'
import { Box, Typography, SvgIcon, Popover } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

export interface warning {
  key: string
  count: number
  title: string
}

export default function DataBox({ warning, bg }: { warning: warning; bg: string }) {
  return (
    <Box
      className={s.container}
      sx={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Box>
        <Typography component="p" className={s.title}>
          {warning.title}
        </Typography>
        <Typography component="p" className={s.count}>
          {warning.count}
        </Typography>
      </Box>
    </Box>
  )
}
