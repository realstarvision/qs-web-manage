import React, { useState, useEffect, useRef } from 'react'
import { Box, Paper, Grid,Modal, Divider, FormLabel, MenuItem, Button,FormControlLabel,Switch } from '@mui/material'
import './addNoticeFooter.scss'
import { message,Popconfirm } from 'antd'




export default function addNoticeFooter({
    addNoticeParamsFooter,
    addNoticeFooterDelButFooter,
    addNoticeSearchFooter,
}) {






 // 保存发布的状态
 const [addNoticeChecked,setAddNoticeChecked]=useState<boolean>(true)
 // 保存发布的改变事件
const addNoticeCheckedChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
// 
  setAddNoticeChecked(event.target.checked)
console.log(event.target.checked)

}

// 删除按钮的点击事件
const addNoticeDel=()=>{
    addNoticeFooterDelButFooter()



}

// 保存按钮的点击事件
const addNoticeSave=()=>{
  addNoticeSearchFooter.addNoticeTitle===''
  &&addNoticeSearchFooter.addNoticePlate===0 
  &&addNoticeSearchFooter.addNoticePlace===''
  &&addNoticeSearchFooter.addNoticeKind=== 0
  &&addNoticeSearchFooter.addNoticeEDitor===''?message.error('请输入要保存的内容'):message.success('发布成功')


}



  return (
    
    <Box className='addNoticeFooterBox' >
    <Box className='addNoticeLengthBox'  >
        <span>{addNoticeSearchFooter.addNoticeEDitor.length}字</span>
        </Box>
    <Box className='addNoticeButtonBox' >

        <span onClick={()=>setAddNoticeChecked(!addNoticeChecked)} style={{color:`${addNoticeChecked?'#666666':'#0E42D2'}`}}>不发布</span>
                <Switch checked={addNoticeChecked} onChange={addNoticeCheckedChange}  />
                <span  
                onClick={()=>setAddNoticeChecked(!addNoticeChecked)}
                style={{color:`${addNoticeChecked?'#0E42D2':'#666666'}`}}
                >保存后发布</span>
    <Popconfirm 
    title="你将删除选中数据"
    description="确定删除吗?"
    okText="确定"
    cancelText="取消"
    onConfirm={() => addNoticeDel()}
    >
      <Button 
       className='addNoticeDelButton' 
       disabled={addNoticeParamsFooter?false:addNoticeSearchFooter.addNoticeTitle===''
       &&addNoticeSearchFooter.addNoticePlate===0 
       &&addNoticeSearchFooter.addNoticePlace===''
       &&addNoticeSearchFooter.addNoticeKind=== 0
       &&addNoticeSearchFooter.addNoticeEDitor===''
       ?true
       :false
       }>删除</Button>
      </Popconfirm>
      <Button onClick={()=>{addNoticeSave()}} className='addNoticeSaveButton'>保存</Button>
    </Box>
              </Box>
  )
}
