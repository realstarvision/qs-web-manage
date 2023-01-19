import React, { useEffect, useState } from 'react'
import { Box, Divider } from '@mui/material'
import SvgIcon from '@/components/SvgIcon'
import { useTranslation } from 'react-i18next'
import Echart from '@/components/Echarts'
import orderDataOptions from './options'
import { getOrderAmount, getOrderCharList } from '@/api/order'
import { getUserInfo } from '@/utils/auth'
import './style.scss'

// 图片
import item1 from '@/assets/image/item1.jpg'
import item2 from '@/assets/image/item2.jpg'
import item3 from '@/assets/image/item3.jpg'
import item4 from '@/assets/image/item4.png'

export default function index() {
  const { t } = useTranslation()
  // 统计订单数据列表
  const [orderTypeList, setOrderTypeList] = useState([
    {
      icon: item1,
      orderTypeName: '待确认订单数',
      count: 0,
    },
    {
      icon: item2,
      orderTypeName: '待交付订单数',
      count: 0,
    },
    {
      icon: item3,
      orderTypeName: '当日新增订单数',
      count: 0,
    },
  ])
  // 折线图数据列表
  const [orderCharList, setOrderCharList] = useState([])
  /* 初始化数据 */
  useEffect(() => {
    // 获取订单系统信息
    getOrderAmount().then(({ data, code }: any) => {
      if (code === 200) {
        orderTypeList.forEach((item, index) => {
          switch (index) {
            case 0:
              item.count = data.unconfirmedCount
              break
            case 1:
              item.count = data.nonDeliveryCount
              break
            default:
              item.count = data.addedToday
              break
          }
        })
        setOrderTypeList([...orderTypeList])
      }
    })

    // 获取折线图数据
    getOrderCharList().then(({ data, code }: any) => {
      if (code === 200) {
        setOrderCharList(data)
      }
    })
  }, [])
  return (
    <Box className="instrument_panel-container">
      <p className="welcome">
        <SvgIcon svgName="palm" svgClass="icon"></SvgIcon>
        <span>
          {t('instrumentPanel.welcomeText')}
          {getUserInfo() && getUserInfo().name}
        </span>
      </p>
      <Box className="order_type_list">
        {orderTypeList.map((item, index) => {
          return (
            <>
              <Box className="order_type_item">
                <img src={item.icon} className="icon"></img>
                <Box className="info">
                  <p className="title">{item.orderTypeName}</p>
                  <p className="count">
                    {item.count}
                    {<span className="units">{t('instrumentPanel.units')}</span>}
                  </p>
                </Box>
              </Box>
              {index !== orderTypeList.length - 1 && <Box className="hr" />}
            </>
          )
        })}
        <Box className="emptyBox"></Box>
      </Box>
      <p className="echart-title">
        {t('instrumentPanel.echartTitle.title')}
        <span> {t('instrumentPanel.echartTitle.subTitle')}</span>
      </p>
      <Box
        style={{
          height: '450px',
        }}
      >
        <Echart options={orderDataOptions(orderCharList)}></Echart>
      </Box>
    </Box>
  )
}
