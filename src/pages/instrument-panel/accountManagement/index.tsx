import React, { useState } from 'react'
import './index.scss'
import SvgIcon from '@/components/SvgIcon'
import { MyInput } from '@/components/Input'
import { TextField, Button, MenuItem, Stack, Grid, FormLabel, Menu, Divider } from '@mui/material'
import IndexTable from './components/indexTable/indexTable'
import { useNavigate } from 'react-router-dom'
import { parseNonNullablePickerDate } from '@mui/x-date-pickers/internals'
import { message } from 'antd'

export interface FormParams {
    departName: string
    user: string
}
export default function index() {
    const navigator = useNavigate()
    const [formParams, setFormParams] = useState<FormParams>({
        departName: '',

        user: '',
    })
    const accountInputChange = (e, type) => {
        formParams[type] = e.target.value
        setFormParams({ ...formParams })
    }


    //重置按钮
    const handleReset = () => {
        setFormParams({
            departName: '',
            user: '',
        })
        let t = null
        clearTimeout(t)
        t = setTimeout(() => {
            message.success('重置成功')
        }, 1000)
    }
    // 搜索按钮
    const handleSubmit = () => {

    }
    return (

        <div className='accountBox'>
            <div className='accountMain'>
                <div>
                    <div className='accountTitle'>查询表格</div>
                    <div className='accountSearch'>
                        <Grid container >
                            {/* 订单编号 */}
                            <Grid item xs={4} className="accountFrom-item">
                                <FormLabel component="span" className="accountLabel">
                                    {/* {t('noticeManagement.searchBar.noticeCode')} */}
                                    部门名称
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder='请输入所属部门名称'
                                    value={formParams.departName}
                                    onChange={(e) => { accountInputChange(e, 'departName') }}
                                    autoComplete="off"
                                    style={{ marginRight: '20px' }}

                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                className="accountFrom-item"
                            >
                                <FormLabel component="span" className="accountLabel">
                                    {/* {t('noticeManagement.searchBar.noticeState')} */}
                                    负责人
                                </FormLabel>
                                <MyInput
                                    size="small"
                                    placeholder='请输入负责人姓名/电话'
                                    value={formParams.user}
                                    onChange={(e) => { accountInputChange(e, 'user') }}
                                    autoComplete="off"
                                >
                                </MyInput>
                            </Grid>
                            <div className='accountSearchBtn'>
                                <Grid item
                                    xs={4}
                                    className='accountSearchBtn'
                                >
                                    <Divider
                                        orientation="vertical"
                                        flexItem
                                        color="#E5E6EB"
                                        style={{
                                            marginRight: '20px'
                                        }}
                                    />
                                    <Button
                                        onClick={() => handleReset()}
                                        className='accountStartButton'

                                        startIcon={<SvgIcon svgName="refresh_icon" svgClass="icon"></SvgIcon>}
                                    >
                                        重置
                                    </Button>
                                    <Button
                                        onClick={() => handleSubmit()}
                                        startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
                                        className="accountSearchBtnRight"
                                    >
                                        搜索
                                    </Button>
                                </Grid>
                            </div>
                        </Grid></div>
                </div>
                <div>
                    <hr className='accountHr' />
                    <div className='accountBut'>
                        <Button
                            className='accountButton'
                            onClick={() => navigator('/instrument-panel/accountManagement/addAccountManage')}
                        >+&nbsp;新增账号
                        </Button>
                    </div>
                    <IndexTable></IndexTable>
                </div>
            </div>
        </div>
    )
}
