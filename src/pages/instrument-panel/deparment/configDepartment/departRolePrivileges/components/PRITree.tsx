import React,{useEffect, useState} from 'react'
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
export default function pRITree( {treeValue,treeCheckData,changeTreeCheckData,treeIndex}) {

    //默认展开项
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  // 默认选中项
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([...treeValue]);
  // 选中的数据
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
// 全部禁止
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
// 展开的树型结构
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
// 选中的内容
  const onCheckD = (checkedKeysValue: React.Key[],e) => {
    // console.log('onCheck', checkedKeysValue,e);
    // console.log(e)
    // console.log(treeIndex)
  setCheckedKeys(checkedKeysValue)
   

    changeTreeCheckData(checkedKeysValue,treeIndex)
    
  };
// 
  // const onSelect = (selectedKeysValue: React.Key[], info: any) => {
  //   console.log('onSelect', info);
  //   setSelectedKeys(selectedKeysValue);
  // };
useEffect(()=>{


// console.log(treeIndex)

})

  return (
 <Tree
    className='DeRolPriTree'
    
    checkable
    onExpand={onExpand}
    expandedKeys={expandedKeys}
    autoExpandParent={autoExpandParent}
    onCheck={(checkedKeysValue,e)=>{
      onCheckD(checkedKeysValue as any,e)
    }}
    checkedKeys={checkedKeys}
    // onSelect={onSelect}
    // selectedKeys={selectedKeys}
    treeData={treeValue}
    multiple={true}
    ></Tree>
  )
}
