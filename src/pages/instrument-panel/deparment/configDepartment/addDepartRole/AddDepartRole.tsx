import './addDepartRole.scss'
import React, { useState, useEffect } from 'react'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { message } from 'antd'
import AddDepartBra from '@/components/AntDBread/index'


export interface addDepartRoleInput {
    addDepartRoleName: string,
    addDepartRoleDetail: string

}
const breadcrumbNameMap = {
    '/': '首页',
    '/instrument-panel': '工作台',
    '/instrument-panel/department': '部门管理',
    '/instrument-panel/department/configDepartment': '部门角色配置',
    '/instrument-panel/department/configDepartment/addDepartRole': '角色新增'
}

export default function AddDepartRole() {
    // 输入框状态
    const [addDepartRoleValue, setAddDepartRoleValue] = useState<addDepartRoleInput>({
        addDepartRoleName: '',
        addDepartRoleDetail: '',
    })
    // 输入框改变事件
    const addDepartRoleChange = (e, type) => {
        addDepartRoleValue[type] = e.target.value
        setAddDepartRoleValue({ ...addDepartRoleValue })
    }
    // 点击保存事件
    const addDepartSave = () => {
        // 新建数组
        const addDepartRoleValueArr = [{
            name: '角色名称',
            value: addDepartRoleValue.addDepartRoleName
        },
        {
            name: '角色描述',
            value: addDepartRoleValue.addDepartRoleDetail
        }
        ]
        // 新建数组  arr储存AddDepartRoleValueArr的每一项的value值
        let arr = []
        // 新建数组  newArr储存AddDepartRoleValueArr的非空值
        let newArr = []
        // 遍历AddDepartRoleValueArr
        addDepartRoleValueArr.map((value, index) => {
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
            // 请求数据上传服务器然后清空数据
            setTimeout(() => {
                setAddDepartRoleValue({
                    addDepartRoleName: '',
                    addDepartRoleDetail: '',
                })
                message.success('保存成功')
            }, 1000)

        }
    }
    return (
        // 最外层盒子
        <div className='addDepartRole' >
            {/*  面包屑 */}
            <div className='addDepartRoleBra'>
                <AddDepartBra breadcrumbNameMap={breadcrumbNameMap}></AddDepartBra>
            </div>
            {/*  内容区 */}
            <div className='addDepartRoleMain'>
                <div className='addDepartRoleMainBox'>
                    {/* 内容区 标题  */}
                    <div className='addDepartRoleTitle'>角色新增</div>
                    {/*  内容区输入框组 */}
                    <div className='addDepartRoleInputGroup'>
                        <Grid container xs={12} spacing={2}
                            direction="column" style={{ marginTop: '16px' }}
                            justifyContent="center"
                        >
                            {/* 单排输入框 */}
                            <Grid item className="addDepartRoleFrom-item">
                                {/* 输入框名字 */}
                                <FormLabel component="span" className="addDepartRoleLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    角色名称
                                </FormLabel>
                                {/* 输入框 */}
                                <MyInput
                                    size="small"
                                    placeholder={('请输入角色名称')}
                                    value={addDepartRoleValue.addDepartRoleName}
                                    onChange={(e) => addDepartRoleChange(e, 'addDepartRoleName')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="addDepartRoleFrom-item addDepartRolePlace" >
                                <FormLabel component="span" className="addDepartRoleLabel " >
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    角色描述
                                </FormLabel>
                                <MyInput
                                    className='addDepartRoleFromInput'
                                    size="small"
                                    placeholder={('单行输入')}
                                    value={addDepartRoleValue.addDepartRoleDetail}
                                    onChange={(e) => addDepartRoleChange(e, 'addDepartRoleDetail')}
                                    autoComplete="off"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='addDepartRoleFooter'>
                    <Button className='addDepartRoleButton' onClick={() => { addDepartSave() }}>保存</Button>
                </div>
            </div>
        </div>
    )

}
