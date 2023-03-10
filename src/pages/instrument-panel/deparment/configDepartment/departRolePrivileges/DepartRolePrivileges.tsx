import React,{useState,useEffect} from 'react'
import './departRolePrivileges.scss'
import DepartRolePrivilegesBra from '@/components/AntDBread/index'
import Button from '@/components/Button/index'
import PRITree from './components/PRITree'
import type { DataNode } from 'antd/es/tree';
// 扁平化处理
export function handleHeavy(arr, callback, childrenKey = 'children', level) {
   Array.isArray(arr) &&
    arr.forEach((item) => {
     callback && callback(item, level);
     if (Array.isArray(item[childrenKey])) {
      handleHeavy(item[childrenKey], callback, childrenKey, level + 1);
     }
    });
  }
  
  // 平铺树，返回平铺后的数组
  export function tileTree(arr) {
const dataList = [];
  const generateList = (data) => {
 for (let i = 0; i < data.length; i++) {
     const node = data[i];
     dataList.push(node);
     if (node.children) {
      generateList(node.children);
     }
    }
   };
   generateList(arr);
   return dataList;
  }



export default function DepartRolePrivileges() {
  const breadcrumbNameMap = {
    '/': '首页',
    '/instrument-panel': '工作台',
    '/instrument-panel/department': '部门管理',
    '/instrument-panel/department/configDepartment': '部门角色配置',
    '/instrument-panel/department/configDepartment/departRolePrivileges': '权限配置'
  }
  // const treeData: DataNode[] = [
   
  //       {
  //         title: '0-0-0',
  //         key: '0-0-0',
  //         children: [
  //           { title: '0-0-0-0', key: '0-0-0-0' },
  //           { title: '0-0-0-1', key: '0-0-0-1' },
  //           { title: '0-0-0-2', key: '0-0-0-2' },
  //           { title: '0-0-0-3', key: '0-0-0-3' },
  //         ],
  //       },
       
  // ];
// 树型结构的状态
// 树形结构的选中状态

// 接收所有树形结构的选中项
const [treeCheckData,setTreeCheckData] =useState({})
// 两个参数的意义：
// index：选中项的索引值

// 子修改父组件状态
const changeTreeCheckData=(CheckData,index)=>{
  treeCheckData[index]=CheckData



  setTreeCheckData({...treeCheckData})
  // CheckData.forEach((item)=>{
  // if(item.length=1){
  //   if(treeCheckData.indexOf(item)===-1){
  //     treeCheckData.push(...item,item)
  //   }
  //   else{
  //     treeCheckData.splice(treeCheckData.indexOf(item),1)
  //   }

  // }
   
// console.log(index)

  // })
  
setTreeCheckData([{a:CheckData}])
  console.log(treeCheckData)
}

  const treeDataObj =[
     [
      {
        title: '0',
        key: '0',
        children: [
          { title: '0-0', key: '0-0' },
          { title: '0-1', key: '0-1' },
          { title: '0-2', key: '0-2' },
          { title: '0-3', key: '0-3' },
        ],
      },
     
    ],
    
   [
       
      {
        title: '1',
        key: '1',
        children: [
          { title: '1-0', key: '1-0' },
          { title: '1-1', key: '1-1' },
          { title: '1-2', key: '1-2' },
          { title: '1-3', key: '1-3' },
        ],
      },
     
    ],
    [
       
      {
        title: '2',
        key: '2',
        children: [
          { title: '2-0', key: '2-0' },
          { title: '2-1', key: '2-1' },
          { title: '2-2', key: '2-2' },
          { title: '2-3', key: '2-3' },
        ],
      },
     
    ],
    [
       
      {
        title: '3',
        key: '3',
        children: [
          { title: '3-0', key: '3-0' },
         
        ],
      },
     
    ],
   [
       
      {
        title: '4',
        key: '4',
        children: [
          { title: '4-0', key: '4-0' },
          { title: '4-1', key: '4-1' },
          { title: '4-2', key: '4-2' },
          { title: '4-3', key: '4-3' },
        ],
      },
     
    ],
   [
       
      {
        title: '5',
        key: '5',
        children: [
          { title: '5-0', key: '5-0' },
          { title: '5-1', key: '5-1' },
          { title: '5-2', key: '5-2' },
         
        ],
      },
     
    ],
      ]
      useEffect(()=>{
// const newArr=[]
//         handleHeavy(treeDataObj ,(item)=>{newArr.push(item);console.log(newArr)},'children',4)
//       console.log(tileTree(newArr))    



      })
  return ( // 最外层盒子
    <div className='DepartRolePrivileges'>
     {/* 面包屑 */}
    <div className='DeRolPriBra'> 
    <DepartRolePrivilegesBra breadcrumbNameMap={breadcrumbNameMap}>
      </DepartRolePrivilegesBra></div>
    {/* 内容 */}
    <div className='DeRolPriMain'>
      {/* 上部标题 权限列表 */}
      <div className='DeRolPriMainTop'>
        {/* 标题 */}
        <div className='DeRolPriMainTitle'>权限配置</div>
{/* 权限列表 */}
        <div className='DeRolPriMainList'>
  {treeDataObj.map((value,index)=>{

return <div className='DeRolPriMainTree'>


{<PRITree 
treeCheckData={treeCheckData} 
treeValue={value} 
changeTreeCheckData={changeTreeCheckData}
treeIndex={index}


/>}



</div>




  })}

        </div>

      

        </div>
        {/* 底部 */}
      <div className='DeRolPriMainFooter'>
        <Button className='DeRolPriMainBut'>
        更新权限
        </Button></div>
      </div>
    </div>
  )
}
