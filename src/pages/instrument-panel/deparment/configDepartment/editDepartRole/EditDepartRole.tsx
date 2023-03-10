import React, { useEffect, useState } from 'react'
import './editDepartRole.scss'
import { Grid, FormLabel } from '@mui/material'
import { MyInput } from '@/components/Input'
import { Divider, message, Table } from 'antd'
import { Link, useSearchParams,useNavigate } from 'react-router-dom'
import EditDepartBra from '@/components/AntDBread/index'
import Button from '@/components/Button/index'
import EditDepartRoleTable from './component/EditDepartRoleTable'
const breadcrumbNameMap = {
  '/': '首页',
  '/instrument-panel': '工作台',
  '/instrument-panel/department': '部门管理',
  '/instrument-panel/department/configDepartment': '部门角色配置',
  '/instrument-panel/department/configDepartment/editDepartRole': '角色编辑'
}
// 输入框的类型
export interface editDepartRoleValue {
  editDepartRoleName: string
  editDepartRoleDescribe: string
}


export default function EditDepartRole() {
// // 路由跳转
// const navigator=useNavigate()
  // 获取路由传递的参数，确定点击的是那条数据
  const [departTableToEdit, setDepartTableToEdit] = useSearchParams()
  const EditDepartRoleSearch = departTableToEdit.get('id')
  // 输入框的状态
  const [editDepartRoleValue, setEditDepartRoleValue] = useState<editDepartRoleValue>({
    editDepartRoleName: '',
    editDepartRoleDescribe: '',
  })
  // 右侧角色总数状态
  const [editDepartRoleAllNum, setEditDepartRoleAllNum] = useState<Number | ''|ReactI18NextChild | Iterable<ReactI18NextChild>>(5)
  // 角色描述输入框改变事件
  const editDepartRoleDescribeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {

    editDepartRoleValue.editDepartRoleDescribe = e.target.value as string

    setEditDepartRoleValue({ ...editDepartRoleValue })
  }

  // 保存按钮
  const EditDepRolLefFotButCli = () => {

    const editDepartRoleValueArr = [
      {
        name: '角色描述',
        value: editDepartRoleValue.editDepartRoleDescribe
      }
    ]
    // 新建数组  arr储存AddDepartRoleValueArr的每一项的value值
    let arr = []
    // 新建数组  newArr储存AddDepartRoleValueArr的非空值
    let newArr = []
    // 遍历AddDepartRoleValueArr
    editDepartRoleValueArr.map((value, index) => {
      // 判断输入框值为空就谈出错误信息
      if (value.value === '') {
        message.error(`请输入${value.name}`)
      }
      //将输入框值加入arr
      arr.push(value.value)
      console.log(arr)
    })
    // 遍历arr
    arr.forEach((item) => {
      if (item != '') {
        newArr.push(item)
      }
    })
    // 判断输入框有值的数组和输入框总值的长度对比，等长就说明全部有值就谈成功
    if (newArr.length === arr.length) {
      // 请求数据上传服务器然后清空数据
      setTimeout(() => {
        setEditDepartRoleValue({
          editDepartRoleName: '',
          editDepartRoleDescribe: '',
        })
        message.success('保存成功')
      }, 1000)

    }




  }

  //初始化
  useEffect(() => {

    editDepartRoleValue.editDepartRoleName = EditDepartRoleSearch
    setEditDepartRoleValue({ ...editDepartRoleValue })
  }, [])

  return (
    // 最外层盒子
    <div className='EditDepartRole' >
      {/* 面包屑 */}
      <div className='EditDepartRoleBra' > <EditDepartBra breadcrumbNameMap={breadcrumbNameMap}></EditDepartBra></div>
      <div className='EditDepartRoleMain'>
        <Grid container className='EditDepartRoleContainer' >
          {/* 左侧盒子 */}
          <Grid className='EditDepartRoleLeft' item xs={5.1} >
            <div>
              <div className='EditDepartRoleTitle' >标题</div>
              <div className='EditDepartRoleForm'>
                {/* 角色名称 */}
                <Grid container style={{ background: '#fff' }} xs={12} rowSpacing={2}>
                  <Grid className='EditDepartRoleName' item xs={12}  >
                    <FormLabel component="span" className="EditDepartRoleLabel" >
                      {/* {t('orderManagement.searchBar.orderCode')} */}
                      角色名称
                    </FormLabel>
                    {/* 输入框 */}
                    <MyInput
                      size="small"
                      disabled
                      value={editDepartRoleValue.editDepartRoleName}
                      // onChange={(e) => addDepartRoleChange(e, 'addDepartRoleName')}
                      autoComplete="off"
                      sx={
                        { width: '50%' }
                      }
                    />
                  </Grid>
                  <Grid item xs={12}
                    className='EditDepartRoleName'
                  >
                    <FormLabel component="span" className="EditDepartRoleLabel  EditDepartRoleDescribe" >
                      {/* {t('orderManagement.searchBar.orderCode')} */}
                      角色描述
                    </FormLabel>
                    <MyInput
                      className='EditDepartRoleInput'
                      size="small"
                      placeholder={('单行输入')}
                      value={editDepartRoleValue.editDepartRoleDescribe}
                      onChange={(e) => editDepartRoleDescribeChange(e)}
                      autoComplete="off"
                      multiline
                      rows={5}
                      fullWidth
                      helperText={editDepartRoleValue.editDepartRoleDescribe ? null : '请输入描述内容'}
                      error
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Link to={('/instrument-panel/department/configDepartment/departRolePrivileges')} className='DepRoleEditToPri'>修改权限配置</Link>
                  </Grid>
                </Grid>
              </div>
            </div>
            {/* 底部盒子 */}
            <div className='EditDepartRoleLeftFot' >
              <Button
                className='EditDepRolLefFotBut'
                onClick={() => { EditDepRolLefFotButCli() }}
              >保存</Button></div>
          </Grid>

          {/* 中间分割 */}

          <Grid className='EditDepRolContainer' item xs={0.4} >
            <Divider type='vertical' className='EditDepRolContainerDivider'>
            </Divider></Grid>

          {/* 右侧盒子 */}

          <Grid className='EditDepartRoleRight' item xs={6.5} >
            <div className='EditDepartRoleRightTitle'>
              <div className='EditDepartRoleRightTitleLeft' >
                <span>当前角色人数：</span>
                <span className='EditDepartRoleAllNum' >
                  {editDepartRoleAllNum}
                </span>
              </div>
              {/* <div>
                <Button 
                className='EditDepartRoleToManageBut'
                onClick={()=>{navigator('/instrument-panel/department/configDepartment/editDepartRole/DepartRoleManagement')}}
                >角色人员管理
                </Button>
              </div> */}
            </div>
            <div><EditDepartRoleTable></EditDepartRoleTable></div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
