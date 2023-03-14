import React, { useState, useEffect } from 'react'
import { Box, Divider, Typography, FormLabel, MenuItem } from '@mui/material'
import SearchBar from './SearchBar'
import { Table, TablePaginationConfig, PaginationProps } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { MyInput } from '@/components/Input'
import PopupBox from '@/components/PopupBox'
import { useTranslation } from 'react-i18next'
import { copyToClip } from '@/utils/tool'
import SvgIcon from '@/components/SvgIcon'
import { message, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { getUserList, updateUser } from '@/api/user'
import './style.scss'
import { LoadingButton } from '@/components/Button'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const { confirm } = Modal

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
      title: t('customerManagement.table.accountCode'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record) => (
        <span onClick={(e) => handleCopy(e, record)}>
          {record.id}
          <SvgIcon svgName="copy" svgClass="copyIcon"></SvgIcon>
        </span>
      ),
    },
    {
      title: t('customerManagement.table.name'),
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center',
      render: (_, record) => <span>{record.lastName + record.firstName}</span>,
    },
    {
      title: t('customerManagement.table.email'),
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: t('customerManagement.table.creatTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      sorter: true,
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
      total: 0,
      showTotal: showTotal,
    },
  })
  // 数据
  const [dataList, setDataList] = useState([])
  // 表格加载
  const [loading, setLoading] = useState(false)
  // 弹出框状态
  let [openPopupBox, setOpenPopupBox] = useState(false)
  // 位置
  let [coord, setCoord] = useState({ top: '0', right: '40px' })
  // 选中的数据
  const [checkedData, setCheckedData] = useState({
    id: '',
    company: '',
    firstName: '',
    lastName: '',
    isLock: 1, // 是否锁定: 1=未锁定 2=锁定
  })
  // 筛选参数
  const [formParams, setFormParams] = useState({
    dateSort: null,
  })
  // 查询按钮加载状态
  const [searchBtnLoading, setSearchBtnLoading] = useState(false)
  // 修改用户确认按钮加载状态
  const [editUserLoading, setEditUserLoading] = useState(false)

  useEffect(() => {
    getList(formParams)
  }, [])

  /* 获取列表数据 */
  const getList = (params) => {
    setLoading(true)
    getUserList({ ...params, pageNumber: tableParams.pagination.current, pageSize: tableParams.pagination.pageSize })
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
        setLoading(false)
        setSearchBtnLoading(false)
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

  /* 查看按钮点击事件 */
  const handleCheck = (e, record) => {
    // 获取点击位置
    if (e.clientY + 260 > document.documentElement.clientHeight) {
      coord.top = e.clientY - 340 + 'px'
    } else {
      coord.top = e.clientY + 20 + 'px'
    }
    setCoord({ ...coord })

    setCheckedData({ ...record })
    // 打开弹窗
    setOpenPopupBox(true)
  }

  /* 弹出框中表单事件 */
  const handleInputChange = (e, type) => {
    checkedData[type] = type === 'isLock' ? e.target.value + 1 : e.target.value
    setCheckedData({ ...checkedData })
  }

  /* 表格中复制按钮 */
  const handleCopy = (e, record) => {
    copyToClip(record.id)
    messageApi.success(t('customerManagement.copyMessage'))
  }

  /* 查询按钮 */
  const handleSearch = (data) => {
    setSearchBtnLoading(true)
    tableParams.pagination.current = 1
    setFormParams({ ...data })
    getList(data)
  }

  /* 弹出框中的确认按钮 */
  const handlePopupBtnClick = () => {
    setEditUserLoading(true)
    confirm({
      title: `修改用户信息`,
      icon: <ExclamationCircleFilled />,
      content: `用户编号：${checkedData.id}，是否继续？`,
      centered: true,
      onOk() {
        updateUser(checkedData)
          .then(({ code }: any) => {
            if (code === 200) {
              messageApi.success('修改成功！')
              setOpenPopupBox(false)
              getList(formParams)
            }
          })
          .finally(() => {
            setEditUserLoading(false)
          })
      },
      onCancel() {
        setEditUserLoading(false)
      },
    })
  }
  return (
    <>
      666
    </>
    // <>
    //   <Box className="customer_management-container">
    //     {contextHolder}
    //     {/* 标题 */}
    //     <p className="title">{t('customerManagement.title')}</p>
    //     {/* 条件筛选栏 */}
    //     <SearchBar onSubmit={handleSearch} searchBtnLoading={searchBtnLoading}></SearchBar>
    //     {/* 分割符 */}
    //     <Divider flexItem color="#E5E6EB" />

    //     {/* 表格 */}
    //     <Table
    //       style={{
    //         marginTop: '20px',
    //       }}
    //       dataSource={dataList}
    //       columns={columns as any}
    //       pagination={tableParams.pagination}
    //       onChange={handleTableChange}
    //       loading={loading}
    //     />
    //   </Box>

    //   弹出框
    //   <PopupBox
    //     open={openPopupBox}
    //     width="354px"
    //     onClose={() => {
    //       setOpenPopupBox(false)
    //     }}
    //     coord={coord}
    //   >
    //     启用禁用
    //     <Box
    //       className="customer-PopupBox-item"
    //       style={{
    //         marginBottom: '15px',
    //       }}
    //     >
    //       <FormLabel component="span" className="label">
    //         {t('customerManagement.popupBox.state')}
    //       </FormLabel>
    //       <MyInput
    //         size="small"
    //         select
    //         placeholder={t('customerManagement.popupBox.state')}
    //         value={checkedData.isLock - 1}
    //         onChange={(e) => handleInputChange(e, 'isLock')}
    //         autoComplete="off"
    //         sx={{
    //           width: '235px',
    //         }}
    //       >
    //         {stateList.map((state, index) => (
    //           <MenuItem key={index} value={index}>
    //             {state}
    //           </MenuItem>
    //         ))}
    //       </MyInput>
    //     </Box>

    //     编辑信息
    //     <Box className="customer-PopupBox-item">
    //       <FormLabel
    //         component="span"
    //         className="label"
    //         style={{
    //           marginRight: '15px',
    //         }}
    //       >
    //         编辑信息
    //       </FormLabel>
    //       <Box className="sub-item">
    //         <FormLabel component="span" className="label">
    //           姓氏
    //         </FormLabel>
    //         <MyInput
    //           size="small"
    //           value={checkedData.lastName}
    //           onChange={(e) => handleInputChange(e, 'lastName')}
    //           autoComplete="off"
    //           sx={{
    //             width: '195px',
    //           }}
    //         ></MyInput>
    //       </Box>
    //     </Box>
    //     <Box className="customer-PopupBox-item">
    //       <Box className="sub-item">
    //         <FormLabel component="span" className="label">
    //           名称
    //         </FormLabel>
    //         <MyInput
    //           size="small"
    //           value={checkedData.firstName}
    //           onChange={(e) => handleInputChange(e, 'firstName')}
    //           autoComplete="off"
    //           sx={{
    //             width: '195px',
    //           }}
    //         ></MyInput>
    //       </Box>
    //     </Box>
    //     <Box className="customer-PopupBox-item">
    //       <Box className="sub-item">
    //         <FormLabel component="span" className="label">
    //           公司
    //         </FormLabel>
    //         <MyInput
    //           size="small"
    //           value={checkedData.company}
    //           onChange={(e) => handleInputChange(e, 'company')}
    //           autoComplete="off"
    //           sx={{
    //             width: '195px',
    //           }}
    //         ></MyInput>
    //       </Box>
    //     </Box>
    //     <Box
    //       className="customer-PopupBox-item"
    //       sx={{
    //         mt: '20px',
    //       }}
    //     >
    //       <LoadingButton
    //         onClick={handlePopupBtnClick}
    //         loading={editUserLoading}
    //         className="loadingButton"
    //       >
    //         确认
    //       </LoadingButton>
    //     </Box>
    //   </PopupBox>
    // </>
  )
}
