import React from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const Input = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '14px',
    fontWeight: 500,
    color: '#666666',
    background:'#F2F3F5',
    '& fieldset': {
      border: 'none',
    },
    'input':{
      caretColor:'#333',
      // background:'#F2F3F5',
      borderRadius: '3px',
      '&::-webkit-input-placeholder':{
        color: '#c1c1c1',
      },
      '&:-ms-input-placeholder':{
        color: '#c1c1c1',
      }
    }
  },
  // '& .MuiPopover-root': {
  //   '& .MuiPaper-root': {
  //     background: '#353B4D',
  //     '& .MuiMenu-list': {
  //       height: '200px !important',
  //     },
  //   },
  // },
})

export const MyInput = styled(Input)({
  '& .MuiInputBase-input':{
    padding: '6.5px 14px !important'
  }
})

export default Input
