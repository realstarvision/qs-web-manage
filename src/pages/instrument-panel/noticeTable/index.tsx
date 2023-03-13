import React, { useState, useEffect } from 'react'
import { Box, Divider, Typography, FormLabel, MenuItem, Button } from '@mui/material'
import SearchBar from './SearchBar'
import { Table, TablePaginationConfig, PaginationProps, Pagination, Popconfirm } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import PopupBox from './PopupBox'
import { useTranslation } from 'react-i18next'
import SvgIcon from '@/components/SvgIcon'
import { message, Badge } from 'antd'
import { findOrderListByPage } from '@/api/order'
import { copyToClip } from '@/utils/tool'
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ExportJsonExcel from "js-export-excel"
import './style.scss'

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
// table组件
const noticeTable = () => {
  // 拿到首页公告栏传递过来的参数
  const [search, setSearch] = useSearchParams()
  const removeId = search.get("id")
  const navigator = useNavigate()
  // 定义公告管理页面的数据先写死后面再改
  const [noticeTableRecord, setNoticeTableRecord] = useState([
    {
      key: 1.1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 1
    }, {
      key: 1.2,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 1
    }, {
      key: 1.3,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 1
    }, {
      key: 1.4,
      name: 'John Brown',
      age: 31,
      address: 'New York No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 1
    }, {
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
      orderState: 2

    }, {
      key: 31,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 0

    }
    , {
      key: 3,
      name: 'Joe Blackaaaa',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 2

    }
    , {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 1

    }, {
      key: 5,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 2

    }
    , {
      key: 6,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 0

    },
    {
      key: 7,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 0

    },
    {
      key: 8,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 2

    },
    {
      key: 9,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 1

    },
    {
      key: 10,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 2

    },
    {
      key: 11,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb', cc: 'cc',
      dd: 'dd',
      orderState: 2

    },
    {
      key: 12,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb',
      cc: 'cc',
      dd: 'dd',
      orderState: 0

    },
    {
      key: 13,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb', cc: 'cc',
      dd: 'dd',
      orderState: 2

    },
    {
      key: 14,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb', cc: 'cc',
      dd: 'dd',
      orderState: 1

    },
    {
      key: 15,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb', cc: 'cc',
      dd: 'dd',
      orderState: 2

    }, {
      key: 16,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      aa: 'aa',
      bb: 'bb', cc: 'cc',
      dd: 'dd',
      orderState: 2

    },


  ])
  // 定义点击更多跳转到此页面的数据
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

  // i18n
  const { t } = useTranslation()
  // 定义列表渲染的数据
  const [tableRecord, setTableRecord] = useState([])

  // 获取数据
  const getRecord = () => {
    removeId === 'removeNoticeCompon' ? setTableRecord([...recodeIndexLink]) : setTableRecord([...noticeTableRecord])
    setTableParams({ pagination: { ...tableParams.pagination, total: 100 } })


  }

  // 表格列
  const columns = [
    {
      title: '编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <span title='复制' onClick={(e) => handleCopy(e, record)}>
          {record.key}
          <SvgIcon svgName="copy" svgClass="copyIcon"></SvgIcon>
        </span>
      ),
    },
    {
      title: '公告标题',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <span onClick={(e) => handleCopy(e, record)}>
          {record.dd}

        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      sorter: (a, b) => a.age - b.age,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <span >{record.age}</span>
    },
    {
      title: '发布人',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <span onClick={(e) => handleCopy(e, record)}>
          {record.cc}

        </span>
      ),

    },
    {
      title: '公告状态',
      dataIndex: 'orderState',
      key: 'orderState',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      // filters: [
      //   {
      //     text: '已发布',
      //     value: '已发布',
      //   },
      //   {
      //     text: '未发布',
      //     value: '未发布',
      //   },
      //   {
      //     text: '已删除',
      //     value: '已删除',
      //   },
      // ],
      render: (_, record) => (
        <Badge
          // 根据状态码判定显示颜色
          status={record.orderState === 0
            ? 'warning'
            : record.orderState === 1
              ? 'success'
              : 'error'
          }
          text={
            record.orderState === 0
              ? '未发布'
              : record.orderState === 1
                ? '已发布'
                : '已删除'

          }
        />
      ),
    },
    {
      title: '公告类型',
      dataIndex: 'orderType',
      key: 'orderType',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <Badge text={record.orderType == 0 ? '库存订单' : '定制订单'} />,
    },
    {
      title: '发布板块',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <span >{record.name}</span>
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      //根据状态判定操作功能
      // 看后端配置  如果有对查看更多跳转后的页面设置接口，那么前面已判断table用哪个数据渲染列表，则对应的查看更多跳过去一定是已发布的内容那么就不需要判断路由的参数
      // 如果没有配置接口则请求数据后，判断参数，有参数说明查看更多调过来，这里就需要修改先判断参数再判断状态码
      render: (_, record) =>
        <p>
          {removeId === 'removeNoticeCompon' ?
            <span>
              <Link to={`/instrument-panel/early-warning/detail?id=${record.key}`} onClick={(e) => handleCheck(e, record)}>查看</Link>
            </span>
            : record.orderState === 0 ?
              <span>
                <Link to={`/instrument-panel/early-warning/addNotice?id=${record.key}`}>操作</Link >
                <Popconfirm
                  title="是否删除该数据"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    setLoading(true)
                    setTimeout(() => {
                      setLoading(false)
                      message.success('删除成功')
                    }, 1000)
                  }}
                >
                  <a style={{ marginLeft: '8px' }} onClick={() => { }}>删除</a>
                </Popconfirm>
              </span>
              : record.orderState === 1 ?
                <span>
                  <Link to={`/instrument-panel/early-warning/detail?id=${record.key}`} onClick={(e) => { console.log(record) }}>查看</Link>
                  <Popconfirm
                    title="是否删除该数据"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => {
                      setLoading(true)
                      setTimeout(() => {
                        setLoading(false)
                        message.success('删除成功')
                      }, 1000);
                    }}
                  >
                    <a style={{ marginLeft: '8px' }} onClick={() => { }}>删除</a>
                  </Popconfirm>
                </span>
                : <span>-</span>}
        </p>
      // <p> <a onClick={(e) => handleCheck(e, record)}>{t('customerManagement.table.checkBtn')}</a>{removeId==='removeNoticeCompon'?'':<a >删除</a>}</p>
    },
  ]

  // 提示信息
  const [messageApi, contextHolder] = message.useMessage()
  // 启用禁用
  const stateList = [t('customerManagement.stateList.start'), t('customerManagement.stateList.disable')]

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
  // 分页总数
  const showTotal = (total) =>
    `${t('customerManagement.paginationProps.count')} ${total} ${t('customerManagement.paginationProps.units')}`


  // 分页
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      // 默认显示页码
      current: 1,
      // 每页显示条数
      pageSize: 10,
      //  页面总条数
      total: tableRecord.length,
      showTotal: showTotal,
    },
  })
  // /* 获取列表数据 */
  // const getList = (params) => {
  //   setLoading(true)
  //   findOrderListByPage({
  //     endTime: params.endTime,
  //     email: params.email,
  //     orderState: params.orderState - 1 === -1 ? '' : params.orderState - 1,
  //     startTime: params.startTime,
  //     orderNo: params.orderNo,
  //     orderType: params.orderType - 1 === -1 ? '' : params.orderType - 1,
  //     pageNumber: tableParams.pagination.current,
  //     pageSize: tableParams.pagination.pageSize,
  //     dateSort: params.dateSort,
  //   })
  //     .then(({ data, code }: any) => {
  //       if (code === 200) {
  //         // 接收返回值
  //         setDataList([...data.records])
  //         setTableParams({
  //           ...tableParams,
  //           // 设置页面信息
  //           pagination: {
  //             ...tableParams.pagination,
  //             total: data.total,
  //           },
  //         })
  //       }
  //     })
  //     .finally(() => {
  //       setSearchBtnLoading(false)
  //       setLoading(false)
  //     })
  // }
  // 表格选择项的状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 选中时选择框内的样式
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  // 表格第一列选择数据
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
  // 选择后，点击删除按钮
  const selectButton = () => {
    // 打开加载动画
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      setSelectedRowKeys([]);
      console.log(selectedRowKeys)
      // 拷贝表格数据，等后端接口拿到在修改
      const tableCopy = [...tableRecord]
      selectedRowKeys.forEach((value, index) => {
        tableCopy.forEach((item, tableIndex) => {
          if (tableCopy[tableIndex].key === selectedRowKeys[index]) {
            console.log(tableIndex)
            const tableIndexNum = [tableIndex]
            console.log(tableIndexNum)
            tableIndexNum.forEach((tableIndexValue, tableNumIndex) => {
              tableCopy.splice(tableNumIndex, 1)
              console.log(tableCopy)
              setTableRecord([...tableCopy])
              console.log(tableRecord)
            })
          }
        })
      })

    }, 1000)

  }
  /* 监听变化 */
  useEffect(() => {
    // getList(formParams)
    // 调用此函数判断table的数据应该用谁的

    getRecord()


    // console.log(removeId)
    // console.log(tableRecord)
    // console.log(removeId==='aaa')
    // console.log(tableParams.pagination.total)
  }, [removeId,])

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
    // getList(data)
  }
  /* 修改订单状态 */
  const handleUploadOrderState = () => {
    // getList(formParams)
  }
  // 导出excel
  const downloadExcel = (tableRecord) => {   //导出table数据
    const data_ = tableRecord ? tableRecord : '';//表格数据
    let option = {};
    let dataTable = [];
    if (tableRecord) {
      for (let i in tableRecord) {
        if (data_) {
          let obj = {
            '姓名': data_[i].key,
            '是否完成': data_[i].name,
            '考试得分': data_[i].age,
            '完成日期': data_[i].address,
            '名词': data_[i].aa,
            '目标': data_[i].bb,
            '喵喵': data_[i].cc,
          }
          dataTable.push(obj);
        }
      }
    }
    console.log(option)
    option.fileName = '公告列表'
    option.datas = [
      {
        sheetData: dataTable,
        //sheetName: 'sheet',   //可有可无
        //sheetFilter:['姓名', '是否完成', '考试得分', '完成日期'],  //可有可无
        sheetHeader: ['姓名', '是否完成', '考试得分', '完成日期', '名词', '目标', '喵喵'],  //表头
      }
    ];
    let toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }
  return (
    <>123</>
    // <>
    //   <Box className="order_management-container">
    //     {contextHolder}
    //     标题
    //     <p className="title">{t('orderManagement.title')}</p>
    //     条件筛选栏
    //     <SearchBar onSubmit={handleSearch} searchBtnLoading={searchBtnLoading} removeProp={removeId}></SearchBar>
    //     分割符
    //     <Divider flexItem color="#E5E6EB" />
    //     新增与配置
    //     {removeId === 'removeNoticeCompon' ? null : <Box className='noticeAdd-Config'>
    //       <Button className='noticeAdd' onClick={() => {
    //         navigator('/instrument-panel/early-warning/addNotice')
    //       }}>+  &nbsp; 新增公告</Button>
    //       <Button className='noticeConfig' onClick={() => { navigator('/instrument-panel/early-warning/noticeKinds') }}>公告类型配置</Button>
    //     </Box>
    //     }

    //     表格
    //     <Table
    //       className='noticeTableBox'
    //       //识别是否是首页的公告栏跳转过来的如果是则禁止使用选择功能
    //       rowSelection={removeId === 'removeNoticeCompon' ? null : {
    //         type: selectionType,
    //         ...rowSelection,
    //       }}
    //       scroll={{ y: '380px ' }}
    //       dataSource={tableRecord.slice((tableParams.pagination.current - 1) * tableParams.pagination.pageSize, tableParams.pagination.current * tableParams.pagination.pageSize)}
    //       columns={columns as any}
    //       pagination={removeId === 'removeNoticeCompon' ? tableParams.pagination : false}
    //       onChange={removeId === 'removeNoticeCompon' ? handleTableChange : null}
    //       loading={loading}
    //     />
    //     {removeId === 'removeNoticeCompon' ? null : <Box className='noticeTableOutBox'>
    //       自定义分页
    //       <Box className='noticeTableButtonBox' >
    //         <p className='noticeTableButtonSel'>已选<span className='noticeTableButtonSelLength'>{selectedRowKeys ? selectedRowKeys.length : 0}</span>条</p>
    //         <Popconfirm
    //           title="是否删除该数据"
    //           okText="确定"
    //           cancelText="取消"
    //           onConfirm={() => {
    //             setLoading(true)
    //             setTimeout(() => {
    //               setLoading(false)
    //               message.success('删除成功')
    //             }, 1000);
    //           }}
    //         >
    //           <Button className='noticeTableDelBut' disabled={selectedRowKeys.length === 0 ? true : false} onClick={() => { selectButton() }}>删除</Button>
    //         </Popconfirm>
    //         <Button className='noticeTableOutBut' onClick={() => { downloadExcel(tableRecord) }}>导出</Button>
    //       </Box>
    //       <Pagination
    //         defaultCurrent={1}
    //         current={tableParams.pagination.current}
    //         pageSize={tableParams.pagination.pageSize}
    //         total={tableParams.pagination.total}
    //         showTotal={tableParams.pagination.showTotal}
    //         onChange={(page, pageSize) => { setTableParams({ pagination: { ...tableParams.pagination, current: page, pageSize } }) }}
    //         onShowSizeChange={(current, size) => { setTableParams({ pagination: { ...tableParams.pagination, pageSize: size, current } }) }}
    //       ></Pagination>
    //     </Box>}
    //   </Box>
    //   弹出框
    //   <PopupBox
    //     open={openPopupBox}
    //     onClose={() => {
    //       setOpenPopupBox(false)
    //     }}
    //     onUploadOrderState={handleUploadOrderState}
    //     data={checkedData}
    //   />
    // </>
  )
}
export default noticeTable