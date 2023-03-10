import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Divider, Paper } from '@mui/material'
import SvgIcon from '@/components/SvgIcon'
import { useTranslation } from 'react-i18next'
import EChart from '@/components/Echarts'
import orderDataOptions from './options'
import { getOrderAmount, getOrderCharList } from '@/api/order'
import { getUserInfo } from '@/utils/auth'
import { Button } from '@mui/material'
import Notice from './components/Notice/Notice'
import PieChart from './components/PieChart/PieChart'
import FirstModal from './components/firstModal/firstModal'
import Modal from '@material-ui/core/Modal';
import './style.scss'
// 图片
import itemPurple from '@/assets/image/itemPurple.png'
import itemGreen from '@/assets/image/itemGreen.png'
import itemYellow from '@/assets/image/itemYellow.png'
import itemOrange from '@/assets/image/itemOrange.png'
import itemBlue from '@/assets/image/itemBlue.png'
import itemHandle from '@/assets/image/itemHandle.png'

// 管理面板icon
export default function index() {
  // 控制面板点击跳转
  const navigate = useNavigate()
  const { t } = useTranslation()


  
  // 图标按钮组点击时切换样式
  const [buttonYearClass, setButtonYearClass] = useState('')
  const [buttonWeekClass, setButtonWeekClass] = useState('')
  const [buttonMathClass, setButtonMathClass] = useState('')
  // 统计订单数据列表
  const [orderTypeList, setOrderTypeList] = useState([
    {
      icon: itemPurple,
      orderTypeName: '今日新增',
      count: 0,
    },
    {
      icon: itemGreen,
      orderTypeName: '处理中',
      count: 0,
    },
    {
      icon: itemYellow,
      orderTypeName: '未处理',
      count: 0,
    },
    {
      icon: itemOrange,
      orderTypeName: '已驳回',
      count: 0,
    },
    {
      icon: itemBlue,
      orderTypeName: '审批中',
      count: 0,
    },
    {
      icon: itemHandle,
      orderTypeName: '待我审批',
      count: 0,
    },
  ])

  // 管理面板区域数据
  const [manageTypeList, setManageTypeList] = useState([
    {
      icon: 'generalPaper',
      orderTypeName: '公告管理',
      path: 'aa',
    },
    {
      icon: `generalCommon`,
      orderTypeName: '部门管理',
      path: 'aa',
    },
    {
      icon: 'generalIdCard',
      orderTypeName: '账号管理',
      path: 'aa',
    },
    {
      icon: 'generalUser-group',
      orderTypeName: '社区管理',
      path: 'aa',
    },
    {
      icon: 'Device',
      orderTypeName: '设备管理',
      path: 'aa',
    },
    {
      icon: 'WorkOrder',
      orderTypeName: '工单管理',
      path: 'aa',
    },
    {
      icon: 'generalSchedule',
      orderTypeName: '沉降监测管理',
      path: 'aa',
    },
    {
      icon: 'Approval',
      orderTypeName: '审批中心',
      path: 'aa',
    },
  ])


  // 折线图数据列表
  const [orderCharList, setOrderCharList] = useState([])

  // 按钮组点击切换样式并请求数据
  const buttonYearClick = function () {
    setButtonYearClass('button-active')
    setButtonWeekClass('')
    setButtonMathClass('')

    // 请求数据
    //修改eChart状态（父传子）

  }
  const buttonWeekClick = function () {
    setButtonWeekClass('button-active')
    setButtonYearClass('')
    setButtonMathClass('')
    // 请求数据

    // 修改eChart状态（父传子）
  }
  const buttonMathClick = function () {
    setButtonMathClass('button-active')
    setButtonYearClass('')
    setButtonWeekClass('')
    // 请求数据
    // 修改eChart状态（父传子）
  }

  /* 初始化数据 */
  useEffect(() => {
    // 获取订单系统信息
    console.log('我是父组件')
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
      {/* 首次登录弹窗提示用户修改密码 */}
      <FirstModal></FirstModal>
       {/* 首页上部分盒子 */}
      <Box className='instrumentTopBox'>
        {/* 工单处理中心 */}
        <Paper className='chartNumBox'>
          <p className="welcome">
            {/* <SvgIcon svgName="palm" svgClass="icon"></SvgIcon> */}
            <span>
              {/* {t('instrumentPanel.welcomeText')}
          {getUserInfo() && getUserInfo().name} */}
              工单处理中心
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
          </Box>

          {/* 折线图 */}
          <Box className="eChart-title">
            <Box>工单统计</Box>
            {/* {t('instrumentPanel.echartTitle.title')} */}
            <Box className='eChartButton'>
              <Button className={buttonWeekClass} onClick={() => { buttonWeekClick() }}>周</Button>
              <Button className={buttonMathClass} onClick={() => { buttonMathClick() }}>月</Button>
              <Button className={buttonYearClass} onClick={() => { buttonYearClick() }}>年</Button>
            </Box>
            {/* <span> {t('instrumentPanel.echartTitle.subTitle')}</span> */}
            {/* <span> {t('instrumentPanel.echartTitle.subTitle')}</span> */}
          </Box>
          <Box style={{ height: '316px', paddingRight: '4px', marginBottom: '50px' }}>
            <EChart options={orderDataOptions(orderCharList)}></EChart>
          </Box>
          <Box className='eChartBottom'>
            <Box className='eChartBottomFirst'>
              <Box className='BlueBox'></Box>
              <Box className='BlueBoxText'>低电量</Box>
            </Box>
            <Box className='eChartBottomTwo'>
              <Box className='navyBlueBox'></Box>
              <Box className='BlueBoxText'>倾斜</Box>
            </Box>
            <Box className='eChartBottomThree'>
              <Box className='skyBlueBox'></Box>
              <Box className='BlueBoxText'>离线</Box>
            </Box>
            <Box className='eChartBottomFour'>
              <Box className='fourBlueBox'></Box>
              <Box className='BlueBoxText'>漫水</Box>
            </Box>
          </Box>
        </Paper>
        {/* 主页右侧部分 */}
        <Box className='managementBox'>
          {/* 管理面板 */}
          <Paper className='managementBoxTop'>
            <Box>
              <p className="managementBoxTopText">
                <span>
                  管理面板
                </span>
              </p>
              {/* 管理面板内容区 */}
              <Box className="managementBoxTopMain" >
                {manageTypeList.map((item, index) => {
                  return (
                    <>
                      <Box onClick={() => { navigate(`item.path`) }} className="managementBoxTopEvery" style={{ flex: ' 0 0 33%' }} >
                        <Box className="managementIcon" >
                          <SvgIcon svgName={item.icon} svgClass="managementImg"></SvgIcon>
                        </Box>
                        <Box className="managementInfo">
                          <p className="managementTitle"> {item.orderTypeName}</p>
                        </Box>
                      </Box>
                    </>
                  )
                })}
              </Box>
            </Box>
          </Paper>


          {/* 公告栏 */}
          <Paper>
            <Box className='noticeBox'>
              <Notice></Notice>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* {饼状图部分} */}
      <PieChart></PieChart>
    </Box>

  )
}
