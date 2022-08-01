import React from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const Input = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '12px',
    fontWeight: 300,
    color: '#FFFFFF',
    width: '140%',
    height: '26px',
    '& fieldset': {
      border: 'none',
      background: '#232734',
      borderRadius: '2px',
      opacity: '0.6',
    },
  },
})

export default Input
