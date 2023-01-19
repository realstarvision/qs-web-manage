import React, { useState, useEffect } from 'react'
import { Box, Divider, Typography, FormLabel, MenuItem } from '@mui/material'
import SearchBar from './SearchBar'
import { Table, TablePaginationConfig, PaginationProps } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import PopupBox from './PopupBox'
import { useTranslation } from 'react-i18next'
import SvgIcon from '@/components/SvgIcon'
import { message, Badge } from 'antd'
import { findOrderListByPage } from '@/api/order'
import { copyToClip } from '@/utils/tool'
import './style.scss'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

export default function index() {
  // i18n
  const { t } = useTranslation()
  // 提示信息
  const [messageApi, contextHolder] = message.useMessage()
  // 启用禁用
  const stateList = [t('customerManagement.stateList.start'), t('customerManagement.stateList.disable')]
  // 分页总数
  const showTotal: PaginationProps['showTotal'] = (total) =>
    `${t('customerManagement.paginationProps.count')} ${total} ${t('customerManagement.paginationProps.units')}`
  // 表格列
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      render: (_, record) => (
        <span onClick={(e) => handleCopy(e, record)}>
          {record.orderNo}
          <SvgIcon svgName="copy" svgClass="copyIcon"></SvgIcon>
        </span>
      ),
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      align: 'center',
      render: (_, record) => <Badge status="success" text={record.orderType == 0 ? '库存订单' : '定制订单'} />,
    },
    {
      title: '客户邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      sorter: true,
    },
    {
      title: '订单状态',
      dataIndex: 'orderState',
      key: 'orderState',
      align: 'center',
      // filters: [
      //   {
      //     text: '已完成',
      //     value: '已完成',
      //   },
      //   {
      //     text: '未完成',
      //     value: '未完成',
      //   },
      // ],
      render: (_, record) => (
        <Badge
          status="success"
          text={
            record.orderState === 0
              ? '待确认'
              : record.orderState === 1
              ? '待支付'
              : record.orderState === 2
              ? '待交付'
              : record.orderState === 3
              ? '已完成'
              : '已取消'
          }
        />
      ),
    },
    {
      title: t('customerManagement.table.action'),
      key: 'action',
      align: 'center',
      render: (_, record) => <a onClick={(e) => handleCheck(e, record)}>{t('customerManagement.table.checkBtn')}</a>,
    },
  ]
  // 分页
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 500,
      showTotal: showTotal,
    },
  })
  // 数据
  const [dataList, setDataList] = useState([])
  // 加载
  const [loading, setLoading] = useState(false)
  // 弹出框状态
  let [openPopupBox, setOpenPopupBox] = useState(false)
  // 选中的数据
  const [checkedData, setCheckedData] = useState({
    state: 0,
    name: '',
    company: '',
  })

  // 筛选参数
  const [formParams, setFormParams] = useState({ dateSort: null })
  // 查询按钮加载状态
  const [searchBtnLoading, setSearchBtnLoading] = useState(false)

  /* 获取列表数据 */
  const getList = (params) => {
    setLoading(true)
    findOrderListByPage({
      endTime: params.endTime,
      email: params.email,
      orderState: params.orderState - 1 === -1 ? '' : params.orderState - 1,
      startTime: params.startTime,
      orderNo: params.orderNo,
      orderType: params.orderType - 1 === -1 ? '' : params.orderType - 1,
      pageNumber: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
      dateSort: params.dateSort,
    })
      .then(({ data, code }: any) => {
        if (code === 200) {
          setDataList([...data.records])
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: data.total,
            },
          })
        }
      })
      .finally(() => {
        setSearchBtnLoading(false)
        setLoading(false)
      })
  }

  /* 监听变化 */
  useEffect(() => {
    getList(formParams)
  }, [JSON.stringify(tableParams)])

  /* 分页改变事件 */
  const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: any) => {
    pagination.showTotal = showTotal
    /* 排序 */
    if (sorter.order === 'ascend') {
      formParams.dateSort = 2
    } else {
      formParams.dateSort = 1
    }
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })
  }

  /* 表格中复制按钮 */
  const handleCopy = (e, record) => {
    copyToClip(record.orderNo)
    messageApi.success(t('customerManagement.copyMessage'))
  }

  /* 查看按钮点击事件 */
  const handleCheck = (e, record) => {
    setCheckedData({ ...record })
    // 打开弹窗
    setOpenPopupBox(true)
  }

  /* 搜索事件*/
  const handleSearch = (data) => {
    setSearchBtnLoading(true)
    tableParams.pagination.current = 1
    setFormParams({ ...data })
    getList(data)
  }

  /* 修改订单状态 */
  const handleUploadOrderState = () => {
    getList(formParams)
  }
  return (
    <>
      <Box className="order_management-container">
        {contextHolder}
        {/* 标题 */}
        <p className="title">{t('orderManagement.title')}</p>
        {/* 条件筛选栏 */}
        <SearchBar onSubmit={handleSearch} searchBtnLoading={searchBtnLoading}></SearchBar>
        {/* 分割符 */}
        <Divider flexItem color="#E5E6EB" />

        {/* 表格 */}
        <Table
          style={{
            marginTop: '20px',
          }}
          dataSource={dataList}
          columns={columns as any}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          loading={loading}
        />
      </Box>

      {/* 弹出框 */}
      <PopupBox
        open={openPopupBox}
        onClose={() => {
          setOpenPopupBox(false)
        }}
        onUploadOrderState={handleUploadOrderState}
        data={checkedData}
      />
    </>
  )
}
