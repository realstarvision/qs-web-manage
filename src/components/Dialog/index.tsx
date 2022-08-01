import React, { useEffect, useRef } from 'react'
import { Box, Typography, Divider, Fade } from '@mui/material'

export default function index({ children, visible, onClose }: { children: any; visible: boolean; onClose: Function }) {
  // 获取元素
  const dialogRef = useRef(null)
  // 关闭事件
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target == dialogRef.current) {
      onClose(false)
    }
  }
  return (
    <Fade in={visible as boolean | undefined} timeout={500}>
      <Box
        key="amache"
        ref={dialogRef}
        onClick={(e) => handleClose(e)}
        sx={{
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(10px)',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Fade>
  )
}
