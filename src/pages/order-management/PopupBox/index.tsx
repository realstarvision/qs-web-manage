import React, { useEffect, useState, useRef } from 'react'
import { Box, Divider, Typography, FormLabel, MenuItem, Grid } from '@mui/material'
import PopupBox from '@/components/PopupBox'
import { useTranslation } from 'react-i18next'
import Button, { LoadingButton } from '@/components/Button'
import { MyInput } from '@/components/Input'
import SvgIcon from '@/components/SvgIcon'
import Popver from './popver'
import { Table, Steps } from 'antd'
import { updateOrder, saveDelivery, findDelivery } from '@/api/workOrder'
import { message, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import Map from '@/components/Map'
import { saveGeoJSON } from '@/utils/tool'
import './style.scss'

const { confirm } = Modal

// 图片
import testPng from '@/assets/image/testPng.png'
import moment from 'moment'

// 订单状态
// let orderStateList = ['待确定', '待支付', '待交付', '完成', '已取消']
let orderStateList = [
  {
    title: '待确定',
  },
  {
    title: '待支付',
  },
  {
    title: '待交付',
  },
  {
    title: '完成',
  },
  {
    title: '已取消',
  },
]

export default function index({ open, onClose, data, onUploadOrderState }) {
  // 提示信息
  const [messageApi, contextHolder] = message.useMessage()
  // i18n
  const { t } = useTranslation()
  // ref
  const map = useRef(null)

  // 确认订单按钮状态
  let [confirmBtnLoading, setConfirmBtnLoading] = useState(false)
  // 取消订单按钮状态
  let [cancelBtnLoading, setCancelBtnLoading] = useState(false)

  // 表格列
  const columns = [
    {
      title: '图片ID',
      dataIndex: 'identifier',
      key: 'identifier',
      align: 'center',
      render: (_, record) => <Popver title={record.identifier} content={record.identifier} />,
    },
    {
      title: '数据源',
      dataIndex: 'satelliteName',
      key: 'satelliteName',
      align: 'center',
    },
  ]

  /* 监听关闭重新初始化参数 */
  useEffect(() => {
    if (!open) {
      setFormParams({
        orderState: 0,
        orderInfo: '',
        orderType: 0,
        remark: '',
        communicationInfo: '',
        deliveryUrl: '',
        id: 0,
        orderFileDTO: [],
        orderNo: '',
      })
    } else {
      Object.keys(formParams).map((item) => {
        formParams[item] = data[item]
      })
      setFormParams({ ...formParams })
      getDelivery(data.id)
    }
  }, [open])

  // 表单数据
  const [formParams, setFormParams] = useState({
    orderState: 0,
    orderInfo: '',
    orderType: 0,
    remark: '',
    communicationInfo: '',
    deliveryUrl: '',
    id: 0,
    orderFileDTO: [],
    orderNo: '',
  })

  /* 监听数据变化 */
  // useEffect(() => {
  //   console.log(data)
  // }, [JSON.stringify(data)])

  /* 修改订单状态接口 */
  function updateOrderState(state) {
    updateOrder({
      communicationInfo: formParams.communicationInfo,
      id: formParams.id,
      orderState: state,
    })
      .then(({ data, code }: any) => {
        if (code === 200) {
          messageApi.success('订单状态修改成功')
          onUploadOrderState()
          // 关闭
          onClose()
        }
      })
      .finally(() => {
        setConfirmBtnLoading(false)
        setCancelBtnLoading(false)
      })
  }

  /* 根据id获取交付物链接 */
  function getDelivery(orderId) {
    findDelivery({ orderId }).then(({ data, code }: any) => {
      let deliveryUrl = ''
      data.forEach((item) => {
        deliveryUrl = deliveryUrl + item.deliveryUrl + '\n'
      })
      formParams.deliveryUrl = deliveryUrl
      setFormParams({ ...formParams })
    })
  }

  /* 确认订单按钮 */
  const handleConfirmOrder = () => {
    setConfirmBtnLoading(true)
    confirm({
      title: `${formParams.orderState === 0 ? '确认订单' : formParams.orderState === 1 ? '确认支付' : '确认交付'}`,
      icon: <ExclamationCircleFilled />,
      content: `订单编号：${formParams.orderNo}，是否继续？`,
      centered: true,
      onOk() {
        let state = formParams.orderState + 1
        // formParams.orderState++
        if (formParams.orderState === 2) {
          handleSaveOrder(() => {
            updateOrderState(state)
          })
        } else {
          updateOrderState(state)
        }
      },
      onCancel() {
        setConfirmBtnLoading(false)
      },
    })
  }

  /* 取消订单按钮 */
  const handleCancelOrder = () => {
    // 取消订单状态为 4
    setCancelBtnLoading(true)
    confirm({
      title: `取消订单`,
      icon: <ExclamationCircleFilled />,
      content: `是否取消订单：${formParams.orderNo}`,
      centered: true,
      onOk() {
        updateOrderState(4)
      },
      onCancel() {
        setCancelBtnLoading(false)
      },
    })
  }

  /* 保存 */
  const handleSaveOrder = (callback?: Function) => {
    // 清空空的内容
    let deliveryUrl = formParams.deliveryUrl.split('\n').filter(function (s) {
      return s && s.trim()
    })
    // 请求接口
    saveDelivery({ orderId: formParams.id, deliveryUrl }).then(({ data, code }: any) => {
      if (code === 200) {
        callback ? '' : messageApi.success('保存成功')
        callback && callback()
      } else {
        messageApi.success('保存失败')
      }
    })
  }

  /* 下载 */
  const handleDownload = () => {
    saveGeoJSON(map.current.getRectangles().multiPoly, formParams.orderNo + '.geojson')
  }

  /* 关闭弹窗 */
  function handleClose() {
    onClose()
  }

  /* 输入框事件 */
  const handleInputChange = (e, type) => {
    formParams[type] = e.target.value
    setFormParams({ ...formParams })
  }

  // 判断是否为对象
  function isObject(data) {
    if (typeof data === 'object') {
      return data.satelliteName
    } else {
      return data
    }
  }

  /* 保存沟通记录*/
  const handleSaveCommunicationRecord = () => {
    confirm({
      title: `保存订单沟通记录`,
      icon: <ExclamationCircleFilled />,
      content: `订单编号：${formParams.orderNo}，是否继续？`,
      centered: true,
      onOk() {
        updateOrder({
          communicationInfo: formParams.communicationInfo,
          id: formParams.id,
          orderState: formParams.orderState,
        }).then(({ data, code }: any) => {
          if (code === 200) {
            messageApi.success('订单信息修改成功')
            onUploadOrderState()
          }
        })
      },
      onCancel() {},
    })
  }
  return (
    <PopupBox
      open={open}
      title={`订单类型：${data.orderType === 0 ? '库存订单' : '定制订单'}，订单ID：${data.orderNo}`}
      onClose={handleClose}
      width="60%"
      coord={{ top: '50%', left: '50%' }}
      style={{
        transform: 'translate(-50%,-50%)',
        minWidth: '850px',
      }}
    >
      <Box className="order_popupBox-container">
        <Box className="from-item">
          <Box className="area">
            <span className="label">{t('orderManagement.PopupBox.areaLabel')}</span>
            <Button className="download_btn" onClick={handleDownload}>
              {t('orderManagement.PopupBox.downloadBtn')}
            </Button>
          </Box>
          <Box className="area_img">
            <Map
              ref={map}
              polygon={{
                topLeft: formParams.orderInfo && JSON.parse(formParams.orderInfo).topLeft,
                bottomRight: formParams.orderInfo && JSON.parse(formParams.orderInfo).bottomRight,
              }}
            />
          </Box>
          <Box className="grid-item">
            <FormLabel component="span" className="label">
              {t('orderManagement.PopupBox.filtrateLabel')}
            </FormLabel>
            <p className="content">
              <span>
                云量≤{formParams.orderInfo && JSON.parse(formParams.orderInfo).cloudCoverage}% 分辨率：
                {/* {formParams.orderInfo && JSON.parse(formParams.orderInfo).resolutionRatioStart}～
                {formParams.orderInfo &&
                  (JSON.parse(formParams.orderInfo).resolutionRatioEnd === 10.1
                    ? 'All'
                    : JSON.parse(formParams.orderInfo).resolutionRatioEnd)} */}
                {formParams.orderInfo && JSON.parse(formParams.orderInfo).resolutionRatioEnd === 10.1
                  ? 'All'
                  : (formParams.orderInfo && JSON.parse(formParams.orderInfo).resolutionRatioStart) +
                    '～' +
                    (formParams.orderInfo && JSON.parse(formParams.orderInfo).resolutionRatioEnd)}
                m 偏移角度：0～{formParams.orderInfo && JSON.parse(formParams.orderInfo).rollSatelliteAngle}º
              </span>
              <br />
              <span>
                数据类型：
                {formParams.orderInfo &&
                  (JSON.parse(formParams.orderInfo).productType == 1
                    ? '雷达数据'
                    : JSON.parse(formParams.orderInfo).productType == 2
                    ? '光学数据'
                    : '多相对数据')}
              </span>
              <br />
              <span>
                时间范围：
                {formParams.orderInfo && moment(JSON.parse(formParams.orderInfo).startTime).format('yyyy/MM/DD')}-
                {formParams.orderInfo && moment(JSON.parse(formParams.orderInfo).endTime).format('yyyy/MM/DD')}
              </span>
            </p>
          </Box>
          <Box className="grid-item">
            <FormLabel component="span" className="label">
              {t('orderManagement.PopupBox.dataOriginLabel')}
            </FormLabel>
            <p
              className="content"
              style={{
                maxHeight: '100px',
                overflowY: 'auto',
              }}
            >
              <span>
                {formParams.orderInfo &&
                  JSON.parse(formParams.orderInfo).satelliteName.map((item, index) => {
                    return (
                      isObject(item) + (JSON.parse(formParams.orderInfo).satelliteName.length - 1 == index ? '' : '、')
                    )
                  })}
              </span>
              {/* <br />
              <span>无人机：UAC</span> */}
              <br />
            </p>
          </Box>
          <Box className="grid-item">
            <FormLabel component="span" className="label">
              {t('orderManagement.PopupBox.orderDataLabel')}
            </FormLabel>
            {formParams.orderType === 0 ? (
              <Table
                dataSource={data.orderFileDTO}
                columns={columns as any}
                pagination={false}
                scroll={{ y: 200 }}
                style={{
                  width: '100%',
                }}
              />
            ) : (
              <MyInput
                size="small"
                value={formParams.remark}
                autoComplete="off"
                multiline
                rows={3}
                sx={{
                  width: '100%',
                }}
              />
            )}
          </Box>
        </Box>
        <Box className="from-item">
          <Box className="grid-item">
            <FormLabel component="span" className="label">
              {t('orderManagement.PopupBox.communicationRecordLabel')}
            </FormLabel>
            <MyInput
              size="small"
              placeholder={t('orderManagement.PopupBox.communicationRecordPlaceholder')}
              value={formParams.communicationInfo}
              onChange={(e) => handleInputChange(e, 'communicationInfo')}
              autoComplete="off"
              multiline
              rows={4}
              sx={{
                width: '100%',
              }}
              disabled={formParams.orderState >= 3}
            />
            <Button onClick={handleSaveCommunicationRecord} className="communicationRecord_btn">
              保存沟通记录
            </Button>
          </Box>
          <Box className="grid-item">
            <FormLabel component="span" className="label">
              {/* {t('orderManagement.PopupBox.editStateLabel')} */}
              订单状态
            </FormLabel>
            {/* <MyInput
              size="small"
              select
              value={formParams.orderState}
              autoComplete="off"
              sx={{
                width: '50%',
              }}
              disabled
            >
              {orderStateList.map((state, index) => (
                <MenuItem key={index} value={index}>
                  {state}
                </MenuItem>
              ))}
            </MyInput> */}
            <Steps
              className={'steps'}
              size="small"
              type="inline"
              progressDot
              current={formParams.orderState}
              items={orderStateList}
            />
          </Box>
          {(formParams.orderState === 2 || formParams.orderState === 3) && (
            <Box className="grid-item">
              <FormLabel component="span" className="label">
                <div className="deliverableLabel">
                  {t('orderManagement.PopupBox.deliverableLabel')}
                  <Popver
                    title={<SvgIcon svgName="help" svgClass="help_icon"></SvgIcon>}
                    content={'当交付物为多个时，请使用回车隔开'}
                  />
                </div>
              </FormLabel>
              <MyInput
                size="small"
                value={formParams.deliveryUrl}
                onChange={(e) => handleInputChange(e, 'deliveryUrl')}
                autoComplete="off"
                multiline
                rows={3}
                sx={{
                  width: '100%',
                }}
                disabled={formParams.orderState !== 2}
              />
            </Box>
          )}
          {formParams.orderState != 3 && formParams.orderState != 4 && (
            <Box className="btn-bar">
              {formParams.orderState === 2 && (
                <Button
                  className="confirm_btn"
                  style={{
                    marginRight: '15px',
                  }}
                  onClick={() => handleSaveOrder()}
                >
                  保存交付物
                </Button>
              )}
              <LoadingButton
                loading={cancelBtnLoading}
                className="cancel_btn"
                // sx={{
                //   color: '#fff',
                //   background: '#DF2E2E',
                //   '&:hover': {
                //     background: '#DF2E2E',
                //   },
                // }}
                onClick={handleCancelOrder}
              >
                {t('orderManagement.PopupBox.cancelBtn')}
              </LoadingButton>
              <LoadingButton
                loading={confirmBtnLoading}
                className="confirm_btn"
                // sx={{
                //   color: '#fff',
                //   background: '#2E6EDF',
                //   '&:hover': {
                //     background: '#2E6EDF',
                //   },
                //   marginLeft: '15px',
                // }}
                onClick={handleConfirmOrder}
              >
                {formParams.orderState === 0 ? '确认订单' : formParams.orderState === 1 ? '确认支付' : '确认交付'}
              </LoadingButton>
            </Box>
          )}
        </Box>
      </Box>
      {contextHolder}
    </PopupBox>
  )
}
