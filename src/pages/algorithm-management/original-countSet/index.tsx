import React, { ReactNode, useEffect, useState } from 'react'
import { Box, Grid, FormLabel, Stack, MenuItem, Divider, Typography } from '@mui/material'
import Input from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import Table, { Column } from '@/components/NewTable'
import { getListOriginalSet, getTagList, getOriginaByUuid } from '@/api/algorithm'
import InputAdornment from '@mui/material/InputAdornment'
import Tag from '@/components/Tag'
import { repetition } from '@/until/tool'
import '../triangle.scss'
// import columns from './columns'
// import './style.scss'

export default function index() {
  const [loading, setLoading] = useState<boolean>(false)
  const [formParams, setFormParams] = useState<{
    serachName: string
  }>({
    serachName: '',
  })
  // const [page, setPage] = useState<{ pageNumber: number; pageSize: number; total: number }>({
  //   pageNumber: 1,
  //   pageSize: 10,
  //   total: 0,
  // })
  const [listData, setListData] = useState<Array<any>>([])
  const [tags, setTags] = useState<Array<any>>([])
  // 定时器
  let timer: NodeJS.Timeout | null | undefined = null

  // 变量
  // align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  // title: string
  // key: string
  // slot?: any
  const columns: Column[] = [
    {
      key: 'taskName',
      align: 'center',
      title: '原始数据名称',
      slot: function ({ data }: { data: { tags: Array<{ tagName: string }>; taskName: string } }) {
        return (
          <Box>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#AEBDD8',
              }}
            >
              {data.taskName}
            </p>
            <Box
              sx={{
                marginTop: '8px',
              }}
            >
              {data.tags && data.tags.map((tag: { tagName: string }) => <Tag content={tag.tagName} />)}
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
  ]
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
  // useEffect(() => {
  //   getListData()
  // }, [])

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
    getListData({ tagIds: checkTags })
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
            setTags(repetition(tags))
          }
          setListData(list)
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
            // helperText={formParams.inputValue ? '' : '不能为空!'}
            id="outlined-required"
            size="small"
            placeholder="支持名称或属性描述模糊搜索"
            sx={{
              width: '50%',
            }}
            // inputRef={inputRef}
            value={formParams.serachName}
            onChange={(e) => handleInputChange(e, 1)}
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
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<SvgIcon svgName="reset_icon" svgClass="icon"></SvgIcon>}
            >
              重置
            </Button>
            <Button onClick={handleSubmit} startIcon={<SvgIcon svgName="search_icon" svgClass="icon"></SvgIcon>}>
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
      <Grid container spacing={{ xs: 1, md: 2, lg: 4 }} className="form-bar">
        <Grid item xs={8} className="input-box">
          <Box
            sx={{
              width: 'calc(100% - 120px)',
              marginLeft: '120px',
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
      <Table columns={columns} data={listData} loading={loading} operate={['checkLabel', 'download']}></Table>
    </Box>
  )
}
