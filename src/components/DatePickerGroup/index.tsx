import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Box } from '@mui/material'
import KeyboardDatePicker from '@/components/KeyboardDatePicker'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import { useTranslation } from 'react-i18next'
import './style.scss'

function index({ style = {} }, ref) {
  const { t } = useTranslation()
  // 存储日期
  const [date, setDate] = useState({
    startTime: null,
    endTime: null,
  })
  // 向外暴露
  useImperativeHandle(ref, () => ({
    getDate,
    reset,
    setDate,
  }))

  /* 时间选择器时间 */
  const handleDateChange = (value, type) => {
    if (type === 'start') {
      date.startTime = value
    } else {
      date.endTime = value
    }
    setDate({ ...date })
  }

  /* 获取日期 */
  function getDate() {
    return date
  }

  /* 重置日期 */
  const reset = () => {
    setDate({
      startTime: null,
      endTime: null,
    })
  }

  /* 计算时间 */
  function CalculateTime(date, interval) {
    return new Date(new Date(date).getTime() + interval * 24 * 60 * 60 * 1000)
  }
  return (
    <Box className="datePickerGroup-container" style={style}>
      <KeyboardDatePicker
        value={date.startTime}
        placeholder={t('date.startTime')}
        onChange={(date) => handleDateChange(date, 'start')}
        maxDate={date.endTime ? CalculateTime(date.endTime, -1) : new Date('2100-01-01')}
        format="yyyy/MM/dd"
        keyboardIcon={<SvgIcon svgName="date_icon" svgClass="icon"></SvgIcon>}
        okLabel={<Button className="date_btn">确认</Button>}
        cancelLabel={<span className="date_cancel_btn">取消</span>}
        // variant="inline"
        style={{
          width: '45%',
        }}
      />
      <span className="divider"></span>
      <KeyboardDatePicker
        value={date.endTime}
        placeholder={t('date.endTime')}
        onChange={(date) => handleDateChange(date, 'end')}
        minDate={date.startTime ? CalculateTime(date.startTime, 1) : new Date('1900-01-01')}
        format="yyyy/MM/dd"
        keyboardIcon={<SvgIcon svgName="date_icon" svgClass="icon"></SvgIcon>}
        okLabel={<Button className="date_btn">确认</Button>}
        cancelLabel={<span className="date_cancel_btn">取消</span>}
        // variant="inline"
        style={{
          width: '45%',
        }}
      />
    </Box>
  )
}

export default forwardRef(index)
