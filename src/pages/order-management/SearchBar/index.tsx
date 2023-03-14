import React, { useEffect, useState, useRef, RefObject } from 'react'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
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

// 工单状态
let workOrderStateList = ['全部', '待派发', '待处理', '处理中', '已完结', '被驳回']

// 工单类型
let workOrderTypeList = ['全部', '沉降', '内涝', '智能垃圾柜']

export interface FormParams {
  id: string
  orderBoard: number
  orderStatus: number
  startDate: null | Date | string | number
  endDate: null | Date | string | number
}

export default function SearchBar({
  onSubmit,
  onBack,
  searchBtnLoading,
}: {
  onSubmit?: Function
  onBack?: Function
  searchBtnLoading: boolean
}) {
  const [formParams, setFormParams] = useState<FormParams>({
    id: '',
    orderBoard: 0,
    orderStatus: 0,
    startDate: null,
    endDate: null,
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

  // 提交按钮 moment(date.startTime).format('YYYY/MM/DD')   moment(date.endTime).format('YYYY/MM/DD')
  const handleSubmit = () => {
    let date = keyboardDatePickerGroupRef.current.getDate()
    formParams.startDate = date.startTime ? date.startTime : null
    formParams.endDate = date.endTime ? date.endTime : null
    ;(onSubmit as Function)(formParams)
  }

  //重置按钮
  const handleReset = () => {
    setFormParams({
      id: '',
      orderBoard: 0,
      orderStatus: 0,
      startDate: null,
      endDate: null,
    })
    keyboardDatePickerGroupRef.current.reset()
  }

  /* 近7天，近30天按钮 */
  const handleSetDate = (intervalTime) => {
    let start = new Date(new Date().getTime() - intervalTime * 24 * 60 * 60 * 1000)
    let end = new Date()
    keyboardDatePickerGroupRef.current.setDate({ startTime: start, endTime: end })
  }
  return (
    <>
      <Box className="order_search-container">
        <Grid container spacing={{ xs: 3 }}>
          {/* 事件编号 */}
          <Grid item xs={4} className="from-item">
            <FormLabel component="span" className="label">
              事件编号
            </FormLabel>
            <MyInput
              size="small"
              placeholder={t('orderManagement.searchBar.orderCodePlaceholder')}
              value={formParams.id}
              onChange={(e) => handleInputChange(e, 'id')}
              autoComplete="off"
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          {/* 工单类型 */}
          <Grid item xs={4} className="from-item">
            <FormLabel component="span" className="label">
              工单类型
            </FormLabel>
            <MyInput
              size="small"
              select
              value={formParams.orderBoard}
              placeholder={t('orderManagement.searchBar.orderTypePlaceholder')}
              onChange={(e) => handleInputChange(e, 'orderBoard')}
              autoComplete="off"
              sx={{
                width: '100%',
              }}
            >
              {workOrderTypeList.map((type, index) => (
                <MenuItem key={index} value={index}>
                  {type}
                </MenuItem>
              ))}
            </MyInput>
          </Grid>
          {/* 事件状态 */}
          <Grid item xs={4} className="from-item">
            <FormLabel component="span" className="label">
              事件状态
            </FormLabel>
            <MyInput
              size="small"
              select
              value={formParams.orderStatus}
              onChange={(e) => handleInputChange(e, 'orderStatus')}
              autoComplete="off"
              sx={{
                width: '100%',
              }}
            >
              {workOrderStateList.map((state, index) => (
                <MenuItem key={index} value={index}>
                  {state}
                </MenuItem>
              ))}
            </MyInput>
          </Grid>
          {/* 创建时间 */}
          <Grid item xs={8} className="from-item">
            <FormLabel component="span" className="label">
              创建时间
            </FormLabel>
            <Stack spacing={2} direction="row">
              <KeyboardDatePickerGroup ref={keyboardDatePickerGroupRef}></KeyboardDatePickerGroup>
              <Button className="btn" onClick={() => handleSetDate(7)}>
                近7天
              </Button>
              <Button className="btn" onClick={() => handleSetDate(30)}>
                近30天
              </Button>
            </Stack>
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
          <Stack spacing={3}>
            <LoadingButton
              loading={searchBtnLoading}
              onClick={() => handleSubmit()}
              startIcon={searchBtnLoading ? '' : <SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
              className="search_btn"
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
