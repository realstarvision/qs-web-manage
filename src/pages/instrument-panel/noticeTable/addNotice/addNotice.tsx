import React, { useState, useEffect, useRef } from 'react'
import { Box, Paper, Grid,Modal, Divider, FormLabel, MenuItem, Button,FormControlLabel,Switch } from '@mui/material'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useTranslation } from 'react-i18next'
import SvgIcon from '@/components/SvgIcon'
import { message, Badge, Breadcrumb, Popconfirm } from 'antd'
import { findOrderListByPage } from '@/api/order'
import { copyToClip } from '@/utils/tool'
import { useSearchParams, useNavigate, useLocation, Link, json } from "react-router-dom";
import { MyInput } from '@/components/Input'
import BreadComPon from '@/components/AntDBread/index'
import './addNotice.scss'
import MapLeaf from '@/components/Map/index'
import AddNoticeFooter from './addNoticeFooter/addNoticeFooter'
const breadcrumbNameMap = {
  '/': '首页',
  '/instrument-panel': '工作台',
  '/instrument-panel/early-warning': '公告管理',
  '/instrument-panel/early-warning/addNotice': '新增公告'
}

// 公告类型
let addNoticeKindList = ['全部', '局部', '啊']
// 发布板块
let addNoticePlateList = ['全部', '局部', '啊']

export interface addNoticeSearch {
  addNoticeTitle: string
  addNoticePlate: number
  addNoticePlace: any
  addNoticeKind: number
  addNoticeEDitor:string | ''

}


export default function addNotice() {
const mapRef=useRef(null)
// input输入框 富文本初始状态
  const [addNoticeSearch, setAddNoticeSearch] = useState<addNoticeSearch>({
    addNoticeTitle: '',
    addNoticePlate: 0,
    addNoticePlace: '',
    addNoticeKind: 0,
    addNoticeEDitor:'',
  })
 

 const [addSearch, setAddSearch] = useSearchParams()
 const addNoticeParams= addSearch.get("id")
  // 富文本的状态

  const AddNoticeInputChange = (e, type) => {
    addNoticeSearch[type] = e.target.value
    setAddNoticeSearch({ ...addNoticeSearch })
  }

  // 底部删除按钮
  const  addNoticeFooterDelBut=()=>{
// 清空数据

    setAddNoticeSearch({
      addNoticeTitle: '',
      addNoticePlate: 0,
      addNoticePlace: '',
      addNoticeKind: 0,
      addNoticeEDitor:'',
    })
    addNoticeParams? message.success('删除公告成功'):message.success('删除成功')
 
  }

useEffect(()=>{

console.log(addNoticeParams,addSearch)
addNoticeParams?
setAddNoticeSearch({
  addNoticeTitle: '1',
  addNoticePlate: 2,
  addNoticePlace: '3',
  addNoticeKind: 2,
  addNoticeEDitor:'2',
}): setAddNoticeSearch({
  addNoticeTitle: '',
  addNoticePlate: 0,
  addNoticePlace: '',
  addNoticeKind: 0,
  addNoticeEDitor:'',
})

},[addNoticeParams])

 
  return (
    <Box className="addNoticeBox" >
      {/* 面包屑 */}
      {/* <p style={{background:'blue'}}>我是面包屑</p> */}
      <BreadComPon className='noticeBreadBox' breadcrumbNameMap={breadcrumbNameMap} />

     
        <Box className="addNotice-container" >
  
          {/* 标题 */}
          <p className="title">新增公告</p>
          <Box className='addNoticeSearch' >
            <Grid container >
              <Grid item className='addSearchGridForBox' >
                <FormLabel component="span" className='addSearchLabel' >
                  {/* {t('noticeManagement.searchBar.noticeCode')} */}
                  公告标题
                </FormLabel>
              </Grid>
              <Grid item xs>
                <MyInput
                  fullWidth
                  placeholder='请输入公告管理类型'
                  value={addNoticeSearch.addNoticeTitle}
                  onChange={(e) => AddNoticeInputChange(e, 'addNoticeTitle')}
                  autoComplete="off"

                />

              </Grid>
            </Grid>

            <Grid className='addSearchTwo' container direction="row"
              justifyContent="space-between"
              alignItems="baseline"

            >
              <Grid item xs={3} >
                <Box className='addSearchTwoBox'>

                  <FormLabel component="span" className='addSearchLabelTwo' >
                    {/* {t('noticeManagement.searchBar.noticeCode')} */}
                    发布板块
                  </FormLabel>


                  <MyInput
                    fullWidth
                    value={addNoticeSearch.addNoticePlate}
                    onChange={(e) => AddNoticeInputChange(e, 'addNoticePlate')}
                    select
                  
                  >
                    {addNoticePlateList.map((state, index) => (
                      <MenuItem  key={index} value={index}>
                        
                        {state}
                      </MenuItem>
                    ))}

                  </MyInput>

                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className='addSearchTwoBox' style={{ position:'relative'}} >

                  <FormLabel component="span" className='addSearchLabelTwo' >
                    {/* {t('noticeManagement.searchBar.noticeCode')} */}
                    公告区域
                  </FormLabel>

                 
                  <MyInput
                    fullWidth

                    placeholder='请输入公告管理类型'
                    value={addNoticeSearch.addNoticePlace}
                    onChange={(e) => AddNoticeInputChange(e, 'addNoticePlace')}
                    autoComplete="off"
                    
                    >


                    </MyInput>
             
                    <SvgIcon
                    style={{position:'absolute',right:'10' ,height:'100%',width:'14px',cursor:'pointer'}}
                    svgName='wrapper'></SvgIcon>



                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box className='addSearchTwoBox' >

                  <FormLabel component="span" className='addSearchLabelTwo' >
                    {/* {t('noticeManagement.searchBar.noticeCode')} */}
                    公告类型
                  </FormLabel>


                  <MyInput
                    fullWidth
                    select

                    value={addNoticeSearch.addNoticeKind}
                    onChange={(e) => AddNoticeInputChange(e, 'addNoticeKind')}
                    autoComplete="off"
                  >

                    {addNoticeKindList.map((state, index) => (
                      <MenuItem key={index} value={index}>
                        {state}
                      </MenuItem>
                    ))}

                  </MyInput>

                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider></Divider>
          <Box  style={{height:'306px',background:'red',}}>富文本</Box>


        

          <AddNoticeFooter 
          addNoticeFooterDelButFooter={ addNoticeFooterDelBut} 
          addNoticeSearchFooter={addNoticeSearch}
          addNoticeParamsFooter={addNoticeParams}
          ></AddNoticeFooter>
        
        </Box>
   
        {/* <Modal open={true} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Box style={{height:'1000px',width:'400px'}}>
        <MapLeaf 
        ref={mapRef}
        polygon={{
          topLeft: addNoticeSearch.addNoticePlace && JSON.parse(addNoticeSearch.addNoticePlace).topLeft,
          bottomRight: addNoticeSearch.addNoticePlace && JSON.parse(addNoticeSearch.addNoticePlace).bottomRight,
        }}
        ></MapLeaf>
        </Box>


        </Modal>
       */}
    
      
    </Box>
  )
}
