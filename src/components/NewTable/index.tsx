import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Button,
  Box,
  Collapse,
  Stack,
  Typography,
} from '@mui/material'
import MyButton from '../Button'
import Loading from '@/components/Loading'
import SvgIcon from '@/components/SvgIcon'
import nullImg from '@/assets/image/png/data_null.png'
import Tag from '@/components/Tag'
import { MyTableCell, MyPagination, MyTextField, MyPopover } from './component'
import { getLabelByUuid, getOriginaByUuid } from '@/api/algorithm'
import './style.scss'

export interface Column {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  title: string
  key: string
  slot?: any
}

function None({ height = '484px', hint = '暂无数据', background = '#3B4154', color = '#232734' }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: background,
      }}
    >
      <img src={nullImg} />
      <span
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#232734',
          marginLeft: '8px',
        }}
      >
        {hint}
      </span>
    </Box>
  )
}

export default function CurTable({
  data,
  columns,
  pagination,
  operate,
  onCheck,
  onPageChange,
  loading,
}: {
  data: any
  columns: Array<Column>
  pagination?: any
  operate?: Array<string>
  onCheck?: Function
  onPageChange?: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined
  loading?: boolean
}) {
  const [listData, setListData] = useState([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [checkData, setCheckData] = useState<{ dataUrl: string; uuid: number | string; taskName: string }>({
    dataUrl: '',
    uuid: '',
    taskName: '',
  })
  // 查看按钮
  const handleCheck = (row: any) => {
    ;(onCheck as Function)(row)
  }
  // 查看标注类型
  const handleCheckLabel = async (row: any) => {
    await getLabelByUuid({ uuid: row.uuid }).then(({ code, data }: { code?: number; data: any }) => {
      if (code === 0) {
        row.labelList = data || []
      }
    })
    row.open = !row.open
    listData.forEach((item: any) => {
      if (item.id === row.id) {
        item.row
      }
    })
    setListData([...listData])
  }
  // 查看原始数据
  const handleCheckOriginal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: { extend: string }) => {
    console.log(row)
    const currentTarget = e.currentTarget
    getOriginaByUuid({ extend: row.extend }).then(({ code, data }: { code?: number; data: any }) => {
      if (code === 0) {
        setCheckData(data[0])
        setAnchorEl(currentTarget)
      }
    })

    // setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setTimeout(() => {
      setCheckData({ dataUrl: '', uuid: '', taskName: '' })
    }, 300)
  }
  // 下载按钮
  const handleDownload = (row: { dataUrl: string }) => {
    window.location.href = row.dataUrl
  }

  // 输入框事件
  const handleCurrent = (e: { target: { value: string | number } }) => {
    if (Number(e.target.value) > Math.ceil(pagination.total / pagination.pageSize)) {
      ;(onPageChange as Function)(e, Math.ceil(pagination.total / pagination.pageSize))
    } else if (e.target.value == '' || e.target.value == 0) {
      ;(onPageChange as Function)(e, 1)
    } else {
      ;(onPageChange as Function)(e, e.target.value)
    }
  }

  useEffect(() => {
    setListData(data)
  }, [data])

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 700 }} aria-label="caption table">
        {listData.length > 0 && pagination && (
          <caption className="table-footer">
            <Box className="table-footer-box">
              <span className="count">此次搜索共{pagination.total}条</span>
              <MyPagination
                count={Math.ceil(pagination.total / pagination.pageSize)}
                shape={pagination.shape || 'rounded'}
                page={Number(pagination.pageNumber)}
                color={pagination.color}
                onChange={onPageChange}
              />
              <span className="pagination">
                跳至
                <MyTextField
                  value={pagination.pageNumber}
                  onChange={handleCurrent}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: pagination.count,
                    type: 'number',
                  }}
                />
                页
              </span>
            </Box>
          </caption>
        )}
        <TableHead className="table-header">
          <TableRow
            sx={{
              height: '44px',
            }}
          >
            {columns.map((column: Column) => (
              <MyTableCell className="table-cell" align={column.align || 'left'}>
                {column.title}
              </MyTableCell>
            ))}

            {operate && <MyTableCell align="center">操作</MyTableCell>}
          </TableRow>
        </TableHead>
        {listData.length > 0 && (
          <TableBody className="table-body">
            {listData.map((row: any, index: React.Key | null | undefined) => (
              <>
                <TableRow
                  key={index}
                  className="body-row"
                  sx={{
                    background: row.open ? '#2E3343' : '',
                  }}
                >
                  {columns.map((column: Column) => (
                    <MyTableCell align={column.align || 'left'}>
                      {column.slot ? <column.slot data={row}></column.slot> : row[column.key]}
                    </MyTableCell>
                  ))}
                  {operate && (
                    <>
                      <MyTableCell align="center">
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {operate.includes('check') && (
                            <Button variant="text" onClick={() => handleCheck(row)} className="btn">
                              查看
                            </Button>
                          )}
                          {operate.includes('checkLabel') && (
                            <Button
                              variant="text"
                              onClick={() => handleCheckLabel(row)}
                              className="btn"
                              sx={{
                                color: row.open ? '#fff' : '',
                              }}
                            >
                              查看标注数据
                            </Button>
                          )}
                          {operate.includes('checkOriginal') && (
                            <>
                              <Button
                                aria-describedby={row.id}
                                variant="text"
                                onClick={(e) => handleCheckOriginal(e, row)}
                                className="btn"
                                sx={{
                                  color: row.open ? '#fff' : '',
                                }}
                              >
                                查看原始数据
                              </Button>
                            </>
                          )}
                          {operate.includes('download') && (
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
                          )}
                        </Stack>
                      </MyTableCell>
                    </>
                  )}
                </TableRow>
                {/* 二级表格 */}
                {row.labelList && <SecondTable key={index} open={row.open} data={row.labelList}></SecondTable>}
              </>
            ))}
            <Loading show={loading}></Loading>
          </TableBody>
        )}
      </Table>
      {data.length === 0 && <None />}

      <MyPopover
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
    </TableContainer>
  )
}

