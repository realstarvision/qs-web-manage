
import React, { useState, useEffect } from 'react'
import { Box, Divider, Typography, FormLabel, MenuItem, Button } from '@mui/material'
import { Table, TablePaginationConfig, PaginationProps, Pagination, Popconfirm } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useTranslation } from 'react-i18next'
import SvgIcon from '@/components/SvgIcon'
import { message, Badge } from 'antd'
import { findOrderListByPage } from '@/api/order'
import { copyToClip } from '@/utils/tool'
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ExportJsonExcel from "js-export-excel"
import './indexTable.scss'
import { Clear } from '@mui/icons-material'
import tableColum from './indexTable'
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
export default function indexTable() {
  // 加载
  const [loading, setLoading] = useState(false)
  // 选中的数据
  const [checkedData, setCheckedData] = useState({
    state: 0,
    name: '',
    company: '',
  })
  // 查询按钮加载状态
  const [searchBtnLoading, setSearchBtnLoading] = useState(false)
  // 分页总数
  const showTotal = (total) =>
    `${'共有'} ${total} ${'条数据'}`

  const [tableRecord, setTableRecord] = useState([
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
  // 表格选择项的状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 选中时选择框内的样式
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  // 表格第一列选择数据
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // selectedRowKeys 选中的列的数据的key值 selectedRows 选中的行的数据
      setSelectedRowKeys([...selectedRowKeys])
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  // 选择后，点击删除按钮
  const stopButton = () => {

  }
  // 定义公告管理页面的数据先写死后面再改
  // 表格列
  const columns = [{
    title: '编号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    align: 'center',
    // 设置文本过长用省略号代替并关闭提示的title
    ellipsis: {
      showTitle: false,
    },
    render: (_, record) => (
      <span>
        {record.key}
      </span>
    ),
  },
  {
    title: '所属部门',
    dataIndex: 'orderNo',
    key: 'orderNo',
    align: 'center',
    // 设置文本过长用省略号代替并关闭提示的title
    ellipsis: {
      showTitle: false,
    },
    render: (_, record) => (
      <span >
        {record.dd}

      </span>
    ),
  },

  {
    title: '账号',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    ellipsis: {
      showTitle: false,
    },
    render: (_, record) => <span>{record.name}</span>
  },
  {
    title: '姓名',
    dataIndex: 'orderNo',
    key: 'orderNo',
    align: 'center',
    // 设置文本过长用省略号代替并关闭提示的title
    ellipsis: {
      showTitle: false,
    },
    render: (_, record) => (
      <span>
        {record.cc}

      </span>
    ),

  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
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
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    sorter: (a, b) => a.age + 1 - b.age,
    ellipsis: {
      showTitle: false,
    },
    render: (_, record) => <span >{record.age}</span>
  },
  {
    title: '账户状态',
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
          ? 'success'
          : 'error'
        }
        text={record.orderState === 0
          ? '正常'
          : '禁用'
        }
      />
    ),
  },


  {
    title: '操作',
    key: 'action',
    align: 'center',
    // 设置文本过长用省略号代替并关闭提示的title
    ellipsis: {
      showTitle: false,
    },
    render: (_, record) =>
      <p>
        <span style={{ marginRight: '8px' }}>
          <Link to={`/instrument-panel/accountManagement/editAccountManage?id=${record.key}`} onClick={(e) => handleCheck(e, record)}>编辑</Link>
        </span>
        <span>
          <Link to={`/instrument-panel/accountManagement/watchAccountManage?id=${record.key}`} onClick={(e) => handleCheck(e, record)}>操作记录</Link>
        </span>

      </p>
  },
  ]

  // 筛选参数
  const [formParams, setFormParams] = useState({ dateSort: null })
  /* 分页改变事件 */
  const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: any) => {
    pagination.showTotal = showTotal
    setLoading(true)
    // console.log(sorter)
    /* 排序 */
    if (sorter.order === 'ascend') {
      formParams.dateSort = 2
    } else {
      formParams.dateSort = 1
    }
    setTableParams({
      pagination,
      //   filters,
      ...sorter,
    })
    let t = null
    clearTimeout(t)
    t = setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  /* 查看按钮点击事件 */
  const handleCheck = (e, record) => {
    setCheckedData({ ...record })
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
  const downloadExcel = (tableRecord, selectedRowKeys) => {   //导出table数据
    if (selectedRowKeys === '' && tableRecord === '') {
      message.error('无数据')
    }
    const data_ = selectedRowKeys.length != 0 ? selectedRowKeys : tableRecord.length != 0 ? tableRecord : '';//表格数据
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
    option.fileName = '账号列表'
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
  return <>
    <Table
      scroll={{ y: '45vh' }}
      className='accountTableBox'
      //识别是否是首页的公告栏跳转过来的如果是则禁止使用选择功能
      rowSelection={
        {
          type: selectionType,
          ...rowSelection
        }}
      dataSource={tableRecord.slice((tableParams.pagination.current - 1) * tableParams.pagination.pageSize, tableParams.pagination.current * tableParams.pagination.pageSize)}
      columns={columns as any}
      pagination={false}
      onChange={handleTableChange}
      loading={loading} />
    <Box className='accountTableOutBox'>
      <div className='accountTableButtonBox' >
        <p className='accountTableButtonSel'>
          已选
          <span
            className='accountTableButtonSelLength'>
            {selectedRowKeys ? selectedRowKeys.length : 0}
          </span>
          条
        </p>
        <Popconfirm
          title="是否禁用该数据"
          okText="确定"
          cancelText="取消"
          onConfirm={() => {
            // 打开加载动画
            setLoading(true)
            setTimeout(() => {
              setSelectedRowKeys([]);
              console.log(selectedRowKeys)
              // 拷贝表格数据，等后端接口拿到在修改
              const tableCopy = [...tableRecord]
              selectedRowKeys.forEach((value, index) => {
                tableCopy.forEach((item, tableIndex) => {
                  if (tableCopy[tableIndex].key === selectedRowKeys[index]) {
                    // console.log(tableIndex)
                    const tableIndexNum = [tableIndex]
                    console.log(tableIndexNum)
                    tableIndexNum.forEach((tableIndexValue, tableNumIndex) => {
                      tableCopy.splice(tableNumIndex, 1)
                      // console.log(tableCopy)
                      setTableRecord([...tableCopy])
                      // console.log(tableRecord)
                    })
                  }
                })
              })
              setLoading(false);
              message.success('禁用成功')
            }, 1000)
          }}
        >
          <Button className='accountTableDelBut'
            // style={{background:`${selectedRowKeys.length === 0?'#FFFFFF':'#165DFF'}`}}
            disabled={selectedRowKeys.length === 0 ? true : false}
          // onClick={() => { stopButton() }}
          >禁用</Button>
        </Popconfirm>
        <Button
          className='accountTableOutBut'
          onClick={() => { downloadExcel(tableRecord, selectedRowKeys) }}>导出</Button>

      </div>

      <Pagination
        defaultCurrent={1}
        current={tableParams.pagination.current}
        pageSize={tableParams.pagination.pageSize}
        total={tableParams.pagination.total}
        showTotal={tableParams.pagination.showTotal}
        onChange={(page, pageSize) => { setTableParams({ pagination: { ...tableParams.pagination, current: page, pageSize } }) }}
        onShowSizeChange={(current, size) => { setTableParams({ pagination: { ...tableParams.pagination, pageSize: size, current } }) }}
      ></Pagination>

    </Box>
  </>

}
