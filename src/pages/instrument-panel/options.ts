import * as echarts from 'echarts'
import { useTranslation } from 'react-i18next'

export default function orderDataOptions(listData) {
  const { t } = useTranslation()
  let XName = []
  let data1 = []
  let data2 = []
  if (listData.length > 0) {
    listData.forEach(item => {
      XName.push(item.today)
      data1.push(item.todayCount)
    })
  }
  let max = Math.max.apply(null, data1) === 0 ? 1 : Math.max.apply(null, data1)
  XName.forEach(item => {
    data2.push(max)
  })

  //数据处理
  return {
    grid: {
      left: 50,
      right: 48,
      top: '9%',
      bottom: '5%',
    },
    tooltip: [
      {
        trigger: "axis",
        backgroundColor: 'rgba(244, 247, 252, 0.4)',
        extraCssText: 'box-shadow: none',
        borderWidth: 0,
        textStyle: {
          color: 'rgba(51, 51, 51, 1)',
          fontWeight: 520,
          fontSize: '14px',
        },
        formatter: function (params, ticket, callback) {
          return (
            `<p style='fontWeight:600 !important;height:10px'> ${params[0]["axisValueLabel"]}</p>` + "<br/ > " +
            `<p style='background:rgba(255,255,255,0.8);padding:2px 5px;border-radius:10px;marginTop:20px'> ${t('instrumentPanel.echartTitle.countOrder')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='fontWeight:600'>${params[0]["data"]}</span></p>`
          );
        },
        lineStyle: {
          color: '#2E6EDF'
        },
        axisPointer:
        {
          type: "line",
          textStyle: {
            color: "#fff",
          },
          lineStyle: {
            color: '#2E6EDF'
          }
        }
      }
    ],
    xAxis: [
      {
        boundaryGap: false,
        type: "category",
        data: XName,
        axisLine: {
          lineStyle: {
            color: "#F5F6F9",
          },
        },
        axisLabel: {
          color: '#86909C',
          fontSize: '16px',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(229,232,239,0.2)",
          },

        },
        axisTick: {
          show: true
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        // splitNumber: 5,
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(229, 232, 239, 1)",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#86909C",
          },
        },
        axisLabel: {
          color: '#86909C',
          fontSize: '16px',
        },
        nameTextStyle: {
          color: "#86909C",
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "line",
        data: data1,
        zlevel: 1,
        symbol: "circle",
        smooth: true,
        symbolSize: 17,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 3,
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(111, 66, 251, 1)",
                }, {
                  offset: 0.5,
                  color: "rgba(36, 154, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(30, 231, 255, 1)",
                },
              ],
              false
            ),
          },

        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0.3,
                  color: "rgba(17, 126, 255, 0.16)",
                },
                {
                  offset: 1,
                  color: "rgba(17, 128, 255, 0)",
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: "#fff",
            borderColor: "#2E6EDF",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5,
          },
        },
      },
      {
        type: "bar",
        // xAxisIndex: 1,
        zlevel: 2,
        itemStyle: {
          normal: {
            opacity: 0,
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(17, 126, 255, 0)",
                },
                {
                  offset: 1,
                  color: "rgba(219, 240, 255, 1)",
                },
              ],
              // false
            ),
          },
          emphasis: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(17, 126, 255, 0)",
                },
                {
                  offset: 1,
                  color: "RGBA(219, 239, 255, 0.5)",
                },
              ],
              // false
            ),
          },
        },
        data: data2,
      },
    ],
  }
}