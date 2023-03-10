import React, { useEffect, useState, useRef, RefObject } from 'react'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import KeyboardDatePicker from '@/components/KeyboardDatePicker'
import KeyboardDatePickerGroup from '@/components/DatePickerGroup'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import './style.scss'

export interface FormParams {
  userId: string
  startTime: null | Date | string | number
  endTime: null | Date | string | number
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
  const keyboardDatePickerGroupRef = useRef(null)
  const [formParams, setFormParams] = useState<FormParams>({
    userId: '',
    startTime: null,
    endTime: null,
  })
  const { t } = useTranslation()
  const [open, setOpen] = useState<{ start: boolean; end: boolean }>({ start: false, end: false })

  /* 输入框事件 */
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
      userId: '',
      startTime: null,
      endTime: null,
    })
    keyboardDatePickerGroupRef.current.reset()
  }

  /* 时间选择器时间 */
  const handleDateChange = (date, type) => {
    if (type === 'start') {
      formParams.startTime = date
    } else {
      formParams.endTime = date
    }
    setFormParams({ ...formParams })
  }

  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, md: 1, lg: 4 }}
        sx={{
          padding: '20px 0 20px 20px',
        }}
        className="customer_search-container"
      >
        <Grid item xs={3.5} className="from-item">
          <FormLabel component="span" className="label">
            {t('customerManagement.searchBar.accountCode')}
          </FormLabel>
          <MyInput
            required
            id="phoneInput"
            size="small"
            placeholder={t('customerManagement.searchBar.accountCodePlaceholder')}
            value={formParams.userId}
            onChange={(e) => handleInputChange(e, 'userId')}
            autoComplete="off"
            sx={{
              width: '100%',
              // maxWidth: '243px'
            }}
          />
        </Grid>
        <Grid item xs={4} className="from-item">
          <FormLabel component="span" className="label">
            {t('customerManagement.searchBar.submitTime')}
          </FormLabel>
          <KeyboardDatePickerGroup
            ref={keyboardDatePickerGroupRef}
            style={{ maxWidth: '330px' }}
          ></KeyboardDatePickerGroup>
        </Grid>
        <Grid item xs={4.5} sx={{ justifyContent: 'end' }}>
          <Stack direction="row" className="btn-bar" spacing={3}>
            <Divider orientation="vertical" flexItem color="#E5E6EB" />
            <LoadingButton
              loading={searchBtnLoading}
              onClick={() => handleSubmit()}
              startIcon={searchBtnLoading ? '' : <SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
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
        </Grid>
      </Grid>
    </>
  )
}