/* 二级表格 */
function SecondTable({ open, data = [] }: { open: boolean; data: any }) {
  // 下载按钮
  const handleDownload = (row: { dataUrl: string }) => {
    window.location.href = row.dataUrl
  }
  return (
    <TableRow>
      <MyTableCell style={{ padding: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              marginLeft: '58px',
              marginRight: '53px',
              background: '#2E3343',
            }}
          >
            <Box
              sx={{
                // marginRight: '58px',
                maxHeight: data.length > 0 ? '210px' : '',
                overflow: data.length > 0 ? 'auto' : '',
                padding: '0 10px',
              }}
            >
              <Table size="small" aria-label="purchases">
                {data.length > 0 ? (
                  <TableBody>
                    {data.map((item: { uuid?: string; taskName?: any; tags?: any; dataUrl?: string }) => (
                      <TableRow>
                        <MyTableCell component="th" scope="row">
                          <Box>
                            <p
                              style={{
                                fontSize: '12px',
                                fontWeight: 400,
                                color: '#AEBDD8',
                              }}
                            >
                              {item.taskName}
                            </p>
                            <Box
                              sx={{
                                marginTop: '8px',
                              }}
                            >
                              {item.tags &&
                                item.tags.map((tag: { tagName: string }) => (
                                  <Tag content={tag.tagName} background="#464F63" triangleColor="#707B91" />
                                ))}
                            </Box>
                          </Box>
                        </MyTableCell>
                        <MyTableCell align="center">{item.uuid}</MyTableCell>
                        <MyTableCell
                          align="center"
                          sx={{
                            width: '200px',
                          }}
                        >
                          <MyButton
                            onClick={() =>
                              handleDownload(
                                item as {
                                  uuid: string
                                  taskName: string
                                  tags: any
                                  dataUrl: string
                                }
                              )
                            }
                            startIcon={<SvgIcon svgName="download" svgClass="icon"></SvgIcon>}
                            sx={{
                              fontSize: '12px',
                              height: '24px',
                            }}
                          >
                            下载
                          </MyButton>
                        </MyTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <None height="50px" background="#2E3343" />
                )}
              </Table>
            </Box>
          </Box>
        </Collapse>
      </MyTableCell>
    </TableRow>
  )
}

// 悬浮框内容
function PopoverContent({ data }: { data: { dataUrl: string; uuid: number | string; taskName: string } }) {
  const handleDownload = () => {
    window.location.href = data.dataUrl
  }
  return (
    <Box className="PopoverContent">
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
