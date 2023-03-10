import React, { useEffect, useState, useRef } from 'react';
import { message,Table,Empty,ConfigProvider} from 'antd';
import './tabsTable.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { Link } from 'react-router-dom';

export default function tabsTable({departTabsRoleTableLoad}) {

    const [departTabsRoleTableRecord, setDepartTabsRoleTableRecord] = useState([
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

 // ?????????
 const columns = [
    {
      title: '??????',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      width:'10%',
      // ??????????????????????????????????????????????????????title
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
      title: '????????????',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      width:'25%',
      // ??????????????????????????????????????????????????????title
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
      title: '????????????',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      width:'25%',
      // ??????????????????????????????????????????????????????title
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
      title: '????????????',
      dataIndex: 'orderState',
      key: 'orderState',
      align: 'center',
      width:'15%',
      ellipsis: {
        showTitle: false,
      },
      
      render: (_, record) => <span >{record.name}</span>
      ,
    },
    {
        title: '??????',
        key: 'action',
        align: 'center',
        width:'10%',
       
        render: (_, record) =>

              <span>
                <Link to={`/instrument-panel/department/configDepartment/editDepartRole?id=${record.key}`} >??????</Link>
              </span>
      },
    {
      title: '????????????',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      width:'15%',
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) =><span>
      <Link to={`/instrument-panel/department/configDepartment/departRolePrivileges?id=${record.key}`}>????????????</Link>
    </span>
    },
   
  ]
// ??????
const showTotal = (total) =>
`???${total}???`

// ??????
const [tableParams, setTableParams] = useState({
pagination: {
  // ??????????????????
  current: 1,
  // ??????????????????
  pageSize: 10,
  //  ???????????????
  total:1000,
  showTotal: showTotal,
},
})
const departTabsRoleTableChange=( pagination)=>{

pagination.total=3000,
pagination.showTotal=showTotal,
setTableParams({
 pagination

})
console.log(pagination)
if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    // setDepartTabsRoleTableRecord([]);
}

}



useEffect(()=>{
  
    // console.log(departmentInput)
  },[JSON.stringify(tableParams)])
  return (
   <div className='departRoleTableBox'>
         <ConfigProvider locale={zhCN}>
        <Table 
     columns={columns as any}
    loading={departTabsRoleTableLoad}
     scroll={{y:'400px'}}
 dataSource={departTabsRoleTableRecord}
 pagination={tableParams.pagination}
 onChange={departTabsRoleTableChange}
     ></Table>
     </ConfigProvider>
     </div>
  )
}
