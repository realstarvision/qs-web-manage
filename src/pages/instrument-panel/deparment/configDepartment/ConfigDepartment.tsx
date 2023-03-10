import React,{useEffect, useState} from 'react'
import './ConfigDepartment.scss'
import { useSearchParams } from 'react-router-dom'
import ConfigDepartBra from '@/components/AntDBread/index'
import ConfigDepartTabs from './components/tabs/ConfigDepartTabs'

// const breadcrumbNameMap = {
//   '/': '首页',
//   '/instrument-panel': '工作台',
//   '/instrument-panel/department': '部门管理',
//   '/instrument-panel/department/configDepartment': '区域划分配置'
// }

// const breadcrumbNameMapT = {
//   '/': '首页',
//   '/instrument-panel': '工作台',
//   '/instrument-panel/department': '部门管理',
//   '/instrument-panel/department/configDepartment': '部门角色配置'
// }


      
export default function ConfigDepartment() {
// 识别哪里传来的数据
const [ConfigDepartSearch,setConfigDepartSearch]=useSearchParams()
const ConfigDepartSearchId=ConfigDepartSearch.get('id')
 // 底部是否出现
 const [departTabsFooterBol,setDepartTabsFooterBol]=useState(true)
//
const [breadcrumbNameMap,setBreadcrumbNameMap ]=useState({
  '/': '首页',
  '/instrument-panel': '工作台',
  '/instrument-panel/department': '部门管理',
  '/instrument-panel/department/configDepartment': '区域划分配置'
})



// 点击tabs切换时，面包屑以及区域划分底部的样式变化
 const changeFooterBol=()=>{
  // 点击时取反
  setDepartTabsFooterBol(!departTabsFooterBol)
 if(departTabsFooterBol){
  breadcrumbNameMap['/instrument-panel/department/configDepartment']='部门角色配置'
  setBreadcrumbNameMap ({
  ...breadcrumbNameMap
  })
  
  console.log(breadcrumbNameMap)
 }
 else {
  breadcrumbNameMap['/instrument-panel/department/configDepartment']='区域划分配置'
setBreadcrumbNameMap ({
...breadcrumbNameMap
})
}
 }

 useEffect(()=>{
 


 },[])
  return (
    // 最外层盒子
    <div className='ConfigDepartBox'>
      {/* {ConfigDepartSearchId} */}
    
    {/* 面包屑 */}
    <div className='ConfigDepartBra'>
    <ConfigDepartBra breadcrumbNameMap={breadcrumbNameMap}></ConfigDepartBra></div>
    
    {/* 内容区 */}
    <div className='ConfigDepartMain'>
    {/* 内容区上部 */}
    <div className='configDepartTopBox'>
      {/* 选项卡 */}
    <ConfigDepartTabs 
    // 选项卡底部是否出现
    departTabsFooterBol={departTabsFooterBol}
    // 改变选项卡事件
    changeFooterBol={changeFooterBol}
    ></ConfigDepartTabs>
    
    </div>
   <div></div>
    
    </div>
    
    
    
    
    
    
    </div>

  )
}
