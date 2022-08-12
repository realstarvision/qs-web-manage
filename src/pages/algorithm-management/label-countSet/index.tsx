import React, { ReactNode, useEffect, useState } from 'react'
import { Box, Grid, FormLabel, Stack, MenuItem, Button, Divider, Typography, Popper } from '@mui/material'
import MyButton from '@/components/Button'
import Input from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import Table, { Column } from '@/components/Table'
import { getListLabelSet, getOriginaByUuid } from '@/api/algorithm'
import InputAdornment from '@mui/material/InputAdornment'
import Tag from '@/components/Tag'
import { repetition } from '@/untils/tool'
import { MyPopover, popoverWidth } from './components'
import '../triangle.scss'

export default function index() {
  const [loading, setLoading] = useState<boolean>(false)
  const [formParams, setFormParams] = useState<{
    serachName: string
  }>({
    serachName: '',
  })
  const [listData, setListData] = useState<Array<any>>([])
  const [filterListData, setFilterListData] = useState<Array<any>>([])
  const [tags, setTags] = useState<Array<any>>([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [checkData, setCheckData] = useState<{ dataUrl: string; uuid: number | string; taskName: string }>({
    dataUrl: '',
    uuid: '',
    taskName: '',
  })
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  })
  // 定时器
  let timer: NodeJS.Timeout | null | undefined = null

  // 变量
  const columns: Column[] = [
    {
      key: 'uuid',
      align: 'center',
      title: 'ID',
    },
    {
      key: 'taskName',
      align: 'center',
      title: '原始数据名称',
      slot: function ({ row }: { row: { tags: Array<{ tagName: string }>; taskName: string } }) {
        return (
          <Box>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#AEBDD8',
              }}
            >
              {row.taskName}
            </p>
            <Box
              sx={{
                marginTop: '8px',
              }}
            >
              {row.tags && row.tags.map((tag: { tagName: string }) => <Tag content={tag.tagName} />)}
            </Box>
          </Box>
        )
      },
    },
    {
      key: 'oprated',
      align: 'center',
      title: '操作',
      slot: function ({
        row,
      }: {
        row: {
          id: string | undefined
          open?: any
          extend?: string
          dataUrl?: string
        }
      }) {
        return (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              aria-describedby={row.id}
              key={row.id}
              variant="text"
              onClick={(e) => handleCheckOriginal(e, row)}
              className="btn"
              sx={{
                color: row.open ? '#fff' : '',
              }}
            >
              查看原始数据
            </Button>

            <MyButton
              onClick={() => handleDownload(row)}
              startIcon={<SvgIcon svgName="download" svgClass="icon"></SvgIcon>}
              sx={{
                fontSize: '12px',
                height: '24px',
              }}
            >
              下载
            </MyButton>
          </Stack>
        )
      },
    },
  ]
  // 查看原始数据
  const handleCheckOriginal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: {
      id: string | undefined
      open?: any
      extend?: string | undefined
      dataUrl?: string | undefined
    }
  ) => {
    const currentTarget = e.currentTarget
    let coord = {
      x: e.pageX,
      y: e.pageY,
    }
    setCoord({ ...coord })

    row.extend &&
      getOriginaByUuid({ extend: row.extend }).then(({ code, data }: { code?: number; data: any }) => {
        if (code === 0) {
          setCheckData(data[0])
          setAnchorEl(currentTarget)
        }
      })
  }

  // 弹出框取消事件
  const handleClose = () => {
    setAnchorEl(null)
    setTimeout(() => {
      setCheckData({ dataUrl: '', uuid: '', taskName: '' })
    }, 300)
  }
  // 下载按钮
  const handleDownload = (row: {
    id: string | undefined
    open?: any
    extend?: string | undefined
    dataUrl?: string | undefined
  }) => {
    row.dataUrl && (window.location.href = row.dataUrl)
  }
  // 输入框事件
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: number) => {
    let value = e.target.value
    formParams.serachName = value
    setFormParams({ ...formParams })
  }
  // 重置事件
  const handleReset = () => {
    setFormParams({ serachName: '' })
  }
  // 搜索事件
  const handleSubmit = () => {
    getListData()
  }
  // 数据初始化
  useEffect(() => {
    getListData()
  }, [])

  //tag的点击事件
  const handleTagClick = (data: { id: number }) => {
    let checkTags: number[] = []
    tags.forEach((tag) => {
      if (tag.id === data.id) {
        tag.checked = !tag.checked
      }
      if (tag.checked) {
        checkTags.push(tag.id)
      }
    })
    let filterData = listData.filter((value) => {
      let tagsList = value.tags
      if (tagsList) {
        return tagsList.find((item: { id: number }) => {
          if (checkTags.includes(item.id)) {
            return true
          }
        })
      }
    })
    setFilterListData(filterData.length > 0 ? filterData : listData)
  }

  // 数据列表查询接口
  const getListData = (tagIds?: any) => {
    const params = { ...formParams, ...tagIds }
    setLoading(true)
    getListLabelSet(params)
      .then(({ code, data }: { code?: number; data: any }) => {
        if (code === 0) {
          let tags: Array<any> = []
          let list = data.map((item: { open: boolean; tags: [] }) => {
            item.open = false
            if (item.tags) {
              item.tags.forEach((tag: { checked: boolean }) => {
                tag.checked = false
                tags.push(tag)
              })
            }
            return item
          })
          if (!tagIds) {
            setTags(repetition(tags))
          }
          setListData(list)
          setFilterListData(list)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <Box className="log">
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }} className="form-bar">
        <Grid item xs={8} className="input-box">
          <FormLabel component="span" className="label">
            <SvgIcon svgName="label_data" svgClass="icon"></SvgIcon>标注数据查询
          </FormLabel>
          <Input
            required
            id="outlined-required"
            size="small"
            placeholder="支持名称或属性描述模糊搜索"
            sx={{
              width: '50%',
            }}
            // inputRef={inputRef}
            value={formParams.serachName}
            onChange={(e) => handleInputChange(e, 1)}
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    position: 'absolute',
                    right: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4} className="btn-box">
          <Stack direction="row" className="btn-bar">
            <MyButton
              variant="outlined"
              onClick={handleReset}
              startIcon={<SvgIcon svgName="reset_icon" svgClass="icon"></SvgIcon>}
            >
              重置
            </MyButton>
            <MyButton onClick={handleSubmit} startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}>
              搜索
            </MyButton>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }} className="form-bar">
        <Grid item xs={8} className="input-box">
          <Box
            sx={{
              width: 'calc(100% - 126px)',
              marginLeft: '126px',
            }}
          >
            <Box>
              {tags.map((tag) => (
                <span onClick={() => handleTagClick(tag)}>
                  <Tag content={tag.tagName} unchecked={!tag.checked} symbol={tag.checked ? '-' : '+'}></Tag>
                </span>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className="btn-box"></Grid>
      </Grid>
      <Divider
        sx={{
          marginBottom: '20px',
        }}
      />
      <Table columns={columns} data={filterListData} loading={loading} operate={['checkOriginal', 'download']}></Table>
      <MyPopover
        sx={{
          top: coord.y,
          left: coord.x - popoverWidth,
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <PopoverContent data={checkData}></PopoverContent>
      </MyPopover>
    </Box>
  )
}

// 悬浮框内容
function PopoverContent({ data }: { data: { dataUrl: string; uuid: number | string; taskName: string } }) {
  const handleDownload = () => {
    window.location.href = data.dataUrl
  }
  return (
    <Box className="popover-content">
      <Box className="info">
        <Typography className="name">{data.taskName}</Typography>
        <Typography className="id">ID： {data.uuid}</Typography>
      </Box>
      <Box className="download" onClick={handleDownload}>
        <SvgIcon svgName="download" svgClass="icon"></SvgIcon>
        <Typography className="font">下载关联原始数据</Typography>
      </Box>
    </Box>
  )
}
