import React, { memo } from 'react'
import { Grid, FormLabel, Box, Divider, Stack, Button } from '@mui/material'
import { MyInput } from '@/components/Input'

import SvgIcon from '@/components/SvgIcon'


function departmentSearch({ 
    departmentInputProps,
    departInputChangeProps,
    departmentSubmitProps,
    departmentResetProps }) {


    return (
        <div className='departmentSearch'>
            <Grid container spacing={5} direction="row"
                alignItems="center">
                {/* 部门名称 */}
                <Grid item xs={5.9} className="departmentFrom-item">
                    <FormLabel component="span" className="departmentLabel">
                        {/* {t('orderManagement.searchBar.orderCode')} */}
                        部门名称
                    </FormLabel>
                    <MyInput
                        placeholder={'请输入部门名称'}
                        fullWidth={true}
                        value={departmentInputProps.departName}
                        onChange={(e) => departInputChangeProps(e, 'departName')}
                        autoComplete="off"
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                {/* 负责人 */}
                <Grid item xs={5.9} className="departmentFrom-item">
                    <FormLabel component="span" className="departmentLabel">
                        {/* {t('orderManagement.searchBar.email')} */}
                        &nbsp;&nbsp;&nbsp;负责人
                    </FormLabel>
                    <MyInput
                        placeholder={'请输入负责人姓名/联系电话'}
                        value={departmentInputProps.departUser}
                        onChange={(e) => departInputChangeProps(e, 'departUser')}
                        autoComplete="off"
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                {/* 区域名称 */}
                <Grid
                    item
                    xs={5.9}
                    className="departmentFrom-item"
                    style={{
                        paddingTop: '16px',
                    }}
                >
                    <FormLabel component="span" className="departmentLabel">
                        {/* {t('orderManagement.searchBar.orderState')} */}
                        区域名称
                    </FormLabel>
                    <MyInput
                        placeholder='请输入管辖区域名称'
                        value={departmentInputProps.departPlace}
                        onChange={(e) => departInputChangeProps(e, 'departPlace')}
                        autoComplete="off"
                        sx={{
                            width: '100%',
                        }}
                    >
                    </MyInput>
                </Grid>
            </Grid>

            {/* 按钮组 */}
            <Box className="btn-bar" >

                <Stack spacing={2}  >
                    <Button

                        onClick={() => departmentSubmitProps()}
                        startIcon={<SvgIcon svgName="search_icon" svgClass="departmentIcon"></SvgIcon>}
                        className="departmentSearch_btn"

                    >
                        {/* {t('customerManagement.searchBar.searchBtnText')} */}
                        查询
                    </Button>

                    <Button
                        onClick={() => { departmentResetProps() }}
                        startIcon={<SvgIcon svgName="refresh_icon" svgClass="departmentIcon"></SvgIcon>}
                        className="departmentReset_btn"
                    >
                        {/* {t('customerManagement.searchBar.resetBtnText')} */}
                        重置
                    </Button>
                </Stack>

            </Box>
        </div>
    )
}
export default memo(departmentSearch)