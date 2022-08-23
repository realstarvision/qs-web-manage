import React from 'react'
import s from './styles.module.scss'
import { Box, Typography, SvgIcon, Popover } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

export interface Sentinel {
  satelliteName: string
  weekList: any
  dayList: any
  id: number
  remark: string
  satelliteBands: Array<string>
  title: string
  satelliteResolutionRatio: string
  dataUsage: number
  dataNum: number
  dataType: number
}

export default function DataBox({ satellite, bg }: { satellite: Sentinel; bg: string }) {
  return (
    <Box
      className={s.container}
      sx={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Box>
        <Typography component="span" className={s.title}>
          {satellite.title}
        </Typography>
      </Box>
      <Typography component="span" className={s.memony}>
        {satellite.dataUsage > 1000 ? (satellite.dataUsage / 1000).toFixed(1) : satellite.dataUsage.toFixed(1)}
        {
          <span
            style={{
              fontSize: '12px',
              marginLeft: '5px',
            }}
          >
            {satellite.dataUsage > 1000 ? 'TB' : 'GB'}
          </span>
        }
      </Typography>
      <Typography component="span" className={s.count}>
        {satellite.dataNum + '条'}
      </Typography>
    </Box>
  )
}
