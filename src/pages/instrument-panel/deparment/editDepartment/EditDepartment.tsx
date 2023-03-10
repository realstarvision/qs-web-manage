import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './editDepartment.scss'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import {  Grid, FormLabel,  } from '@mui/material'

import { message } from 'antd'
import EditDepartBra from '@/components/AntDBread/index'
export interface editDepartmentInput {
    editDepartName: string,
    editDepartUserName: string | number,
    editDepartUser: string,
    editDepartTel: string | number,
    editDepartId: string,
    editDepartPlace: string
}
const breadcrumbNameMap = {
    '/': '首页',
    '/instrument-panel': '工作台',
    '/instrument-panel/department': '部门管理',
    '/instrument-panel/department/editDepartment': '部门编辑'
}
export default function editDepartment() {
    // 输入框状态
    const [editDepartmentValue, setEditDepartmentValue] = useState<editDepartmentInput>({
        editDepartName: '',
        editDepartUserName: '',
        editDepartUser: '',
        editDepartTel: '',
        editDepartPlace: '',
        editDepartId: '',
    })
    //   获取路由参数
    const [editDepartSearch, setEditDepartSearch] = useSearchParams()
    const departInFor = editDepartSearch.get('id')
    const navigator = useNavigate()
    // 输入框改变事件
    const editDepartInputChange = (e, type) => {
        editDepartmentValue[type] = e.target.value
        setEditDepartmentValue({ ...editDepartmentValue })
    }
    // 点击保存事件
    const editDepartSave = () => {
        // 新建数组
        const editDepartmentValueArr = [{
            name: '部门名称',
            value: editDepartmentValue.editDepartName
        },
        {
            name: '管理账户',
            value: editDepartmentValue.editDepartUserName
        },
        {
            name: '负责人',
            value: editDepartmentValue.editDepartUser
        },
        {
            name: '手机号',
            value: editDepartmentValue.editDepartTel
        },
        {
            name: '职务',
            value: editDepartmentValue.editDepartId
        },
        {
            name: '所在地址',
            value: editDepartmentValue.editDepartPlace
        }
        ]
        // 新建数组  arr储存editDepartmentValueArr的每一项的value值
        let arr = []
        // 新建数组  newArr储存editDepartmentValueArr的非空值
        let newArr = []
        // 遍历editDepartmentValueArr
        editDepartmentValueArr.map((value, index) => {
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

                setEditDepartmentValue({
                    editDepartName: '',
                    editDepartUserName: '',
                    editDepartUser: '',
                    editDepartTel: '',
                    editDepartPlace: '',
                    editDepartId: '',
                })
                message.success('保存成功')
                navigator('/instrument-panel/department')
            }, 1000)
        }
    }
    // 初始化
    useEffect(() => {
        setEditDepartmentValue({
            editDepartName: 'www',
            editDepartUserName: departInFor,
            editDepartUser: '24322',
            editDepartTel: '13323434342',
            editDepartPlace: 'szdvsc',
            editDepartId: 'dsasd',
        })
    }, [])
    return (
        <div className='editDepartment' >
            <div className='editDepartmentBra'>
                <EditDepartBra breadcrumbNameMap={breadcrumbNameMap}></EditDepartBra>
            </div>
            <div className='editDepartmentMain'>
                <div className='editDepartmentMainBox'>
                    <div className='editDepartmentTitle'>部门编辑</div>
                    <div className='editDepartmentInputGroup'>
                        <Grid container xs={12} spacing={2}
                            direction="column" style={{ marginTop: '16px' }}
                            justifyContent="center"
                        >
                            <Grid item className="editDepartmentFrom-item">
                                <FormLabel component="span" className="editDepartmentLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    部门名称
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder={('请输入部门名称')}
                                    value={editDepartmentValue.editDepartName}
                                    onChange={(e) => editDepartInputChange(e, 'editDepartName')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="editDepartmentFrom-item">
                                <FormLabel component="span" className="editDepartmentLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    管理账户
                                </FormLabel>
                                <div className='editDepartUserName'>{editDepartmentValue.editDepartUserName}</div>
                            </Grid>
                            <Grid item className="editDepartmentFrom-item">
                                <FormLabel component="span" className="editDepartmentLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    负责人
                                </FormLabel>
                                <MyInput
                                    size="small"
                             
                                    placeholder={('请输入负责人')}
                                    value={editDepartmentValue.editDepartUser}
                                    onChange={(e) => editDepartInputChange(e, 'editDepartUser')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%',}
                                    }
                                  
                                />
                            </Grid>
                            <Grid item className="editDepartmentFrom-item">
                                <FormLabel component="span" className="editDepartmentLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    手机号
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder={('请输入手机号')}
                                    value={editDepartmentValue.editDepartTel}
                                    onChange={(e) => editDepartInputChange(e, 'editDepartTel')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="editDepartmentFrom-item">
                                <FormLabel component="span" className="editDepartmentLabel">
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    职务
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder={('请输入职务')}
                                    value={editDepartmentValue.editDepartId}
                                    onChange={(e) => editDepartInputChange(e, 'editDepartId')}
                                    autoComplete="off"
                                    sx={
                                        { width: '30%' }
                                    }
                                />
                            </Grid>
                            <Grid item className="editDepartmentFrom-item editDepartmentPlace" >
                                <FormLabel component="span" className="editDepartmentLabel " >
                                    {/* {t('orderManagement.searchBar.orderCode')} */}
                                    所在地址
                                </FormLabel>
                                <MyInput
                                    className='editDepartmentFromInput'
                                    size="small"
                                    placeholder={('请输入地址')}
                                    value={editDepartmentValue.editDepartPlace}
                                    onChange={(e) => editDepartInputChange(e, 'editDepartPlace')}
                                    autoComplete="off"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='editDepartmentFooter'>
                    <Button className='editDepartmentButton' onClick={() => { editDepartSave() }}>保存</Button>
                </div>
            </div>
        </div>
    )
}







