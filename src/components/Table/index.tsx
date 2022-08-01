import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { debounce } from '@/until/tool'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  TableFooter,
  TablePagination,
  Button,
  Pagination,
  Box,
  TextField,
} from '@mui/material'
import Loading from '@/components/Loading'
import nullImg from '@/assets/image/png/data_null.png'
import './style.scss'
import styled from '@emotion/styled'
// import TableCell, { tableCellClasses } from '@mui/material/TableCell'

export interface Column {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  title: string
  key: string
}

const MyTableCell = styled(TableCell)({
  borderBottom: '1px solid rgba(174,189,216,0.2)',
  fontSize: '12px',
  fontWeight: 400,
  color: '#AEBDD8',
  padding: '10px 10px',
})

const MyPagination = styled(Pagination)({
  '& .MuiButtonBase-root': {
    fontSize: '12px',
    fontWeight: 300,
    opacity: 0.6,
  },
  '& .Mui-disabled': {
    opacity: '0 !important',
  },
  '& .Mui-selected': {
    background: 'rgba(255,255,255,0) !important',
    opacity: '1 !important',
  },
  '& .MuiPaginationItem-root': {
    minWidth: '24px',
    height: '24px',
    color: '#AEBDD8',
    '&:hover': {
      background: 'none',
    },
  },
})

const MyTextField = styled(TextField)({
  width: '35px',
  marginLeft: '5px',
  marginRight: '15px',
  '& .MuiOutlinedInput-root': {
    fontSize: '12px',
    fontWeight: 300,
    color: '#fff',
    width: '140%',
    height: '20px',

    '& fieldset': {
      border: 'none',
      background: '#232734',
      borderRadius: '2px',
      opacity: '0.6',
    },
    '& input': {
      textAlign: 'center',
      padding: '5px',
    },
  },
})

function None() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '484px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3B4154',
      }}
    >
      {/* <SvgIcon svgName="data_null"></SvgIcon> */}
      <img src={nullImg} />
      <span
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#232734',
          marginLeft: '8px',
        }}
      >
        暂无数据
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
  // 查看按钮
  const handleCheck = (row: any) => {
    ;(onCheck as Function)(row)
  }

  // 输入框事件
  const handleCurrent = (e: any) => {
    console.log(e)

    // if (timer) {
    //   clearTimeout(timer)
    // }
    // timer = setTimeout(() => {
    //   clearTimeout(timer as NodeJS.Timeout)
    // }, 500)

    if (Number(e.target.value) > pagination.count) {
      ;(onPageChange as Function)(e, pagination.count)
    } else if (e.target.value == '' || e.target.value == 0) {
      ;(onPageChange as Function)(e, 1)
    } else {
      ;(onPageChange as Function)(e, e.target.value)
    }
  }
  useEffect(() => {
    console.log(pagination)
  }, [pagination])
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 700 }} aria-label="caption table">
        {data.length > 0 && (
          <caption className="table-footer">
            <Box className="table-footer-box">
              <span className="count">此次搜索共{pagination.total}条</span>
              <MyPagination
                count={pagination.count}
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
        {data.length > 0 && (
          <TableBody className="table-body">
            {data.map((row: any, index: React.Key | null | undefined) => (
              <TableRow key={index} className="body-row">
                {columns.map((column: Column) => (
                  <MyTableCell align={column.align || 'left'}>{row[column.key]}</MyTableCell>
                ))}
                {operate && (
                  <MyTableCell align="center">
                    {operate.includes('check') && (
                      <Button variant="text" onClick={() => handleCheck(row)} className="btn">
                        查看
                      </Button>
                    )}
                  </MyTableCell>
                )}
              </TableRow>
            ))}
            <Loading show={loading}></Loading>
          </TableBody>
        )}

        {/* <TableFooter>
          <TableRow>

            <Pagination
              sx={{
                width: '100%',
                textAlign: 'right',
              }}
              count={pagination.count}
              shape={pagination.shape || 'rounded'}
              // page={pagination.page}
              color={pagination.color}
              onChange={pagination.onChange}
            />
          </TableRow>
        </TableFooter> */}
      </Table>
      {data.length === 0 && <None />}
    </TableContainer>
  )
}
