import React, { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import Echarts from '@/components/Echarts'
import * as echarts from 'echarts'

export default function AddChart({ title, data }: { title: string; data: Array<Array<string | number>> }) {
  let [targetValue, setTargetValue] = useState<number>(0)
  let [max, setMax] = useState<number>(0)

  const targetValueArr = [
    {
      title: 'sentinel_1',
      targetValue: 2400,
    },
    {
      title: 'sentinel_2',
      targetValue: 3500,
    },
    {
      title: 'landsat_8',
      targetValue: 1700,
    },
    {
      title: '雷达数据',
      targetValue: 2400,
    },
    {
      title: '光学数据',
      targetValue: 5200,
    },
  ]

  useEffect(() => {
    let maxValue = 0
    targetValueArr.forEach((item) => {
      if (item.title === title) {
        setTargetValue(item.targetValue)
        maxValue = item.targetValue
      }
    })
    data[0].forEach((item) => {
      if (item >= maxValue) {
        maxValue = item as number
      }
    })
    setMax(maxValue)
  }, [])

  // 折线图配置
  let options = {
    animation: false,
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    tooltip: {
      //提示框组件
      trigger: 'axis',
      formatter: '{b}<br />{c}GB',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#6a7985',
        },
        lineStyle: {
          type: 'solid',
          color: '#AEBDD8',
          opacity: 0.2,
        },
      },
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 12,
      },
      extraCssText:
        'background: linear-gradient(180deg, #AEBDD8 0%, #7E98C8 85%, #8499BF 100%) ;box-shadow: 0px 0px 8px 0px rgba(43,48,63,0.5000)',
      borderWidth: 0,
    },
    grid: {
      left: 30,
      right: 50,
      bottom: 0,
      top: 15,
      containLabel: true,
    },
    xAxis: {
      // show: false,
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#AEBDD8',
        fontSize: 10,
        fontFamily: 'PingFangSC-Regular, PingFang SC',
        fontWeight: 400,
        height: 14,
        lineHeight: 14,
        interval: data[1].length - 2,
        formatter: function (value: string, index: number) {
          if (data[0].length > 7) {
            if (index === 0) {
              return value.split('至')[0]
            } else if (index === data[1].length - 1) {
              return value.split('至')[1]
            }
          }
          return value
        },
      },
      boundaryGap: false,
      splitLine: {
        interval: 0,
        show: true,
        lineStyle: {
          color: '#232734',
          width: 0.5,
          opacity: 0.8,
        },
      },
      data: data[1],
    },
    yAxis: {
      show: false,
      type: 'value',
      // max: targetValue * 2,
      max: max > targetValue ? max : targetValue * 2,
    },
    series: [
      {
        data: data[0],
        symbolSize: 1,
        symbol: 'circle',
        showSymbol: false,
        type: 'line',
        smooth: true,
        itemStyle: {
          emphasis: {
            width: 1,
            color: '#fff',
            borderColor: 'rgba(174, 189, 216,0.4)',
            borderWidth: 10,
            shadowColor: 'rgba(174, 189, 216)',
            shadowBlur: 15,
          },
        },
        lineStyle: {
          width: 1.5,
          shadowColor: 'rgba(26, 28, 37, 0.5)',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#AEBDD8', // 0% 处的颜色
              },
              {
                offset: 0.25,
                color: '#7E98C8', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#AEBDD8', // 100% 处的颜色
              },
              {
                offset: 0.75,
                color: '#7E98C8', // 100% 处的颜色
              },
              {
                offset: 1,
                color: '#AEBDD8', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        // 警戒线
        markLine: {
          silent: false,
          symbol: ['none', 'none'],
          label: {
            normal: {
              show: true,
              position: 'start',
              color: '#AEBDD8',
              fontWeight: 400,
              fontSize: 10,
              lineHeight: 14,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              formatter: '目标值\n{c}GB',
              distance: 10,
            },
          },
          lineStyle: {
            normal: {
              color: 'rgba(174, 189, 216, 0.6)',
              width: 0.5,
              type: 'solid',
            },
            emphasis: {
              disabled: true,
              color: 'rgba(174, 189, 216, 0.6)',
              width: 0.5,
            },
          },
          data: [
            {
              yAxis: targetValue,
            },
          ],
        },
      },
    ],
  }

  return (
    <Box
      sx={{
        width: '300px',
        height: '150px',
        marginRight: '50px',
      }}
    >
      {/* <Typography component="h2">{title}</Typography> */}
      <Echarts options={options} styleName={{ width: '100%', height: '130px' }}></Echarts>
    </Box>
  )
}
