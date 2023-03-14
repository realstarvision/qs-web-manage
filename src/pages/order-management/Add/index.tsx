import React, { useState } from 'react'
import { Grid, FormLabel, MenuItem } from '@mui/material'
import { Input, Radio, Space, RadioChangeEvent, TreeSelect } from 'antd'
import CrumbPageFrame from '@/components/CrumbPageFrame'
import { MyInput } from '@/components/Input'
import Button, { LoadingButton } from '@/components/Button'
import LongitudeAndLatitudeMap from '@/components/LongitudeAndLatitudeMap'
import SvgIcon from '@/components/SvgIcon'

import './style.scss'

let breadcrumbNameMap = {
  '/instrument-panel': '工作台',
  '/instrument-panel/workOrder': '工单管理',
  '/instrument-panel/workOrder/add': '工单新增',
}

// 设备列表
let equipmentTypeList = [
  {
    value: 1,
    label: '内涝设备',
  },
  {
    value: 2,
    label: '垃圾设备',
  },
]

// 工单类型
let orderBoardList = [
  {
    value: 1,
    label: '沉降',
  },
  {
    value: 2,
    label: '内涝',
  },
  {
    value: 3,
    label: '智能垃圾柜',
  },
]

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'leaf2',
            title: 'your leaf',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'sss',
            title: <b style={{ color: '#08c' }}>sss</b>,
          },
        ],
      },
    ],
  },
]

