import React, { useState } from 'react'
import { Box, Stack, Grid, Paper, Divider, Button, Typography, FormLabel, MenuItem } from '@mui/material'
import './noticeKindsSearch.scss'
import { useTranslation } from 'react-i18next'
import { MyInput } from '@/components/Input'
import { LoadingButton } from '@/components/Button'
import SvgIcon from '@/components/SvgIcon'

export interface FormParams {

    noticeType: String,
    noticeState: String

}

// 公告类型
let noticeStateList = ['全部','局部', '啊']


export default function noticeKindsSearch({noticeKindsSearchFn}) 
{

    const [formParams, setFormParams] = useState<FormParams>({
        noticeType: '',
        noticeState: '',
    })

    const noticeInputChange = (e, type) => {
        formParams[type] = e.target.value
        setFormParams({ ...formParams })
    }

    //重置按钮
    const noticeSearRest = () => {
        setFormParams({
        
          noticeType: '',
          noticeState: '',
        })
    }
        const handleSubmit = () => {
        //   自定义事件 点击触发数据请求并传递给table
            noticeKindsSearchFn('data') 
       
          }

    return (
        <Box className='noticeKindsSearch'>

            <Grid container spacing={1 }>
                {/* 订单编号 */}
                <Grid item xs={4} className="from-item">
                    <FormLabel component="span" className="label">
                        {/* {t('noticeManagement.searchBar.noticeCode')} */}
                        公告类型
                    </FormLabel>
                    <MyInput
                        size="small"
                       placeholder='请输入公告管理类型'
                        value={formParams.noticeType}
                        onChange={(e) => { noticeInputChange(e, 'noticeType') }}
                        autoComplete="off"
                       
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                    className="from-item"
                >
                    <FormLabel component="span" className="label">
                        {/* {t('noticeManagement.searchBar.noticeState')} */}
                       隶属板块
                    </FormLabel>
                    <MyInput
                        size="small"
                        select
                        value={formParams.noticeState}
                        onChange={(e) => { noticeInputChange(e, 'noticeState') }}
                        autoComplete="off"
                     
                      
                    >
                        {noticeStateList.map((state, index) => (
                            <MenuItem key={index} value={index}>
                                {state}
                            </MenuItem>
                        ))}
                    </MyInput>

                </Grid>
             
                <Box className='noticeSearchBtn'>
                <Divider
                        orientation="vertical"
                        flexItem
                        color="#E5E6EB"
                        style={{
                     marginTop:'10px',
                     
                           marginRight:'50px'
                         
                       
                        }}
                    />
                
               
                    <Grid item
                        xs={4}
                        className='noticeSearchBtn'
                    >

                        <Button
                      onClick={() => noticeSearRest()}
                        className='noticeStartButton'
                   
                        //   onClick={() => handleSubmit()}
                        
                          startIcon={<SvgIcon svgName="refresh_icon" svgClass="icon"></SvgIcon>}

                        >
                          重置
                        </Button>

                        <Button 
                             onClick={() => handleSubmit()}
                        
                            startIcon={ <SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
                            className="noticeSearchBtnRight"
                        >
                            搜索
                        </Button>

                    </Grid>
                </Box>
            </Grid>

        </Box>
    )
}
