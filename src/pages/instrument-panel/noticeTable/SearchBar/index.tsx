import React, { useEffect, useState, useRef, RefObject } from 'react'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import KeyboardDatePicker from '@/components/KeyboardDatePicker'
import KeyboardDatePickerGroup from '@/components/DatePickerGroup'
import { styled } from '@mui/material/styles'
import moment from 'moment'
import './style.scss'

const MyMenuItem = styled(MenuItem)({
  '&.MuiList-root': {
    '& .MuiMenuItem-root': {
      display: 'block',
      minHeight: '1.5rem',
    },
  },
})

// 公告状态
let orderTypeList = ['全部', '已发布', '未发布', '已删除']

// 公告类型
let orderStateList = ['全部', '库存订单', '定制订单']

export interface FormParams {
  orderNo: string
  orderType: number
  email: string
  orderState: number
  startTime: null | Date | string | number
  endTime: null | Date | string | number
}

export default function SearchBar({
  onSubmit,
  onBack,
  searchBtnLoading,
  removeProp,
}: {
  onSubmit?: Function
  onBack?: Function
  searchBtnLoading: boolean
  removeProp?: string
}) {
  const [formParams, setFormParams] = useState<FormParams>({
    orderNo: '',
    email: '',
    orderType: 0,
    orderState: 0,
    startTime: null,
    endTime: null,
  })
  const { t } = useTranslation()
  const keyboardDatePickerGroupRef = useRef(null)
  const [open, setOpen] = useState<{ start: boolean; end: boolean }>({ start: false, end: false })
  // 初始化
  useEffect(() => {}, [])

  const handleInputChange = (e, type) => {
    formParams[type] = e.target.value
    setFormParams({ ...formParams })
  }

  // 提交按钮
  const handleSubmit = () => {
    let date = keyboardDatePickerGroupRef.current.getDate()
    formParams.startTime = new Date(date.startTime).getTime()
    formParams.endTime = new Date(date.endTime).getTime()
    ;(onSubmit as Function)(formParams)
  }

  // 返回按钮
  const handleBack = () => {
    onBack()
  }

  //重置按钮
  const handleReset = () => {
    setFormParams({
      orderNo: '',
      email: '',
      orderType: 0,
      orderState: 0,
      startTime: null,
      endTime: null,
    })
    keyboardDatePickerGroupRef.current.reset()
  }

  /* 时间选择器时间 */

  return (
    <>
      <Box
        sx={{
          padding: '20px 0 20px 20px',
        }}
        className="order_search-container"
      >
        <Grid container spacing={{ xs: 3 }}>
          {/* 订单编号 */}
          <Grid item xs={4} className="from-item">
            <FormLabel component="span" className="label">
              {/* {t('orderManagement.searchBar.orderCode')} */}
              公告标题
            </FormLabel>
            <MyInput
              size="small"
              placeholder={t('orderManagement.searchBar.orderCodePlaceholder')}
              value={formParams.orderNo}
              onChange={(e) => handleInputChange(e, 'orderNo')}
              autoComplete="off"
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={4} className="from-item">
            <FormLabel component="span" className="label">
              {/* {t('orderManagement.searchBar.email')} */}
              &nbsp;&nbsp;&nbsp;发布人
            </FormLabel>
            <MyInput
              size="small"
              placeholder={t('orderManagement.searchBar.emailPlaceholder')}
              value={formParams.email}
              onChange={(e) => handleInputChange(e, 'email')}
              autoComplete="off"
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          {/* 公告类型 */}
          {removeProp ? null : (
            <Grid item xs={4} className="from-item">
              <FormLabel component="span" className="label">
                {/* {t('orderManagement.searchBar.orderType')} */}
                公告状态
              </FormLabel>
              <MyInput
                size="small"
                select
                value={formParams.orderType}
                onChange={(e) => handleInputChange(e, 'orderType')}
                autoComplete="off"
                sx={{
                  width: '100%',
                }}
              >
                {orderTypeList.map((type, index) => (
                  <MenuItem key={index} value={index}>
                    {type}
                  </MenuItem>
                ))}
              </MyInput>
            </Grid>
          )}

          {/* 公告类型 */}
          <Grid
            item
            xs={4}
            className="from-item"
            style={{
              paddingTop: '16px',
            }}
          >
            <FormLabel component="span" className="label">
              {/* {t('orderManagement.searchBar.orderState')} */}
              公告类型
            </FormLabel>
            <MyInput
              size="small"
              select
              value={formParams.orderState}
              onChange={(e) => handleInputChange(e, 'orderState')}
              autoComplete="off"
              sx={{
                width: '100%',
              }}
            >
              {orderStateList.map((state, index) => (
                <MenuItem key={index} value={index}>
                  {state}
                </MenuItem>
              ))}
            </MyInput>
          </Grid>
          {/* 提交日期 */}

          <Grid
            item
            xs={5.5}
            lg={4}
            className="from-item"
            style={{
              paddingTop: '16px',
            }}
          >
            <FormLabel component="span" className="label">
              {t('orderManagement.searchBar.submitTime')}
            </FormLabel>

            <KeyboardDatePickerGroup ref={keyboardDatePickerGroupRef}></KeyboardDatePickerGroup>
          </Grid>
          <Grid
            className="from-item"
            xs={1}
            lg={0.7}
            style={{
              textAlign: 'center',
              marginLeft: '8px',
              marginRight: '8px',
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              style={{
                background: '#F2F3F5',
                borderRadius: '2px 2px 2px 2px',
                fontSize: '14px',
                color: '#666666',

                textAlign: 'center',
              }}
              className="weekNum"
            >
              近7天
            </Button>
          </Grid>
          <Grid
            xs={1}
            lg={0.7}
            style={{
              marginTop: '16px',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              style={{
                fontSize: '14px',
                color: '#666666',
                background: '#F2F3F5',
                borderRadius: '2px 2px 2px 2px',
                textAlign: 'center',
              }}
              className="monthNum"
            >
              近30天
            </Button>
          </Grid>
        </Grid>

        {/* 按钮组 */}
        <Box className="btn-bar">
          <Divider
            orientation="vertical"
            flexItem
            color="#E5E6EB"
            style={{
              margin: '0 20px',
            }}
          />
          <Stack spacing={2}>
            <LoadingButton
              onClick={() => handleSubmit()}
              startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
              className="search_btn"
              // sx={{
              //   height: '32px',
              //   padding: '9px 16px',
              //   background: '#2E6EDF',
              //   borderRadius: '2px',
              //   color: '#fff',
              //   '&:hover': {
              //     background: '#2E6EDF',
              //   },
              // }}
            >
              {t('customerManagement.searchBar.searchBtnText')}
            </LoadingButton>

            <Button
              onClick={handleReset}
              startIcon={<SvgIcon svgName="refresh_icon" svgClass="icon"></SvgIcon>}
              className="reset_btn"
            >
              {t('customerManagement.searchBar.resetBtnText')}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  )
}