export default function index() {
  // 表单数据
  let [formParams, setFormParams] = useState({
    orderTitle: '',
    departmentRoleName: '',
    urgency: 1,
    orderRegion: '',
    equipmentId: '',
    orderLatitude: '',
    orderLongitude: '',
    equipmentType: 1,
    orderText: '',
    orderBoard: 1,
  })

  /* 输入框改变事件 */
  const handleInputChange = (e, type) => {
    console.log(e)
    // fromParams
    formParams[type] = e.target.value
    setFormParams({ ...formParams })
  }

  /* 地图弹出框关闭事件 */
  const handleMapModelCancel = (coordinates) => {
    if (coordinates) {
      formParams.orderLatitude = coordinates[0]
      formParams.orderLongitude = coordinates[1]
      // 根据经纬度转实际地址

      setFormParams({ ...formParams })
    }
  }

  /* 人员选择 */
  const handleTreeSelectChange = (value) => {
    formParams.departmentRoleName = value
    setFormParams({ ...formParams })
  }
  return (
    <CrumbPageFrame breadcrumbNameMap={breadcrumbNameMap} title="工单新增">
      <div className="group">
        <Grid container spacing={10} className="form" style={{ marginTop: '16px' }} justifyContent="center">
          <Grid item xs={6} className="formItem">
            <FormLabel component="span" className="label">
              事件名称
            </FormLabel>
            <MyInput
              size="small"
              placeholder={'请输入事件名称'}
              value={formParams.orderTitle}
              onChange={(e) => handleInputChange(e, 'orderTitle')}
              autoComplete="off"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6} className="formItem">
            <FormLabel component="span" className="label">
              接受人员
            </FormLabel>
            {/* <MyInput
              size="small"
              select
              placeholder={'请选择接受人员'}
              value={formParams.departmentRoleName}
              onChange={(e) => handleInputChange(e, 'departmentRoleName')}
              autoComplete="off"
              sx={{ width: '100%' }}
            /> */}
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={formParams.departmentRoleName}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择接受人员"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={handleTreeSelectChange}
              treeData={treeData}
            />
          </Grid>
          <Grid item xs={6} className="formItem">
            <FormLabel component="span" className="label">
              工单类型
            </FormLabel>
            <MyInput
              size="small"
              select
              placeholder={'请选择工单类型'}
              value={formParams.orderBoard}
              onChange={(e) => handleInputChange(e, 'orderBoard')}
              autoComplete="off"
              sx={{ width: '100%' }}
            >
              {orderBoardList.map((item, index) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </MyInput>
          </Grid>
          <Grid item xs={6} className="formItem">
            <FormLabel component="span" className="label">
              紧急程度
            </FormLabel>
            <RadioGroup value={formParams.urgency} onChange={(e) => handleInputChange(e, 'urgency')}></RadioGroup>
          </Grid>
          <Grid item xs={6} className="formItem">
            <FormLabel component="span" className="label">
              事件区域
            </FormLabel>
            <MyInput
              size="small"
              placeholder={'请输入事件区域'}
              value={formParams.orderRegion}
              onChange={(e) => handleInputChange(e, 'orderRegion')}
              autoComplete="off"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6} className="formItem">
            <FormLabel component="span" className="label">
              设备类型
            </FormLabel>
            <MyInput
              size="small"
              select
              placeholder={'请选择设备类型'}
              value={formParams.equipmentType}
              onChange={(e) => handleInputChange(e, 'equipmentType')}
              autoComplete="off"
              sx={{ width: '100%' }}
            >
              {equipmentTypeList.map((item, index) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </MyInput>
          </Grid>
          {/* <Grid item xs={6} sx={{ paddingTop: '0 !important', display: 'flex' }}>
            <div style={{ width: 'calc(100% - 80px)' }}>
              <div className="formItem" style={{ paddingBottom: '10px' }}>
                <FormLabel component="span" className="label">
                  经纬度
                </FormLabel>
                <MyInput
                  size="small"
                  placeholder="经度"
                  value={formParams.orderLongitude}
                  onChange={(e) => handleInputChange(e, 'orderLongitude')}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </div>
              <div className="formItem">
                <FormLabel component="span" className="label"></FormLabel>
                <MyInput
                  size="small"
                  placeholder="纬度"
                  value={formParams.orderLatitude}
                  onChange={(e) => handleInputChange(e, 'orderLatitude')}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </div>
            </div>
            <Button
              className="search_btn"
              sx={{
                width: '80px',
                height: 'calc(100% - 20px)',
                marginLeft: '10px',
                background: '#165DFF !important',
              }}
            >
              <SvgIcon svgName="coordinate"></SvgIcon>
            </Button>
          </Grid> */}
          <LongitudeAndLatitudeMap onCancel={handleMapModelCancel}></LongitudeAndLatitudeMap>
          <Grid item xs={6} className="formItem" style={{ height: '53.5px' }}>
            <FormLabel component="span" className="label">
              设备IMEI号
            </FormLabel>
            <MyInput
              size="small"
              placeholder={'请输入设备IMEI号'}
              value={formParams.equipmentId}
              onChange={(e) => handleInputChange(e, 'equipmentId')}
              autoComplete="off"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} className="formItem">
            <FormLabel
              component="span"
              className="label"
              style={{
                alignSelf: 'self-start',
                marginTop: '5px',
              }}
            >
              工单内容
            </FormLabel>
            <MyInput
              size="small"
              multiline
              placeholder={'工单内容'}
              value={formParams.orderText}
              onChange={(e) => handleInputChange(e, 'orderText')}
              autoComplete="off"
              sx={{ width: '100%' }}
              rows={5}
            />
          </Grid>
        </Grid>
      </div>
      <div className="footer">
        <Button className="cancel_btn" style={{ marginRight: '10px' }}>
          取消
        </Button>
        <Button className="search_btn">保存</Button>
      </div>
    </CrumbPageFrame>
  )
}

// 紧急程度单选按钮
const RadioGroup = ({ value, onChange }: { value: number; onChange: Function }) => {
  let list = [1, 2, 3, 4]
  const handleChange = (e: RadioChangeEvent) => {
    onChange(e)
  }
  return (
    <Radio.Group
      onChange={handleChange}
      value={value}
      style={{
        width: '100%',
      }}
    >
      <Space>
        {list.map((item) => (
          <Radio value={item}>{item}</Radio>
        ))}
      </Space>
    </Radio.Group>
  )
}
