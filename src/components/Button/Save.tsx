import React from 'react'
import {  Button } from '@mui/material'



export default function Del({buttonText,SaveButtonErr,saveButton}) {
  return (
  
      <Button 
       className='SaveButton' 
       disabled={SaveButtonErr?false:true
       }
       onClick={()=>{saveButton()}}
       
       >{buttonText}</Button>
    
  )
}
