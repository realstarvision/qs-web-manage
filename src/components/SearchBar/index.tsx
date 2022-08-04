import React, { useEffect, useState, useRef, RefObject } from 'react'
import { TextField, MenuItem, Stack, Grid, FormLabel, Box, Menu } from '@mui/material'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DatePicker from '@/components/DatePicker'
import Slider from '@/components/Slider'
import Button from '@/components/Button'
import Input from '@/components/Input'
import SvgIcon from '../SvgIcon'
import { getSatelliteList } from '@/api/satellite'
import { styled } from '@mui/material/styles'
import './style.scss'

interface Satellite {
  id: number
  satelliteName: string
}

interface FormParams {
  inputValue: string
  selectValue: number
  sliderValue: number
  startDateValue: Date | null
  endDateValue: Date | null
}

export default function SearchBar({ onSubmit }: { onSubmit?: Function }) {
  const inputRef = useRef<any>(null)
  const [open, setOpen] = useState<{ start: boolean; end: boolean }>({ start: false, end: false })
  const [satelliteList, setSatelliteList] = useState<Array<Satellite>>([])
  // const [selectValue, setSelectValue] = useState<number | null>(null)
  // const [sliderValue, setSliderValue] = useState<number>(0)
  const [formParams, setFormParams] = useState<FormParams>({
    inputValue: '',
    selectValue: 0,
    sliderValue: 0,
    startDateValue: null,
    endDateValue: null,
  })

  // 初始化
  useEffect(() => {
    //获取卫星数据
    getSatelliteList().then(({ data, code }: any) => {
      if (code === 0) {
        // 存储卫星基本数据信息
        setSatelliteList(data)
        // 存储下拉框value数据
        // setSelectValue(data[0].id)
        formParams.selectValue = data[0].id
        setFormParams(formParams)
      }
    })
  }, [])

  // 下拉框改变事件
  const handleSelectChange = (event: any) => {
    // setSelectValue(event.target.value)
    formParams.selectValue = event.target.value
    setFormParams({ ...formParams })
  }

  //滑块改变事件
  const handleSliderChange = (event: any) => {
    // setSliderValue(event.target.value)
    formParams.sliderValue = event.target.value
    setFormParams({ ...formParams })
  }

  // 输入框事件
  const handleInputChange = () => {
    formParams.inputValue = inputRef.current.value
    setFormParams({ ...formParams })
  }

  // 时间选择器
  const handleDate = (value: Date, type: number) => {
    if (type === 1) {
      formParams.startDateValue = value
    } else {
      formParams.endDateValue = value
    }
    setOpen({ start: false, end: false })
    setFormParams({ ...formParams })
  }

  // 时间选择器获取焦点事件
  const handleFocus = (type: number) => {
    if (type === 1) {
      setOpen({ start: true, end: false })
    } else {
      setOpen({ start: false, end: true })
    }
  }

  // 提交按钮
  const handleSubmit = (pageNumber: number) => {
    ;(onSubmit as Function)(formParams, pageNumber)
  }

  //重置按钮
  const handleReset = () => {
    setFormParams({
      inputValue: '',
      selectValue: satelliteList[0].id,
      sliderValue: 0,
      startDateValue: null,
      endDateValue: null,
    })
  }

  //上传
  const handleUpload = () => {
    console.log('上传')
  }

  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, md: 2, lg: 4 }}
        sx={{
          padding: '20px 0',
        }}
      >
        <Grid item xs={4} className="from-item">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="data_icon" svgClass="icon"></SvgIcon> 数据
          </FormLabel>
          <Input
            required
            // helperText={formParams.inputValue ? '' : '不能为空!'}
            id="dataInput"
            size="small"
            placeholder="请输入名称"
            inputRef={inputRef}
            value={formParams.inputValue}
            onChange={handleInputChange}
            sx={{
              width: '40%',
            }}
          />
        </Grid>
        <Grid item xs={4} className="from-item">
          <FormLabel
            component="span"
            className="label"
            sx={{
              minWidth: '100px',
            }}
          >
            <SvgIcon svgName="calendar_icon" svgClass="icon"></SvgIcon> 采集时间
          </FormLabel>
          <Stack
            // spacing={1}
            direction="row"
            className="data-box"
          >
            <DatePicker
              open={open.start}
              value={formParams.startDateValue}
              onChange={(value: Date) => handleDate(value as Date, 1)}
              maxDate={formParams.endDateValue ? new Date(formParams.endDateValue) : ''}
              onFocus={() => handleFocus(1)}
              placeholder="起始时间"
              className="hidden-icon"
            ></DatePicker>
            <SvgIcon svgName="date_icon" svgClass="icon"></SvgIcon>
            <DatePicker
              open={open.end}
              value={formParams.endDateValue}
              onChange={(value: Date) => handleDate(value as Date, 2)}
              minDate={formParams.startDateValue ? new Date(formParams.startDateValue) : ''}
              onFocus={() => handleFocus(2)}
              placeholder="截止时间"
              className="end hidden-icon"
            ></DatePicker>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }}>
        <Grid item xs={4} className="from-item">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="satellite_icon" svgClass="icon"></SvgIcon> 卫星
          </FormLabel>
          <Input
            id="outlined-select-currency"
            select
            value={formParams.selectValue}
            onChange={handleSelectChange}
            size="small"
          >
            {satelliteList.map((satellite: Satellite) => (
              <MenuItem key={satellite.id} value={satellite.id}>
                {satellite.satelliteName}
              </MenuItem>
            ))}
          </Input>
        </Grid>
        <Grid item xs={4} className="from-item">
          <FormLabel component="span" className="label cloud">
            <SvgIcon svgName="cloud_icon" svgClass="icon"></SvgIcon> 云量
            <p className="value">{formParams.sliderValue}%</p>
          </FormLabel>
          <Slider
            aria-label="Default"
            value={formParams.sliderValue}
            onChange={handleSliderChange}
            size="small"
            valueLabelDisplay="off"
            sx={{
              width: '50%',
            }}
          />
        </Grid>

        <Grid item xs={4} className="from-item" sx={{ justifyContent: 'end' }}>
          <Stack direction="row" className="btn-bar">
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<SvgIcon svgName="reset_icon" svgClass="icon"></SvgIcon>}
            >
              重置
            </Button>
            <Button
              onClick={() => handleSubmit(1)}
              startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
            >
              搜索
            </Button>
            {/* <Box className="upload">
              <span>数据上传</span>
              <div>
                <SvgIcon svgName="upload_icon" svgClass="icon"></SvgIcon>
              </div>
            </Box> */}
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
