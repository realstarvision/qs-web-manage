import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { styled } from '@mui/material/styles'
import { TableCell, TableRow, Modal, Button, Box, Divider, Typography, Alert } from '@mui/material'
import SearchBar from '@/components/SearchBar'
import Table, { Column } from '@/components/NewTable'
import Dialog from '@/components/Dialog'
import Snackbar from '@/components/Snackbar'
import SvgIcon from '@/components/SvgIcon'
import { getFileList } from '@/api/data'
import map from '@/assets/image/png/map.png'
import moment from 'moment'
import dialogColumns from './columns'
import './style.scss'

interface Params {
  selectValue?: number | undefined
  inputValue?: string | undefined
  endDateValue?: moment.MomentInput
  startDateValue?: moment.MomentInput
  sliderValue?: number | undefined
  pageNumber: number
  pageSize: number
  count: number
  total: number
}

function MyDialog({ visible, onClose, data }: { visible: boolean; onClose: Function; data: any }) {
  const handleClose = () => {
    onClose()
  }
  return (
    <Dialog visible={visible} onClose={handleClose}>
      <Box className="dialog">
        <img src={data.thumbnailUrl ? `data:image/jpg;base64,${data.thumbnailUrl}` : map} />
        <Box className="details">
          <Typography className="title">数据详情</Typography>
          <Divider className="hr" />
          {dialogColumns.map((item) => (
            <Box className="details-list">
              <Typography className="font">{item.label}</Typography>
              <Typography className="font">{data[item.key]}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Dialog>
  )
}

export default function index() {
  const columns: Column[] = [
    {
      align: 'center',
      title: '数据名称',
      key: 'identifier',
    },
    {
      align: 'center',
      title: '卫星',
      key: 'satelliteName',
    },
    {
      align: 'center',
      title: '数据级别',
      key: 'productLevel',
    },
    {
      align: 'center',
      title: '采集时间',
      key: 'endTime',
    },
    {
      align: 'center',
      title: '云量',
      key: 'cloudCoverage',
    },
    {
      align: 'center',
      title: '操作',
      key: 'operate',
      slot: function ({ row }: { row: any }) {
        return (
          <Button variant="text" onClick={() => handleCheck(row)} className="btn">
            查看
          </Button>
        )
      },
    },
  ]
  // 定时器
  let timer: NodeJS.Timeout | null | undefined = null
  // 状态变量
  const [listData, setListData] = useState([])
  const [visible, setVisible] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [rowData, setRowData] = useState({})
  const [formParams, setFormParams] = useState<Params | null>(null)
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 10,
    count: 0,
    total: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  // 关闭详情弹出框
  const handleClose = () => {
    setVisible(false)
  }
  // 关闭提示弹出框
  const handleSnackbarClose = () => {
    setSnackbarVisible(false)
  }
  // 列表搜索接口
  const handleSubmit = (value: Params, pageNumber?: number) => {
    if (!value.startDateValue || !value.endDateValue) {
      setSnackbarVisible(true)
      return false
    }
    setFormParams(value)
    if (pageNumber) {
      page.pageNumber = 1
      setPage({ ...page })
    }
    const params = {
      ...page,
      satelliteId: value.selectValue,
      identifier: value.inputValue,
      shootEndTime: moment(value.endDateValue).format('YYYY-MM-DD'),
      shootStartTime: moment(value.startDateValue).format('YYYY-MM-DD'),
      cloudCoverage: value.sliderValue,
    }
    setLoading(true)
    getFileList(params)
      .then(({ code, data }: any) => {
        if (code === 0) {
          page.count = Math.ceil(data.total / page.pageSize)
          page.total = data.total
          setPage({ ...page })
          let newData = data.satelliteDataDTOS.map(
            (item: { startTime: string; endTime: string; cloudCoverage: string | number }) => {
              // 云量处理
              const cloudCoverage = (item.cloudCoverage as number).toFixed(2)
              item.cloudCoverage = (cloudCoverage.toString() === '0.00' ? 0 : cloudCoverage) + '%'
              // 日期处理
              item.startTime = moment(item.startTime).format('YYYY/MM/DD ')
              item.endTime = moment(item.endTime).format('YYYY/MM/DD')
              return item
            }
          )
          setListData(newData)
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // 查看
  const handleCheck = (value: any) => {
    console.log(value)
    setRowData(value)
    setVisible(true)
  }

  // 页面改变事件
  const handlePageChange = (e: any, value: number) => {
    page.pageNumber = value
    setPage({ ...page })
    const params = {
      ...page,
      ...formParams,
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      handleSubmit(params)
      clearTimeout(timer as NodeJS.Timeout)
    }, 500)
  }
  return (
    <Box className="data-list">
      <Box className="content">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarVisible}
          onClose={handleSnackbarClose}
          autoHideDuration={3000}
          sx={{}}
        >
          <Alert
            severity="error"
            sx={{
              width: '224px',
              background: '#3b4154',
              boxShadow: '0px 2px 8px 0px rgba(26,28,37,0.5000)',
              borderRadius: '2px',
              color: '#fff',
              fontSize: '12px',
              padding: '0 35px',
            }}
          >
            采集时间不能为空!
          </Alert>
        </Snackbar>
        <SearchBar onSubmit={handleSubmit}></SearchBar>
        <Divider className="divider" />
        <Table
          data={listData}
          columns={columns}
          pagination={page}
          operate={['check']}
          onCheck={handleCheck}
          onPageChange={handlePageChange}
          loading={loading}
        ></Table>
      </Box>
      <MyDialog visible={visible} onClose={() => handleClose()} data={rowData}></MyDialog>
    </Box>
  )
}
