import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { getDayDataList, getWeekDataList, satelliteCount } from '@/api/data'
import { getSatelliteList } from '@/api/satellite'
import DataBox, { Sentinel } from '@/components/DataBox'
import AddChart from '@/components/AddChart'
import MySkeleton from '@/components/Skeleton'
import SvgIcon from '@/components/SvgIcon'
import moment from 'moment'
import box1 from '@/assets/image/png/box1.png'
import box2 from '@/assets/image/png/box2.png'
import box3 from '@/assets/image/png/box3.png'
import box4 from '@/assets/image/png/box4.png'
import box5 from '@/assets/image/png/box5.png'
import activeIcon from '@/assets/image/png/switch.png'
import './style.scss'

export default function index() {
  const [typeSelect, setTypeSelect] = useState(0)
  const [baseData, setBaseData] = useState([])
  const [satelliteList, setSatelliteList] = useState<Array<Sentinel>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [imgArr, setImgArr] = useState<Array<string>>([])

  // 背景图片
  const boxImgArr = [
    [box1, box2, box3],
    [box4, box5],
  ]

  const typeName = ['雷达数据', '光学数据']

  // 切换类型数据标签
  const tabsList = [
    {
      icon: 'satellite',
      label: '按卫星统计',
    },
    {
      icon: 'tab2_icon',
      label: '按数据类型统计',
    },
  ]

  interface Data {
    dataNum: number
    dataUsage: number
    title: string
    dayList: Array<Array<number | string>>
    weekList: Array<Array<number | string>>
  }

  // 监听tab触发事件
  useEffect(() => {
    let baseData: any = []
    let radarData: Data = {
        dataNum: 0,
        dataUsage: 0,
        dayList: [],
        weekList: [],
        title: '',
      },
      opticsData: Data = {
        dataNum: 0,
        dataUsage: 0,
        dayList: [],
        weekList: [],
        title: '',
      }
    satelliteList.forEach((item: Sentinel) => {
      if (typeSelect === 0) {
        setImgArr(boxImgArr[0])
        let data = {
          title: item.satelliteName,
          dataNum: item.dataNum,
          dataUsage: item.dataUsage,
          dayList: item.dayList,
          weekList: item.weekList,
        }
        baseData.push(data)
      } else if (typeSelect === 1) {
        setImgArr(boxImgArr[1])
        switch (item.dataType) {
          case 0:
            radarData = manageData(radarData, item, 0)
            break
          case 1:
            opticsData = manageData(opticsData, item, 1)
            break
        }
        baseData = [radarData, opticsData]
      }
    })
    setBaseData(baseData)
  }, [typeSelect, satelliteList])

  // 统一数据处理
  function manageData(data: Data, item: Sentinel, type: number) {
    data.title = typeName[type]
    data.dataNum += item.dataNum
    data.dataUsage += item.dataUsage

    if (data.dayList.length > 0) {
      item.dayList[0].forEach((el: number, index: number) => {
        ;(data.dayList[0][index] as number) += Number(el.toFixed(2))
      })
    } else {
      data.dayList = item.dayList
    }

    if (data.weekList.length > 0) {
      item.weekList[0].forEach((el: number, index: number) => {
        ;(data.weekList[0][index] as number) += Number(el.toFixed(2))
      })
    } else {
      data.weekList = item.weekList
    }
    return data
  }

  // 初始化获取卫星基本信息
  useEffect(() => {
    // 设置加载loading状态
    setLoading(true)
    // 获取卫星基本数据信息
    getSatelliteList().then(async ({ data }) => {
      for (let i = 0; i < data.length; i++) {
        // 获取总数
        await satelliteCount({ satelliteId: data[i].id }).then((result) => {
          let res = result.data
          data[i].dataNum = res.dataNum
          data[i].dataUsage = res.dataUsage
        })
        // 获取每日数据
        await getDayDataList({ satelliteId: data[i].id }).then((result) => {
          let res = result.data
          data[i].dayData = res
          let dataSizeList: Array<number> = []
          let createTimeList: Array<string> = []
          res.forEach((item: any): void => {
            dataSizeList.push(Number(item.dataSize.toFixed(2)))
            createTimeList.push(item.createTime)
          })
          data[i].dayList = [dataSizeList, createTimeList]
        })
        // 获取每周数据
        await getWeekDataList({ satelliteId: data[i].id }).then((result) => {
          let res = result.data
          data[i].weekData = res
          let dataSizeList: Array<number> = []
          let createTimeList: Array<string> = []
          let sum: number = 0
          let time: string = ''
          for (let i = 0; i < res.length; i++) {
            sum += res[i].dataSize
            if ((i + 1) % 7 === 1) {
              time += res[i].createTime
            }
            if ((i + 1) % 7 === 0) {
              time += '至' + res[i].createTime
              createTimeList.push(time)
              dataSizeList.push(Number(sum.toFixed(2)))
              sum = 0
              time = ''
            }
          }
          data[i].weekList = [dataSizeList, createTimeList]
        })
      }
      // 设置加载loading状态
      setLoading(false)
      setSatelliteList([...data])
    })
  }, [])

  // 数据/数据类型切换事件
  const handleChange = (index: number) => {
    setTypeSelect(index)
  }

  return (
    <Box className="statistics">
      <Box>
        {/* tabs */}
        <Box className="select_bar">
          {tabsList.map((item, i) => {
            return (
              <Box className={(typeSelect === i ? 'active' : '') + ' select'} onClick={() => handleChange(i)}>
                {typeSelect === i ? <img src={activeIcon} className="img" /> : ''}
                <SvgIcon svgName={item.icon} svgClass="tab_icon"></SvgIcon>
                <Typography
                  className="name"
                  sx={{
                    color: typeSelect === i ? '#AEBDD8' : '#AEBDD866',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            )
          })}
        </Box>

        {/* 卫星基本数据 */}
        <Grid
          sx={{
            marginTop: '35px',
            paddingLeft: '50px',
          }}
          container
          spacing={5}
        >
          {!loading ? (
            baseData.map((item, index) => {
              return (
                <>
                  <Grid xs={4} lg={3}>
                    <DataBox satellite={item} bg={imgArr[index]}></DataBox>
                  </Grid>
                </>
              )
            })
          ) : (
            <MySkeleton />
          )}
        </Grid>
      </Box>

      {/* 每日更新 */}
      <Box className="add-bar">
        <Typography className="note">注：该数据为{moment(new Date()).format('YYYY/MM/DD')}数据总量</Typography>
        <Box className="title-bar">
          <SvgIcon svgName="daily" svgClass="svgClass"></SvgIcon>
          <Typography className="title">每日新增</Typography>
        </Box>
        <Grid className="echart-bar" container spacing={3}>
          {!loading ? (
            baseData.map((item: Data) => {
              return (
                <Grid xs={4} lg={3}>
                  <AddChart data={item.dayList} title={item.title}></AddChart>
                </Grid>
              )
            })
          ) : (
            <MySkeleton />
          )}
        </Grid>
      </Box>

      {/* 每周更新 */}
      <Box className="add-bar">
        <Box className="title-bar">
          <SvgIcon svgName="weekly" svgClass="svgClass"></SvgIcon>
          <Typography className="title">每周新增</Typography>
        </Box>
        <Grid className="echart-bar" container spacing={3}>
          {!loading ? (
            baseData.map((item: Data) => {
              return (
                <Grid xs={4} lg={3}>
                  <AddChart data={item.weekList} title={item.title}></AddChart>
                </Grid>
              )
            })
          ) : (
            <MySkeleton />
          )}
        </Grid>
      </Box>
    </Box>
  )
}
