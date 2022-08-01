import React, { ReactNode, useEffect, useState } from 'react'
import { Box, Grid, FormLabel, Stack, MenuItem, Divider, Typography } from '@mui/material'
import Input from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import { getListOriginalSet } from '@/api/algorithm'
import mapImg from '@/assets/image/png/map.png'
import { ReactI18NextChild } from 'react-i18next'
// import columns from './columns'
// import './style.scss'

export default function index() {
  const [loading, setLoading] = useState<boolean>(false)
  const [formParams, setFormParams] = useState<{ tagName: string; taskName: string }>({
    tagName: '',
    taskName: '',
  })
  const [page, setPage] = useState<{ pageNumber: number; pageSize: number; total: number }>({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  })
  const [listData, setListData] = useState<any>([])
  // 输入框事件
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: number) => {
    let value = e.target.value
    if (type === 1) {
      formParams.taskName = value
    } else if (type === 2) {
      formParams.tagName = value
    }
    setFormParams({ ...formParams })
  }
  // 重置事件
  const handleReset = () => {
    setFormParams({ tagName: '', taskName: '' })
  }
  // 搜索事件
  const handleSubmit = () => {
    getListData()
  }
  // 数据初始化
  useEffect(() => {
    getListData()
  }, [])
  // 文件下载
  const handleUpload = (data: {
    taskName?: React.ReactNode
    tags?: { tagName: ReactI18NextChild | Iterable<ReactI18NextChild> }[]
    dataUrl?: any
  }) => {
    window.location.href = data.dataUrl
  }

  // 数据列表查询接口
  const getListData = () => {
    const params = { ...page, ...formParams }
    getListOriginalSet(params).then(({ code, data }: { code?: number; data: any }) => {
      if (code === 0) {
        setListData(data.list)
      }
    })
  }
  return (
    <Box className="log">
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }} className="form-bar">
        <Grid item xs={4} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="data_icon" svgClass="icon"></SvgIcon> 名称
          </FormLabel>
          <Input
            required
            // helperText={formParams.inputValue ? '' : '不能为空!'}
            id="outlined-required"
            size="small"
            placeholder="请输入"
            // inputRef={inputRef}
            value={formParams.taskName}
            onChange={(e) => handleInputChange(e, 1)}
          />
        </Grid>
        <Grid item xs={4} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="data_icon" svgClass="icon"></SvgIcon> 标签
          </FormLabel>

          <Input
            required
            // helperText={formParams.inputValue ? '' : '不能为空!'}
            id="outlined"
            size="small"
            placeholder="请输入"
            // inputRef={inputRef}
            value={formParams.tagName}
            onChange={(e) => handleInputChange(e, 2)}
          />
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
      {/* <Table data={tableData} columns={columns} pagination={{ count: 10, onChange }} loading={loading}></Table> */}
      <Box sx={{ display: 'flex' }}>
        {listData.map(
          (data: {
            taskName: ReactNode
            tags: {
              tagName: ReactI18NextChild | Iterable<ReactI18NextChild>
            }[]
          }) => (
            <Box sx={{ mr: 10 }}>
              <img src={mapImg} style={{ width: '200px', height: '100px' }} />
              <Box>
                <Typography>数据名称：{data.taskName}</Typography>
                <Typography>
                  标签：
                  {data.tags && data.tags.map((tag) => <span style={{ marginRight: '5px' }}>{tag.tagName}</span>)}
                </Typography>
              </Box>
              <Button onClick={() => handleUpload(data)}>下载</Button>
            </Box>
          )
        )}
      </Box>
    </Box>
  )
}
