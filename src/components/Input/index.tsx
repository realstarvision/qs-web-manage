import React from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'


const Input = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '14px',
    fontWeight: 500,
    color: '#666666 ',
    background:'#F2F3F5',
    height:'100%',
    '& fieldset': {
      border: 'none',
   
    },
    'input':{
      caretColor:'#333',
 
     
      borderRadius: '3px',
      '&::-webkit-input-placeholder':{
        color: '#BFBFBF',
      
       
      },
      '&:-ms-input-placeholder':{
        color: '#BFBFBF',
      
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
    padding: '6.5px 14px !important',
    '&::-webkit-input-placeholder':{
      color: '#BFBFBF',
    
     
    },
 
  },

})

export default Input
