import React, { useEffect, useState } from 'react'
import { Box, Select, MenuItem, Typography, Toolbar, Grid, Skeleton } from '@mui/material'
import { getDayDataList, getWeekDataList, satelliteCount, getMemoryContrast } from '@/api/data'
import { styled, useTheme } from '@mui/material/styles'
import { getSatelliteList } from '@/api/satellite'
import DataBox, { Sentinel } from '@/components/DataBox'
import AddChart from '@/components/AddChart'
import MySkeleton from '@/components/Skeleton'
import SvgIcon from '@/components/SvgIcon'
import { memoryOption } from './options'
import './style.scss'
import box1 from '@/assets/image/png/box1.png'
import box2 from '@/assets/image/png/box2.png'
import box3 from '@/assets/image/png/box3.png'
import box4 from '@/assets/image/png/box4.png'
import box5 from '@/assets/image/png/box5.png'
import activeIcon from '@/assets/image/png/switch.png'

export default function index() {
  const [typeSelect, setTypeSelect] = useState(0)
  const [baseData, setBaseData] = useState([])
  const [sentinelList, setSentinelList] = useState<Array<Sentinel>>([])
  const [memoryContrast, setMemoryContrast] = useState<number>(0)
  const [loadingShow, setLoadingShow] = useState<boolean>(false)
  const [imgArr, setImgArr] = useState<Array<string>>([])

  const typeName = ['雷达数据', '光学数据']
  const boxArr = [
    [box1, box2, box3],
    [box4, box5],
  ]
  const selectData = [
    {
      icon: 'satellite',
      label: '按卫星统计',
    },
    {
      icon: 'satellite',
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

  // 监听下拉框触发事件
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
    sentinelList.forEach((item: Sentinel) => {
      if (typeSelect === 0) {
        setImgArr(boxArr[0])
        let data = {
          title: item.satelliteName,
          dataNum: item.dataNum,
          dataUsage: item.dataUsage,
          dayList: item.dayList,
          weekList: item.weekList,
        }
        baseData.push(data)
      } else if (typeSelect === 1) {
        setImgArr(boxArr[1])
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
  }, [typeSelect, sentinelList])

  // 统一数据处理
  function manageData(data: Data, item: Sentinel, type: number) {
    data.title = typeName[type]
    data.dataNum += item.dataNum
    data.dataUsage += item.dataUsage

    if (data.dayList.length > 0) {
      item.dayList[0].forEach((el: number, index: number) => {
        ;(data.dayList[0][index] as number) += el
      })
    } else {
      data.dayList = item.dayList
    }

    if (data.weekList.length > 0) {
      item.weekList[0].forEach((el: number, index: number) => {
        ;(data.weekList[0][index] as number) += el
      })
    } else {
      data.weekList = item.weekList
    }
    return data
  }

  // 初始化获取卫星基本信息
  useEffect(() => {
    // 设置加载loading状态
    setLoadingShow(true)
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
            dataSizeList.push(item.dataSize)
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
            if ((i + 1) % 7 === 1) {
              time += res[i].createTime
            }
            if ((i + 1) % 7 === 0) {
              time += '至' + res[i].createTime
              createTimeList.push(time)
              dataSizeList.push(sum)
              sum = 0
              time = ''
            }
            sum += res[i].dataSize
          }
          data[i].weekList = [dataSizeList, createTimeList]
        })
      }
      // 设置加载loading状态
      setLoadingShow(false)
      setSentinelList([...data])
    })

    // 获取内存
    getMemoryContrastData()
  }, [])

  // 内存数据接口
  const getMemoryContrastData = (): void => {
    getMemoryContrast().then(({ data }) => {
      setMemoryContrast(data.diskInfo)
    })
  }

  // 数据/数据类型切换事件
  const handleChange = (index: number) => {
    setTypeSelect(index)
  }

  return (
    <Box className="statistics">
      <Box>
        <Box className="select_bar">
          {selectData.map((item, i) => {
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
        <Grid
          sx={{
            marginTop: '35px',
            paddingLeft: '50px',
          }}
          container
          spacing={5}
        >
          {!loadingShow ? (
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
        {/* <Box
          sx={{
            width: '100px',
            height: '100%',
          }}
        >
          内存占比:
          <Echants options={memoryOption(memoryContrast)}></Echants>
        </Box> */}
      </Box>

      {/* 每日更新 */}
      <Box className="add-bar">
        <Box className="title-bar">
          <SvgIcon svgName="daily" svgClass="svgClass"></SvgIcon>
          <Typography className="title">每日新增</Typography>
        </Box>
        <Grid className="echart-bar" container spacing={3}>
          {!loadingShow ? (
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
          {!loadingShow ? (
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

      {/* <Loading show={loadingShow}></Loading> */}
    </Box>
  )
}
