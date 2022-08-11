import React, { useState, useEffect } from 'react'
import { getLogList } from '@/api/log'
import { userList } from '@/api/user'
import { Box, Grid, FormLabel, Stack, MenuItem, Divider } from '@mui/material'
import Table from '@/components/NewTable'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import columns from './columns'
import moment from 'moment'
import './style.scss'

export default function index() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [formParams, setFormParams] = useState<{ userId: string; dateTime: null | Date }>({
    userId: '0',
    dateTime: null,
  })
  const [page, setPage] = useState<{ pageNumber: number; pageSize: number; total: number }>({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  })
  const [userListData, setUserListData] = useState<
    Array<{
      userId: string
      nickName: string
    }>
  >([{ nickName: '所有人员', userId: '0' }])

  // 定时器
  let timer: NodeJS.Timeout | null | undefined = null

  // 操作人员框chang事件
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formParams.userId = e.target.value
    setFormParams({ ...formParams })
  }

  // 重置事件
  const handleReset = () => {
    setFormParams({ userId: '0', dateTime: null })
  }

  // 搜索事件
  const handleSubmit = (pageNumber?: number) => {
    getLogListData(pageNumber)
  }

  // 日期选择事件
  const handleDate = (value: Date) => {
    setFormParams({ ...formParams, dateTime: value })
  }

  // 分页改变事件
  const handlePageChange = (e: any, value: number) => {
    page.pageNumber = value
    setPage({ ...page })
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      handleSubmit()
      clearTimeout(timer as NodeJS.Timeout)
    }, 500)
  }

  // 获取日志数据列表
  const getLogListData = (pageNumber?: number) => {
    if (pageNumber) {
      page.pageNumber = pageNumber
      setPage({ ...page })
    }
    const params = { ...page, ...formParams }
    if (params.userId === '0') {
      params.userId = ''
    }
    if (params.dateTime) {
      params.dateTime = moment(params.dateTime).format('YYYY-MM-DD') as unknown as Date
    }
    setLoading(true)
    getLogList(params)
      .then(({ code, data }: { code?: number; data: any }) => {
        if (code === 0) {
          setList(data.records)
          page.total = data.total
          setPage({ ...page })
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // 获取用户列表数据
  const getUserList = () => {
    userList().then(({ code, data }: { code?: number; data: Array<{ nickName: string; userId: string }> }) => {
      if (code === 0) {
        setUserListData([...userListData, ...data])
        formParams.userId = userListData[0].userId
        setFormParams(formParams)
      }
    })
  }

  // 初始化
  useEffect(() => {
    getUserList()
    getLogListData()
  }, [])

  return (
    <Box className="log">
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }} className="form-bar">
        <Grid item xs={4} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="operate_person" svgClass="icon"></SvgIcon> 操作人员
          </FormLabel>
          <Input select value={formParams.userId} onChange={(e) => handleSelectChange(e)} size="small">
            {userListData.map((user) => (
              <MenuItem key={user.userId} value={user.userId}>
                {user.nickName}
              </MenuItem>
            ))}
          </Input>
        </Grid>
        <Grid item xs={4} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="operate_date" svgClass="icon"></SvgIcon> 操作日期
          </FormLabel>

          <DatePicker
            className="date"
            value={formParams.dateTime}
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
            <Button
              onClick={() => handleSubmit(1)}
              startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}
            >
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
      <Table data={list} columns={columns} loading={loading} pagination={page} onPageChange={handlePageChange}></Table>
    </Box>
  )
}
