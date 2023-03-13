import React, { useState, useEffect } from 'react'

import { Box, Paper, Divider, Typography, FormLabel, MenuItem, Button } from '@mui/material'
import { Table, TablePaginationConfig, PaginationProps, Pagination } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useTranslation } from 'react-i18next'
import SvgIcon from '@/components/SvgIcon'
import { message, Badge, Breadcrumb, Popconfirm } from 'antd'
import { findOrderListByPage } from '@/api/order'
import { copyToClip } from '@/utils/tool'
import { useSearchParams, useNavigate, useLocation, Link, json } from "react-router-dom";
import './noticeKinds.scss'
import BreadComPon from '@/components/AntDBread/index'
import NoticeKindsSearch from './components/noticeKindsSearch/noticeKindsSearch'

// 面包屑 路由规则太复杂 先写死后面再调整
const breadcrumbNameMap = {
  '/': '首页',
  '/instrument-panel': '工作台',
  '/instrument-panel/early-warning': '公告管理',
  '/instrument-panel/early-warning/noticeKinds': '公告类型'
}



interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}





export default function NoticeKinds() {
  // i18n
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [recodeIndexLink, setRecodeIndexLink] = useState([{
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: 'cc',
    dd: 'dd',
    orderState: 1
  }, {
    key: 2,
    name: 'Jim Green',
    age: 32,
    address: 'London No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: 'cc',
    dd: 'dd',
    orderState: 1

  }, {
    key: 31,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: 'cc',
    dd: 'dd',
    orderState: 1

  }])



  // 搜索字传父事件
  const noticeChlidrenSearch = (value) => {
    setNoticeKindsData(value)
    alert(value)

  }




  // 筛选参数
  const [formParams, setFormParams] = useState({ dateSort: null })

  // 分页总数
  const showTotal = (total) => {
    return (
      <>

        <span>{`${'共'} ${total} ${'条'}`}</span>
      </>
    )


  }

  // 表格状态
  const [noticeKindsData, setNoticeKindsData] = useState([])

  // 获取数据
  const getNoticeKindsData = () => {

    setNoticeKindsData([...recodeIndexLink])
    setTableParams({ pagination: { ...tableParams.pagination, total: recodeIndexLink.length } })

  }
  // 分页
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      // 默认显示页码
      current: 1,
      // 每页显示条数
      pageSize: 1,
      //  页面总条数
      total: 10,
      showTotal: showTotal,
    },
  })

  // 表格列
  const columns = [
    {
      title: '序号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <span >
          {record.key}

        </span>
      ),
    },
    {
      title: '公告类型',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <span>
          {record.dd}
        </span>
      ),
    },


    {
      title: '隶属板块',
      dataIndex: 'orderType',
      key: 'orderType',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <span>{record.aa}</span>,
    },

    {
      title: '公告描述',
      key: 'action',
      align: 'center',
      render: (_, record) => <span>{record.name}</span>
    },
  ]
  const [messageApi, contextHolder] = message.useMessage()
  // 加载
  const [loading, setLoading] = useState(false)
  // 表格选择项的状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 选中时选择框内的样式
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  // 表格第一列选择
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // selectedRowKeys 选中的列的数据的key值 selectedRows 选中的行的数据
      setSelectedRowKeys([...selectedRowKeys])
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };


  // 删除按钮
  const noticeKindsSelDel = () => {

    alert('aa')

  }



  useEffect(() => {
    getNoticeKindsData()
  }, [])


  return (
    <Box className="noticeKindsBox" >
      {/* 面包屑 */}
      {/* <p style={{background:'blue'}}>我是面包屑</p> */}
      <BreadComPon className='noticeBreadBox' breadcrumbNameMap={breadcrumbNameMap} />

      <Paper>
        <Box className="noticeKinds-container" >
          {/* 标题 */}
          <p className="title">公告类型配置2</p>
          {/* {t('orderManagement.title')} */}
          {/* 条件筛选栏 */}
          <NoticeKindsSearch noticeKindsSearchFn={noticeChlidrenSearch}></NoticeKindsSearch>
          {/* 分割符 */}
          <Divider flexItem color="#E5E6EB" />
          <Box className='noticeKindsAddBox'>
            <Button className='noticeKindsAddBut' onClick={() => { navigate('/instrument-panel/early-warning/noticeKinds/addNoticeKinds') }}>+  &nbsp; 新增公告</Button>
          </Box>
          <Table
            className='noticeKindsTableBox'
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            dataSource={noticeKindsData}
            columns={columns as any}
            loading={loading}

            pagination={false}
          >

          </Table >
          <Box className='noticeKindsPage'>
            <Box className='noticeKindsDelBox'>
              <p>已选<span className='noticeTableButtonSelLength'>{selectedRowKeys ? selectedRowKeys.length : 0}</span>条</p>
              <Popconfirm
                title="你将删除选中数据"
                description="确定删除吗?"
                okText="确定"
                cancelText="取消"
                disabled={selectedRowKeys.length === 0 ? true : false}

                onConfirm={() => noticeKindsSelDel()}
              > <Button disabled={selectedRowKeys.length === 0 ? true : false} className='noticeKindsDelBut'>删除</Button>
              </Popconfirm>

            </Box>
            <Pagination
              defaultCurrent={1}
              current={tableParams.pagination.current}
              pageSize={tableParams.pagination.pageSize}
              total={tableParams.pagination.total}
              showTotal={tableParams.pagination.showTotal}
              onChange={(page, pageSize) => {
                setTableParams({ pagination: { ...tableParams.pagination, current: page, pageSize } });
                console.log(noticeKindsData, page, pageSize)
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                }, 1000);
              }}
              onShowSizeChange={(current, size) => { setTableParams({ pagination: { ...tableParams.pagination, pageSize: size, current } }) }}
            />
          </Box>
        </Box>

      </Paper>
    </Box>
  )
}
