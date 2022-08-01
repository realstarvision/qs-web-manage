import React, { useState } from 'react'
import { Box, Grid, FormLabel, Stack, MenuItem, Divider } from '@mui/material'
import Table from '@/components/Table'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import columns from './columns'
import './style.scss'

export default function index() {
  const [loading, setLoading] = useState<boolean>(false)
  const [formParams, setFormParams] = useState<{ selectValue: number; date: null | Date }>({
    selectValue: 0,
    date: null,
  })
  const userList = [
    {
      id: 0,
      satelliteName: '一号',
    },
    {
      id: 1,
      satelliteName: '二号',
    },
  ]
  // 输入框事件
  const handleSelectChange = () => {}
  // 重置事件
  const handleReset = () => {}
  // 搜索事件
  const handleSubmit = () => {}
  // 日期选择事件
  const handleDate = (value: Date) => {
    setFormParams({ ...formParams, date: value })
  }

  // table数据
  const tableData = [
    {
      department: '软件工程部',
      user: 'xxxx',
      time: '2022-4-6',
      location: '220.237.120.36',
      record: '上传56个数据文件',
    },
  ]

  const onChange = (value: React.MouseEvent<HTMLElement>, page: number) => {
    console.log(value)
    console.log(page)
  }
  return (
    <Box className="log">
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }} className="form-bar">
        <Grid item xs={4} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="data_icon" svgClass="icon"></SvgIcon> 操作人员
          </FormLabel>
          <Input
            id="outlined-select-currency"
            select
            value={formParams.selectValue}
            onChange={handleSelectChange}
            size="small"
          >
            {userList.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.satelliteName}
              </MenuItem>
            ))}
          </Input>
        </Grid>
        <Grid item xs={4} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="data_icon" svgClass="icon"></SvgIcon> 操作日期
          </FormLabel>

          <DatePicker
            className="date"
            value={formParams.date}
            onChange={(value: Date) => handleDate(value as Date)}
          ></DatePicker>
        </Grid>
        <Grid item xs={4} className="btn-box">
          <Stack direction="row" className="btn-bar">
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<SvgIcon svgName="reset_icon" svgClass="icon"></SvgIcon>}
            >
              重置
            </Button>
            <Button onClick={handleSubmit} startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}>
              查询
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
      <Divider className="divider" />
      <Table data={tableData} columns={columns} pagination={{ count: 10, onChange }} loading={loading}></Table>
    </Box>
  )
}
