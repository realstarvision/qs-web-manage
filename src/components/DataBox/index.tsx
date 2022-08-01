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
  // const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  // const handlePopoverOpen = (event: any): void => {
  //   setAnchorEl(event.currentTarget)
  // }

  // let handlePopoverClose = (): void => {
  //   setAnchorEl(null)
  // }
  // const open = Boolean(anchorEl)

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
        {/* <SvgIcon
          fontSize="inherit"
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup={true}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{
            verticalAlign: 'middle',
          }}
        >
          <ErrorOutlineOutlinedIcon />
        </SvgIcon>
        <Popover
          id="mouse-over-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          sx={{
            pointerEvents: 'none',
          }}
          disableRestoreFocus
        >
          <Typography sx={{ p: 2 }}>数据库里数据总量</Typography>
        </Popover> */}
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
