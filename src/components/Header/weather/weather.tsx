import React from 'react'
import { Box } from '@mui/system'
import SvgIcon from '@/components/SvgIcon'





function weather() {
  return (
    <Box className='weatherBigBox'>
    {/* 天气图标 */}
    <SvgIcon svgName="weather" svgClass="weatherIcon"></SvgIcon>
    {/* 天气接口 */}
    <Box className='weatherBox'>天气</Box>
    </Box>
  )
}

export default weather