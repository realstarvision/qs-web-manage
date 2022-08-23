import React, { ReactNode, useEffect, useState } from 'react'
import { Box, Grid, FormLabel, Stack, MenuItem, Button, Divider, Typography } from '@mui/material'
import Input from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import MyButton from '@/components/Button'
import Table, { Column } from '@/components/Table'
import { getListOriginalSet, getLabelByUuid } from '@/api/algorithm'
import InputAdornment from '@mui/material/InputAdornment'
import Tag from '@/components/Tag'
import { deleteRepetition } from '@/utils/tool'
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

  // table列对应字段
  const columns: Column[] = [
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
      key: 'uuid',
      align: 'center',
      title: 'ID',
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
          secondList?: string
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
              variant="text"
              onClick={() => handleCheckLabel(row)}
              className="btn"
              sx={{
                color: row.secondList && row.secondList.length === 0 ? '#232734' : row.open ? '#fff' : '',
              }}
            >
              {row.secondList && row.secondList.length === 0 ? '暂无数据' : '查看标注数据'}
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
  // table列对应二级字段
  const extensionColums: Column[] = [
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
      key: 'uuid',
      align: 'center',
      title: 'ID',
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

  // 下载按钮
  const handleDownload = (row: {
    id: string | undefined
    open?: any
    extend?: string | undefined
    dataUrl?: string | undefined
  }) => {
    row.dataUrl && (window.location.href = row.dataUrl)
  }

  // 查看标注类型
  const handleCheckLabel = async (row: any) => {
    if (!row.open) {
      await getLabelByUuid({ uuid: row.uuid }).then(({ code, data }: { code?: number; data: any }) => {
        if (code === 0) {
          row.secondList = data || []
        }
      })
    }
    if (row.secondList.length > 0) {
      row.open = !row.open
    }
    filterListData.forEach((item: any) => {
      if (item.id === row.id) {
        item.row
      }
    })
    setFilterListData([...filterListData])
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
    getListOriginalSet(params)
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
            setTags(deleteRepetition(tags))
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
            <SvgIcon svgName="original_data" svgClass="icon"></SvgIcon>原始数据查询
          </FormLabel>
          <Input
            required
            id="outlined-required"
            size="small"
            placeholder="支持名称或属性描述模糊搜索"
            sx={{
              width: '50%',
            }}
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
      <Table columns={columns} data={filterListData} loading={loading} extensionColums={extensionColums}></Table>
    </Box>
  )
}
