import * as React from 'react'
import { styled } from '@mui/material/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'

const MyKeyboardDatePicker = styled(KeyboardDatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    paddingLeft:'14px',
    color: '#666666',
    fontSize: '14px',
    fontWeight: '500',
  },
  '& .MuiInput-underline': {
    '&:before': {
      borderColor: '#6D6D6D',
      border:'none',
    },
    '&:after': {
       border:'none',
      borderColor: '#fff',
    },
    '&:hover': {
      '&:not(.Mui-disabled):before': {
        borderColor: '#858585',
        border:'none',
      },
    },
  },
  'input':{
    caretColor:'#333',
    // background:'#F2F3F5',
    borderRadius: '4px',
    '&::-webkit-input-placeholder':{
      color: '#c1c1c1',
    },
    '&:-ms-input-placeholder':{
      color: '#c1c1c1',
    }
  }
}))

export default MyKeyboardDatePicker
