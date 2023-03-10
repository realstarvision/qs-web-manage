import React, { useEffect, useState, useRef } from 'react';
import { Empty, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { border } from '@mui/system';
import { Button, Grid, MenuItem, FormLabel } from '@mui/material';
import { MyInput } from '@/components/Input';
import Dropzone from 'react-dropzone'
import './ConfigDepartTabs.scss'
import MyButton from '@/components/Button';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Table } from 'antd';
import TabsTable from '../tabsTable/tabsTable'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';

const departRoleTypeList = ['全部', '待确认', '待支付', '待交付', '已完成', '已取消']
const { Dragger } = Upload;
// 样式冲突强制修改 保存button按钮样式
const MButton = styled(MyButton)({
  background: '#165DFF',
  borderRadius: '2px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#fff',
  padding: '8px',
  height: '34px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontFamily: ' PingFang SC-Regular, PingFang SC',
  '&:hover': {
    // background: 'linear-gradient(180deg, #AEBDD8 0%, #7E98C8 85%, #8499BF 100%)',
    // boxShadow: '0px 0px 8px 0px rgba(26,28,37,0.5000)',
    // borderColor: 'transparent',
    opacity: 0.8,
    background: '#165DFF',
  },
  '&:active': {
    // background: '#AEBDD8',
    // boxShadow: '0px 0px 8px 0px rgba(26,28,37,0.5000)',
    // opacity: 0.8,
  },
})
// 组件
const departTabs = ({ departTabsFooterBol, changeFooterBol }) => {
  // 角色管理table的加载状态
const [departTabsRoleTableLoad,setDepartTabsRoleTableLoad]=useState<boolean>()
  const navigator = useNavigate()
  //  文件状态
  const [departTabsFile, setDepartTabsFile] = useState([])
  // 输入框状态
  const [departTabPlaceInput, setDepartTabPlaceInput] = useState('')
  // 角色输入框
  const [departTabRoleInput, setDepartTabRoleInput] = useState(0)

  // 输入框改变事件
  const departTabPlaceInputChange = (e) => {
    //  console.log(e)
    setDepartTabPlaceInput(e.target.value)
  }
  const departTabRoleChange = (e) => {
    setDepartTabRoleInput(e.target.value)
    setDepartTabsRoleTableLoad(true)
    // 定时器 并清除
    let t =null
    clearTimeout(t)
    t= setTimeout(()=>{

      setDepartTabsRoleTableLoad(false)
     
    },1000)
 
      clearTimeout(t)
      // console.log(t)
 
  
  }
  // tabs切换事件
  const onChange = (key) => {
    changeFooterBol()
    console.log(key)
    // if(key==='1'){
    //   alert(key)
    // }
    // if(key==='2'){
    //   alert(key)
    // }
  }
  // 新增角色按钮
  const toAddDepartRole = () => {
    navigator('/instrument-panel/department/configDepartment/addDepartRole')
  }
  //保存事件
  const departTabsPlace = () => {
    // 上传文件请求数据
    // console.log(departTabsFile)
    let formData = new FormData()
    formData.append('departTabsFile', departTabsFile as any)
    // console.log(departTabPlaceInput)
    // 获取输入框的值以及保存的文件发送至服务器
    // message.success('保存成功')

  }

  // 上传的文件的数据
  const props: UploadProps = {
    name: 'file',
    // 支持上传文件的类型
    // accept:'jpg',
    // 可以上传多个文件
    multiple: true,
    // 覆盖默认的自动上传文件
    customRequest(file) {
      console.log(file)
      console.log(departTabsFile)
    },
    // 文件上传前处理判断文件的类型组织上传
    beforeUpload(file, FileList) {
      // console.log(file.name.substring(file.name.indexOf('.')+1,file.name.length))
      // console.log(file.type)
      const fil = file.name.substring(file.name.indexOf('.') + 1, file.name.length)
      const ty = fil === 'zip' || fil === 'kml' || fil === 'xlsx' || fil === 'kmz' || fil === 'shp'
      console.log(file)
      if (!ty) {
        message.error('上传失败,请上传shp/kml/kmz/zip格式的文件')
        return Upload.LIST_IGNORE
      }
      if (ty) {

        setDepartTabsFile([...departTabsFile, file])
        return false
      }
      return false
    },
    // //  文件框内改变事件
    // onChange(info) {
    //   console.log(info.file)
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     // console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} 上传成功.`);
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} 上传失败,请上传shp/kml/kmz/zip格式的文件.`);
    //   }
    // },
    // // 文件框内拖入事件
    // onDrop(e) {
    //   // console.log('Dropped files', e.dataTransfer.files);
    // },
    // 移除文件的操作
    onRemove(file) {
      message.success('移除成功')
      const arrIndex = departTabsFile.indexOf(file)
      const newFileList = departTabsFile.slice();
      newFileList.splice(arrIndex, 1);
      setDepartTabsFile([...newFileList])
    },
  };
  // tabs的内容
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `区域划分配置`,
      children:
        <div className='configDepartTabsChildren'>
          <div className='configDepartTabsPlace'>
            {/* 搜索区域盒子 */}
            <div className='configDepartTabsSearch'>
              <div className='configDepartTabsSearchLeft'>
                <div className='searchLeft-top' >
                  <span className='searchLeft-topText'>区域名称</span>
                  <MyInput
                    size='small'
                    placeholder='单行输入'
                    value={departTabPlaceInput}
                    onChange={(e) => {
                      departTabPlaceInputChange(e)
                    }}
                    sx={{ width: '417px' }}
                  ></MyInput>
                </div>
                <div>设立管辖范围</div>
              </div>
              {/* 文件上传 */}
              <Dragger {...props}
                action="#"
                // accept=".xlsx,.xls,.csv,.shp,.kml,.kmz,.zip" 
                className='configDepartTabsSearchRight'>
                <div className='SearchRightTop'>将shp文件拖拽至此处上传</div>
                <div className='SearchRightBottom'>支持XXX格式</div>
              </Dragger>
            </div>
            {/* 地图 */}
            <div className='configDepartTabsMap'>2</div>
          </div>
          {/* 底部 */}
        </div>
    },
    {
      key: '2',
      label: `部门角色配置`,
      children:
        // 部门角色配置最外层盒子
        <div className='configDepartTabsRole' >
          {/* 输入框新增按钮外盒子 */}
          <Grid container className='departTabsRoleSearch' >
            {/* 输入框新增按钮盒子 */}
            <Grid item xs={5} className="departTabsRoleFrom-item" >
              <FormLabel component="span" className="departTabsRoleLabel" >
                角色名称
              </FormLabel>
              <MyInput
                size="small"
                select
                value={departTabRoleInput}
                onChange={(e) => departTabRoleChange(e)}
                autoComplete="off"
                sx={{
                  width: '80%',
                }}
              >
                {departRoleTypeList.map((type, index) => (
                  <MenuItem key={index} value={index}>
                    {type}
                  </MenuItem>
                ))}
              </MyInput>
            </Grid>
            <div className='departTabsRoleButBox' >
              <Button className='departTabsRoleBut' onClick={() => { toAddDepartRole() }}>+ &nbsp;新增角色</Button>
            </div>
          </Grid>
          <div style={{ height: '60vh' }} >
            {/* {alert('aaa')} */}
            <TabsTable   departTabsRoleTableLoad={departTabsRoleTableLoad} />
          </div>
        </div>,
    },
  ];
  return (<div className='configDepartTabBox'>
    <Tabs size='small'
      // 默认显示的选项
      defaultActiveKey="1"
      // tabs的内容
      items={items}
      //  tabs切换事件
      onChange={onChange}
      className='aaaa'>
    </Tabs>
    {/* 内容区底部 */}
    {departTabsFooterBol ? <div className='configDepartFooter'>
      < MButton className='configDepartButton' onClick={() => {
        departTabsPlace()
      }}>保存</ MButton>
    </div> : null}
  </div>)
}
export default departTabs;