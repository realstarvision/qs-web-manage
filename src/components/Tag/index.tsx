import React from 'react'
import { Box } from '@mui/material'
import './style.scss'

export default function index({
  content,
  symbol,
  unchecked = false,
  background = '#2C3141',
  triangleColor = '#232734',
}: {
  content: string
  symbol?: string
  unchecked?: boolean
  background?: string
  triangleColor?: string
}) {
  return (
    <Box
      className="tag"
      style={{
        color: unchecked ? 'rgba(255,255,255,0.4)' : '',
        background: background,
      }}
    >
      {content}
      <Box className="triangle" style={{ borderColor: `transparent ${triangleColor} transparent transparent` }}>
        <span className="content">{symbol}</span>
      </Box>
    </Box>
  )
}
