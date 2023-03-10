import React,{useCallback, useEffect, useState} from 'react'
import './index.scss'
import { Grid,FormLabel,Box,Divider,Stack,Button } from '@mui/material'
import { MyInput } from '@/components/Input'
import { LoadingButton } from '@/components/Button'
import SvgIcon from '@/components/SvgIcon'
import {message, Table,TablePaginationConfig,ConfigProvider  }from 'antd'
import DepartmentSearch from './component/deparmentSearch'
import zhCN from 'antd/es/locale/zh_CN';
import { useNavigate ,Link} from 'react-router-dom'
import { getDepartTable } from '@/api/departTable'
export interface departmentInput{
  departName?:string,
  departUser?:string,
  departPlace?:string


}

interface TableParams {
  pagination?: TablePaginationConfig
 
}
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  aa:string;
  bb:string;
  cc:string;
  dd:string;
  orderState:number;
  ee:number
}
// 接口
const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

export default function index() {
  const navigator=useNavigate()
  const [departData, setDepartData] = useState<DataType[]>([ {
    key: 1.1,
    name: 'John ',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: 'cc',
    dd: 'dd',
    orderState: 1,
    ee:2
  }, {
    key: 1.2,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  }, {
    key: 1.3,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  }, {
    key: 1.4,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  }, {
    key: 1.5,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  }, {
    key: 1.6,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  }, {
    key: 1.7,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  },{
    key: 1.8,
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    aa: 'aa',
    bb: 'bb',
    cc: '12345678901',
    dd: 'dd',
    orderState: 1,
    ee:2
  }]);
  // 表格列
  const columns:any = [
    {
      title: '编号',
      dataIndex: 'number',
      key:'number',
     align:'center',
     // 设置文本过长用省略号代替并关闭提示的title
     ellipsis: {
      showTitle: false,
    },
      render: (item,departData) => <span>{departData.key}</span>,
     width:'8%',
    },
    {
      title: '部门',
      dataIndex: 'depart',
      key:'depart',
      align:'center',
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (item,departData) => <span>{departData.name}</span>,
    },
    {
      title: '主账户',
      dataIndex: 'username',
      key:'username',
      align:'center',
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
      render: (item,departData) => <span>{departData.age}</span>,
    },
    {
      title: '负责人',
      dataIndex: 'user',
      key:'user',
      align:'center',
      render: (item,departData) => <span>{departData.aa}</span>,
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '职务',
      dataIndex: 'worker',
      key:'worker',
      align:'center',
      render: (item,departData) => <span>{departData.bb}</span>,
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      key:'tel',
      align:'center',
      render: (item,departData) => <span>{departData.cc}</span>,
      width:'18%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '管辖区域名称',
      dataIndex: 'place',
      key:'place',
      align:'center',
      render: (item,departData) => <span>{departData.key}</span>,
      width:'16%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '部门人数',
      dataIndex: 'peopleNum',
      key:'peopleNum',
      align:'center',
      render: (item,departData) => <span>{departData.dd}</span>,
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '操作',
      dataIndex: 'do',
      key:'do',
      align:'center',
      render: (item,departData) => <span>{<Link to={`/instrument-panel/department/editDepartment?id=${departData.key}`} className="noticeLink" >编辑</Link > }</span> ,
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '配置',
      dataIndex: 'config',
      key:'config',
      align:'center',
      render: (item,departData) =>  <span>{<Link to={`/instrument-panel/department/configDepartment?id=${departData.key}`}>查看配置</Link > }</span> ,
      width:'8%',
      // 设置文本过长用省略号代替并关闭提示的title
      ellipsis: {
        showTitle: false,
      },
    },
  ];
 
  const [loading, setLoading] = useState(false);
  const getDepartParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  // 请求数据
  const DepartFetchData = () => {
    // setLoading(true);
    getDepartTable().then((res) => console.log(res.data))
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         total: 200,
    //         ...tableParams.pagination,
    //        }})
    // //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
  };




  // 分页
  const showTotal = (total) =>
  `共${total}条`

// 分页
const [tableParams, setTableParams] = useState<TableParams>({
  pagination: {
    // 默认显示页码
    current: 1,
    // 每页显示条数
    pageSize: 10,
    //  页面总条数
    total:1000,
    showTotal: showTotal,
  },
})
const departTableChange=( pagination: TablePaginationConfig)=>{
  
  pagination.total=3000,
  pagination.showTotal=showTotal,
  setTableParams({
   pagination
  
  })
  console.log(pagination)
  if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    setDepartData([]);
  }

}


// input框内状态
const [departmentInput,setDepartmentInput]=useState<departmentInput>({
departName:'',
departUser:'',
departPlace:''
})
// input改变事件
const departInputChange = (e,type)=>{
  departmentInput[type]=e.target.value
setDepartmentInput({...departmentInput})
}
// 查询按钮
const departmentSubmit=()=>{
  departmentInput.departName='aaa'
  setDepartmentInput({...departmentInput})
  setLoading(true)
setTimeout(()=>{
  message.success('查询成功')
  setLoading(false)
},1000)

}
// 重置按钮
const departmentReset=()=>{
 
departmentInput.departName===''&&
departmentInput.departUser===''&&
departmentInput.departPlace===''
?null: 
(departmentInput.departName='',
departmentInput.departUser='',
departmentInput.departPlace='',
setDepartmentInput({...departmentInput}),
message.success('重置成功'))

}
useEffect(()=>{
  DepartFetchData();
  // console.log(departmentInput)
},[JSON.stringify(tableParams)])
  return (
    // 最外层盒子
    <div className='departmentBox'>
      {/* 内容区盒子 */}
      <div className='departmentMain'>
        {/* 搜索盒子 */}
        <div className='departmentTitle'>查询表格</div>
        {/* 搜索框 */}
    <DepartmentSearch 
     departInputChangeProps={ departInputChange} 
     departmentInputProps={departmentInput}
     departmentSubmitProps={departmentSubmit}
     departmentResetProps={departmentReset}
     ></DepartmentSearch>
     
      {/* 分割线 */}
      <hr className='departmenTHr' />
      {/* 新增按钮 */}
       <div className='departmentAddBox'>
       <Button
        className='departmentAddBut'
       onClick={()=>{navigator('/instrument-panel/department/addDepartment')}}
       >+&nbsp;&nbsp;新增部门</Button>
       </div>
        {/* 列表盒子 */}
      <div className='departmentTableBox'>
      <ConfigProvider locale={zhCN}>
        <Table 
        className='departmentTable ' 
        loading={loading}
       pagination={tableParams.pagination}
        onChange={departTableChange}
        dataSource={departData}
        columns={columns}
        />
        </ConfigProvider>
        </div>
      
      </div>
      
      
      </div>
  )
}
