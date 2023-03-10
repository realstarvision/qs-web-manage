import React from 'react'
import {  Button } from '@mui/material'
import {  Popconfirm } from 'antd'


export default function Del({delButtonDis,Del,delButtonState}) {
  return (
    <Popconfirm 
    title="你将删除选中数据"
    description="确定删除吗?"
    okText="确定"
    cancelText="取消"
    onConfirm={() => Del()}
    >
      <Button 
       className='DelButton' 
       disabled={delButtonDis?false:true
       }>{delButtonState.text}</Button>
      </Popconfirm>
  )
}
