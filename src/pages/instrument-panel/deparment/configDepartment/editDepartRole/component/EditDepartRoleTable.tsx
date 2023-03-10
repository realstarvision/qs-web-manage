import React, { useEffect, useState } from 'react'
import './editDepartRoleTable.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { Table,ConfigProvider} from 'antd'


export default function EditDepartRoleTable() {

// 自定义表格状态
  const [editDepartRoleTable, setEditDepartRoleTable] = useState([
    {
      key: 1.1,
      name: '13456789453',
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

  ])

// 表格列
const columns:any= [
{
  title: '序号',
  dataIndex: 'orderNo',
  key: 'orderNo',
  align: 'center',
  width:'20%',
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
  title: '姓名',
  dataIndex: 'orderNo',
  key: 'orderNo',
  align: 'center',
  width:'20%',
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
  dataIndex: 'orderNo',
  key: 'orderNo',
  align: 'center',
  width:'25%',
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
  title: '联系方式',
  dataIndex: 'orderState',
  key: 'orderState',
  align: 'center',
  width:'35%',
  ellipsis: {
    showTitle: false,
  },
  render: (_, record) => <span >{record.name}</span>
  ,
},



]

// 分页
const showTotal = (total) =>
`共${total}条`

// 分页
const [tableParams, setTableParams] = useState({
pagination: {
  // 默认显示页码
  current: 1,
  // 每页显示条数
  pageSize: 10,
  //  页面总条数
  total:300,
  showTotal: showTotal,
},
})

// table页码改变事件
const editDepartTabsRoleTableChange=( pagination)=>{
pagination.total=30,
pagination.showTotal=showTotal,
setTableParams({
 pagination
})
console.log(pagination)
if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    // setDepartTabsRoleTableRecord([]);
}

}

// 页面初始化
useEffect(()=>{
  
  // console.log(departmentInput)
},[JSON.stringify(tableParams)])

  return (
    <div className='editDepartRoleTableBox'>
      <ConfigProvider locale={zhCN}>
   <Table
  //  scroll={{y:"55vh"}}
   dataSource={editDepartRoleTable}
   columns={columns as any}
   pagination={tableParams.pagination}
   onChange={editDepartTabsRoleTableChange}
   ></Table>
   </ConfigProvider>
   </div>
  )
}
