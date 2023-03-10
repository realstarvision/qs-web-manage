import React ,{useState,useEffect}from 'react'
import './addDepartment.scss'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { message } from 'antd'
import AddDepartBra from '@/components/AntDBread/index'

export interface addDepartmentInput{
  addDepartName:string,
  addDepartUserName:string | number,
  addDepartUser:string,
  addDepartTel:string | number,
  addDepartId:string,
  addDepartPlace:string

}

const breadcrumbNameMap = {
  '/': '首页',
  '/instrument-panel': '工作台',
  '/instrument-panel/department': '部门管理',
  '/instrument-panel/department/addDepartment': '新增部门'
}



export default function addDepartment() {
// 输入框状态
const [addDepartmentValue,setAddDepartmentValue]=useState<addDepartmentInput>({
  addDepartName:'',
  addDepartUserName:'',
  addDepartUser:'',
  addDepartTel:'',
  addDepartPlace:'',
  addDepartId:'',



})

// 输入框改变事件
const addDepartInputChange=(e,type)=>{
  addDepartmentValue[type]=e.target.value

  setAddDepartmentValue({...addDepartmentValue})



}
// 点击保存事件
const addDepartSave=()=>{
  // 新建数组
const addDepartmentValueArr=[{
  name:'部门名称',
  value:addDepartmentValue.addDepartName

},
{
  name:'管理账户',
  value:addDepartmentValue.addDepartUserName

},
{
  name:'负责人',
  value:addDepartmentValue.addDepartUser

},
{
  name:'手机号',
  value:addDepartmentValue.addDepartTel

},
{
  name:'职务',
  value:addDepartmentValue.addDepartId

},
{
  name:'所在地址',
  value:addDepartmentValue.addDepartPlace

}
]
// 新建数组  arr储存addDepartmentValueArr的每一项的value值
let arr=[]
// 新建数组  newArr储存addDepartmentValueArr的非空值
let newArr=[]
// 遍历addDepartmentValueArr
addDepartmentValueArr.map((value,index)=>{
  // 判断输入框值为空就谈出错误信息
if(value.value===''){
  message.error(`请输入${value.name}`)
}
 //将输入框值加入arr
arr.push(value.value)
console.log(arr)
})
// 遍历arr
arr.forEach((item)=>{
  if(item!=''){
    newArr.push(item)
   
  }
  })
  // 判断输入框有值的数组和输入框总值的长度对比，等长就说明全部有值就谈成功
if(newArr.length===arr.length){

// 请求数据上传服务器然后清空数据
setTimeout(()=>{
 
  setAddDepartmentValue({
    addDepartName:'',
    addDepartUserName:'',
    addDepartUser:'',
    addDepartTel:'',
    addDepartPlace:'',
    addDepartId:'',
  })
  message.success('保存成功')
},1000)


 
}




}

  return (
    <div className='addDepartment' >
    
    <div className='addDepartmentBra'>
    <AddDepartBra breadcrumbNameMap={breadcrumbNameMap}></AddDepartBra>
    </div>
    <div className='addDepartmentMain'>
        <div className='addDepartmentMainBox'>
        <div className='addDepartmentTitle'>部门新增</div>
    <div className='addDepartmentInputGroup'>
    <Grid container xs={12} spacing={2} 
    direction="column" style={{marginTop:'16px'}}
    justifyContent="center"
    >
    <Grid item className="addDepartmentFrom-item">
            <FormLabel component="span" className="addDepartmentLabel">
              {/* {t('orderManagement.searchBar.orderCode')} */}
             部门名称
            </FormLabel>
            <MyInput
              size="small"
              placeholder={('请输入部门名称')}
              value={addDepartmentValue.addDepartName}
              onChange={(e) => addDepartInputChange(e, 'addDepartName')}
              autoComplete="off"
              sx={
                {width:'30%'}
              }
            />
          </Grid>
          <Grid item className="addDepartmentFrom-item">
            <FormLabel component="span"  className="addDepartmentLabel">
              {/* {t('orderManagement.searchBar.orderCode')} */}
              管理账户
            </FormLabel>
            <MyInput
              size="small"
              placeholder={('请输入管理账户')}
              value={addDepartmentValue.addDepartUserName}
              onChange={(e) => addDepartInputChange(e, 'addDepartUserName')}
              autoComplete="off"
              sx={
                {width:'30%'}
              }
            />
          </Grid>
          <Grid item className="addDepartmentFrom-item">
            <FormLabel component="span"  className="addDepartmentLabel">
              {/* {t('orderManagement.searchBar.orderCode')} */}
              负责人
            </FormLabel>
            <MyInput
              size="small"
              placeholder={('请输入负责人')}
              value={addDepartmentValue.addDepartUser}
              onChange={(e) =>addDepartInputChange(e, 'addDepartUser')}
              autoComplete="off"
              sx={
                {width:'30%'}
              }
            />
          </Grid>
          <Grid item className="addDepartmentFrom-item">
            <FormLabel component="span"  className="addDepartmentLabel">
              {/* {t('orderManagement.searchBar.orderCode')} */}
             手机号
            </FormLabel>
            <MyInput
              size="small"
              placeholder={('请输入手机号')}
              value={addDepartmentValue.addDepartTel}
              onChange={(e) =>addDepartInputChange(e, 'addDepartTel')}
              autoComplete="off"
              sx={
                {width:'30%'}
              }
            />
          </Grid>
          <Grid item className="addDepartmentFrom-item">
            <FormLabel component="span"  className="addDepartmentLabel">
              {/* {t('orderManagement.searchBar.orderCode')} */}
             职务
            </FormLabel>
            <MyInput
              size="small"
              placeholder={('请输入职务')}
              value={addDepartmentValue.addDepartId}
              onChange={(e) => addDepartInputChange(e, 'addDepartId')}
              autoComplete="off"
          //     helperText={addDepartmentValue.addDepartId?null:'请输入职务'}
          //  error
              sx={
                {width:'30%'}
              }
            />
          </Grid>
          <Grid item className="addDepartmentFrom-item addDepartmentPlace" >
            <FormLabel component="span"  className="addDepartmentLabel " >
              {/* {t('orderManagement.searchBar.orderCode')} */}
              所在地址
            </FormLabel>
            <MyInput
            className='addDepartmentFromInput'
              size="small"
              placeholder={('请输入地址')}
              value={addDepartmentValue.addDepartPlace}
              onChange={(e) =>addDepartInputChange(e, 'addDepartPlace')}
              autoComplete="off"
              multiline
              rows={3}
             
            />
          </Grid>
       
          </Grid>
      
      
      
     </div>
        </div>
   
    <div className='addDepartmentFooter'>
      <Button className='addDepartmentButton' onClick={()=>{addDepartSave()}}>保存</Button>
      </div>
    </div>
    
    
 
    

    
    
    </div>
  )
}
