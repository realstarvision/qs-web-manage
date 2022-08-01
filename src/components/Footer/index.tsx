import React from 'react'
import { Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import SvgIcon from '@/components/SvgIcon'
import './footer.scss'

export const DrawerFooter = styled('div')(({ theme }) => ({
  height: '40px',
  boxSizing: 'border-box',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
}))

export default function Footer() {
  return (
    <>
      <Box className="footer">
        <Typography className="copyright">© 2022 STAR.VISION All rights reserved.</Typography>
        <SvgIcon svgName="logo" svgClass="icon"></SvgIcon>
      </Box>
    </>
  )
}
