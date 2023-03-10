import React, { useState, useEffect } from 'react'
import './addAccountManage.scss'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu, Divider, Switch, FormGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import { message, } from 'antd'
import AddAccountBra from '@/components/AntDBread/index'
export interface addAccountManageInput {
    addAccountName: string,
    addAccountUserName: string | number,
    addAccountKinds: string | number,
    addAccountTel: string ,
    addAccountId: string | number,
    addAccountManageChecked: boolean
}
const breadcrumbNameMap = {
    '/': '首页',
    '/instrument-panel': '工作台',
    '/instrument-panel/accountManagement': '账号管理',
    '/instrument-panel/accountManagement/addAccountManage': '新增账号'
}
// 公告状态
let orderTypeList = ['全部', '已发布', '未发布', '已删除',]
// 公告类型
let orderStateList = ['全部', '库存订单', '定制订单']
export default function addAccountManage() {
    // 输入框状态
    const [addAccountManageValue, setAddAccountManageValue] = useState<addAccountManageInput>({
        addAccountName: '',
        addAccountUserName: '',
        addAccountTel: '',
        addAccountKinds: 0,
        addAccountId: 0,
        addAccountManageChecked: true,
    })
    // 开关的改变事件
    const addAccountManageCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        addAccountManageValue.addAccountManageChecked = event.target.checked; setAddAccountManageValue({ ...addAccountManageValue })
        // console.log(event.target.checked)

    }
    // 输入框改变事件
    const addAccountInputChange = (e, type) => {
        addAccountManageValue[type] = e.target.value

        setAddAccountManageValue({ ...addAccountManageValue })



    }
    // 点击保存事件
    const addAccountSave = () => {
        console.log(addAccountManageValue)
        // 新建数组
        const addAccountManageValueArr = [{
            name: '登陆账号',
            value: addAccountManageValue.addAccountName
        },
        {
            name: '持有人姓名',
            value: addAccountManageValue.addAccountUserName
        },
        {
            name: '联系方式',
            value: addAccountManageValue. addAccountTel
        },
        ]
        // 新建数组  arr储存addAccountManageValueArr的每一项的value值
        let arr = []
        // 新建数组  newArr储存addAccountManageValueArr的非空值
        let newArr = []
        // 遍历addAccountManageValueArr
        addAccountManageValueArr.map((value, index) => {
            // 判断输入框值为空就谈出错误信息
            if (value.value === '') {
                message.error(`请输入${value.name}`)
            }
            //将输入框值加入arr
            arr.push(value.value)
            console.log(arr)
        })
        // 遍历arr
        arr.forEach((item) => {
            if (item != '') {
                newArr.push(item)
            }
        })
        // 判断输入框有值的数组和输入框总值的长度对比，等长就说明全部有值就谈成功
        if (newArr.length === arr.length) {
            // 手机号验证
          const testTel= /^[1][3-9][\d]{9}/
          if(testTel.test(addAccountManageValue. addAccountTel)){
    // 请求数据上传服务器然后清空数据
    setTimeout(() => {
        setAddAccountManageValue({
            addAccountUserName: '',
            addAccountName: '',
            addAccountKinds: 0,
            addAccountTel: '',
            addAccountId: 0,
            addAccountManageChecked: true,
        })
        message.success('保存成功')
    }, 1000)
          }
          else{
            message.error('请输入正确的手机号')    
          }
         
        
        }
    }
    return (
        // 最外侧盒子
        <div className='addAccountManage' >
                {/* 面包屑 */}
            <div className='addAccountManageBra'>
                <AddAccountBra breadcrumbNameMap={breadcrumbNameMap}></AddAccountBra>
            </div>
             {/* 内容区 */}
            <div className='addAccountManageMain'>
                <div className='addAccountManageMainBox'>
                    {/* 内容区 标题 */}
                    <div className='addAccountManageTitle'>账号新增</div>
                    {/*   内容区输入框组 */}
                    <div className='addAccountManageInputGroup'>
                    <Grid container xs={12} spacing={2}
                            direction="column" style={{ marginTop: '16px' }}
                            justifyContent="center"
                        >
                            <Grid item className="addAccountManageFrom-item">
                                <FormLabel component="span" className="addAccountManageLabel">
                                    登陆账号
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder={('请输入登陆账号')}
                                    value={addAccountManageValue.addAccountName}
                                    onChange={(e) => addAccountInputChange(e, 'addAccountName')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="addAccountManageFrom-item">
                                <FormLabel component="span" className="addAccountManageLabel">
                                    持有人姓名
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder={('请输入持有人姓名')}
                                    value={addAccountManageValue.addAccountUserName}
                                    onChange={(e) => addAccountInputChange(e, 'addAccountUserName')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="addAccountManageFrom-item">
                                <FormLabel component="span" className="addAccountManageLabel">
                                    联系方式
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder={('请输入联系方式')}
                                    value={addAccountManageValue.addAccountTel}
                                    onChange={(e) => addAccountInputChange(e, 'addAccountTel')}
                                    autoComplete="off"
                                    //   helperText={typeof(addAccountManageValue.addAccountUser)==='string'?'请输入文字':null}
                                    error
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="addAccountManageFrom-item">
                                <FormLabel component="span" className="addAccountManageLabel">
                                    所属部门
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    value={addAccountManageValue.addAccountKinds}
                                    onChange={(e) => addAccountInputChange(e, ' addAccountKinds')}
                                    autoComplete="off"
                                    select
                                    sx={
                                        { width: '30%' }
                                    }
                                >
                                    {orderStateList.map((type, index) => (
                                        <MenuItem key={index} value={index}>
                                            {type}
                                        </MenuItem>))}</MyInput>
                            </Grid>
                            <Grid item className="addAccountManageFrom-item">
                                <FormLabel component="span" className="addAccountManageLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    所属角色
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    value={addAccountManageValue.addAccountId}
                                    onChange={(e) => addAccountInputChange(e, 'addAccountId')}
                                    autoComplete="off"
                                    select
                                    //     helperText={addAccountManageValue.addAccountId?null:'请输入职务'}
                                    //  error
                                    sx={
                                        { width: '30%' }
                                    }
                                >{orderTypeList.map((type, index) => (
                                    <MenuItem key={index} value={index}>
                                        {type}
                                    </MenuItem>))}</MyInput>
                            </Grid>
                            <Grid item className="addAccountManageFrom-item addAccountManagePlace" >
                                <FormLabel component="span" className="addAccountManageLabel " >
                                    帐号状态
                                </FormLabel>
                                <div className='addAccountManageButtonBox' >
                                    <span
                                        onClick={() => {
                                            addAccountManageValue.addAccountManageChecked = !(addAccountManageValue.addAccountManageChecked)
                                            setAddAccountManageValue({ ...addAccountManageValue })
                                        }}
                                        style={{ color: `${addAccountManageValue.addAccountManageChecked ? '#666666' : '#0E42D2'}` }}
                                    >
                                        禁用
                                    </span>
                                    <Switch
                                        checked={addAccountManageValue.addAccountManageChecked}
                                        onChange={addAccountManageCheckedChange} />
                                    <span
                                        onClick={() => {
                                            addAccountManageValue.addAccountManageChecked = !(addAccountManageValue.addAccountManageChecked)
                                            setAddAccountManageValue({ ...addAccountManageValue })
                                        }}
                                        style={{ color: `${addAccountManageValue.addAccountManageChecked ? '#0E42D2' : '#666666'}` }}
                                    >
                                        启用</span>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='addAccountManageFooter'>
                    <Button className='addAccountManageButton' onClick={() => { addAccountSave() }}>保存</Button>
                </div>
            </div>
        </div>
    )
}
