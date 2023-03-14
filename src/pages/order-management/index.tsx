import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider } from '@mui/material'
import { message, Table, TablePaginationConfig, PaginationProps, Space, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import Button, { LoadingButton } from '@/components/Button'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import PopupBox from './PopupBox'
import SvgIcon from '@/components/SvgIcon'
import { findWorkOrderListByPage } from '@/api/workOrder'
import { copyToClip } from '@/utils/tool'
import './style.scss'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

export default function index() {
  const navigate = useNavigate()
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
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record) => (
        <span onClick={(e) => handleCopy(e, record)}>
          {record.orderNo}
          <SvgIcon svgName="copy" svgClass="copyIcon"></SvgIcon>
        </span>
      ),
    },
    {
      title: '工单事件',
      dataIndex: 'orderTitle',
      key: 'orderTitle',
      align: 'center',
    },
    {
      title: '工单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: 'center',
      // render: (_, record) => <Badge status="success" text={record.orderType == 0 ? '库存订单' : '定制订单'} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      sorter: true,
    },
    {
      title: '事件处理区域',
      dataIndex: 'orderRegion',
      key: 'orderRegion',
      align: 'center',
    },
    {
      title: '工单来源',
      dataIndex: 'orderSource',
      key: 'orderSource',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => <a onClick={(e) => handleCheck(e, record)}>查看处理</a>,
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
    findWorkOrderListByPage({
      id: params.id,
      endDate: params.endDate,
      startDate: params.startDate,
      orderStatus: params.orderStatus === 0 ? '' : params.orderStatus,
      orderBoard: params.orderBoard === 0 ? '' : params.orderBoard,
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

  /* 新增工单 */
  const handleAdd = () => {
    navigate('/instrument-panel/workOrder/add')
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
        <Divider
          flexItem
          color="#E5E6EB"
          style={{
            marginBottom: '20px',
          }}
        />
        <Button
          style={{
            marginBottom: '20px',
          }}
          className="add_btn"
          startIcon={<SvgIcon svgName="add" svgClass="btn_icon"></SvgIcon>}
          onClick={handleAdd}
        >
          新增工单
        </Button>
        {/* 表格 */}
        <Table
          dataSource={dataList}
          columns={columns as any}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          loading={loading}
        />
        {/* 导出 */}
        <Space size="middle" className="export-box">
          <div>已选1条</div>
          <Button className="export_btn">导出</Button>
        </Space>
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
