import { color } from '@mui/system'
import * as echarts from 'echarts'
import { useTranslation } from 'react-i18next'

export default function orderDataOptions(listData) {
  const { t } = useTranslation()
  // 横坐标数据
  let XName = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
 
  // 内容数据
  let data1 = ['3', "4", '4.3', '3', "4", '4.3']
  let dataQ = ['4', "3", '2.3', '1', '10','12']
  let dataW = ['6', "7", '8', '6', "4", '2']
  // 纵轴数据
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
      left: 40,
      right: 40,
      top: '43px',
    },
    // 指针跳出区域头部标题样式
    tooltip: [
      {
        trigger: "axis",
        backgroundColor: '#F0F6FD',
        padding: '6px',
        width: '164px',

        extraCssText: 'box-shadow: 10',
        borderWidth: '1px',
        borderImage: 'linear-gradient(337deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1',
        textStyle: {
          fontFamily: 'PingFang SC-Regular, PingFang SC',
          color: '#4E5969',
          fontWeight: '400',
          fontSize: '12px',
        },
        // 鼠标移动到节点时显示的内容
        formatter: function (params, ticket, callback) {
          console.log(params)
          // 这里可以修改以下遍历params 后期在做调整
          return (
            
            `<div
            style='fontWeight:500 !important;margin-left:12px;line-height: 20px;color:color: #1D2129;height:20px;font-size: 12px;font-family: PingFang SC-Medium, PingFang SC'> 
            ${params[0]["axisValueLabel"]}
            </div>`  +
            `<div style='display:flex;justify-content: space-between;align-items: center;width:164px;line-height: 20px;height: 32px;background:rgba(255,255,255,0.9);padding:2px 5px;border-radius:10px;margin-top:4px'>
            <div style='display:flex;justify-content: space-between;align-items: center'>
            <div style='width:10px;height:10px;background: #F77234;border-radius:50%;margin-right:5px'></div> 
            ${t('instrumentPanel.echartTitle.countOrder')}</div>
            <span style='font-size: 13px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #1D2129;
            line-height: 15px;'>
            ${params[0]?params[0]["data"]:0}
           
            </span>
            </div>`
            +
            `<div style='display:flex;justify-content: space-between;align-items: center;line-height: 20px;height: 32px;background:rgba(255,255,255,0.9);padding:2px 5px;border-radius:10px;margin-top:4px'>
            <div style='display:flex;justify-content: center;align-items: center'>
            <div style='width:10px;height:10px;background: #33D1C9;;border-radius:50%;margin-right:5px'></div> 
            ${t('instrumentPanel.echartTitle.countOrder')}</div>
            <span style='font-size: 13px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #1D2129;
            line-height: 15px;'>
            ${params[1]?params[1]["data"]:0}
            </span>
            </div>`
            + `<div style='display:flex;justify-content: space-between;align-items: center;line-height: 20px;height: 32px;background:rgba(255,255,255,0.9);padding:2px 5px;border-radius:10px;margin-top:4px'>
            <div style='display:flex;justify-content: center;align-items: center'>
            <div style='width:10px;height:10px;background: #165DFF ;border-radius:50%;margin-right:5px'></div> 
            ${t('instrumentPanel.echartTitle.countOrder')}</div>
            <span style='font-size: 13px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #1D2129;
            line-height: 15px;'>
            ${params[2]?params[2]["data"]:0}
            </span>
            </div>`
          );
        },
        // lineStyle: {
        //   color: '#2E6EDF'
        // },

        // 选中区域竖直方向的样式
        axisPointer:
        {
          type: "line",
          // textStyle: {
          //   color: "#fff",
          // },
          // 鼠标区域竖直方向的样式
          lineStyle: {
            color: '#979797'
          }
        }
      }
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: XName,
      axisLine: {
        lineStyle: {
          color: 'red'
        }
      },
      axisLabel: {
        color: 'black'
      }
    },
    yAxis: {
      type: 'value'
    },

    

    // 表内数据及样式  数组内对象格式  
    series: [
      // 第一条数据的 data1
      {
        // 数据线的形状
        type: "line",
        data: data1,
        zlevel: 1,
        // 节点的图标的形状
        symbol: "circle",
        smooth: true,
        // 节点图标的大小
        symbolSize: 1,
        // 每个坐标是否给节点图标
        showSymbol: false,
        symbolBackgroundColor:'red',
        lineStyle: {
          normal: {
            // 折线的宽度
            width: 1,
            // 折线的颜色
            color: '#FF7D00'


            // new echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       offset: 0,
            //       color: "rgba(111, 66, 251, 1)",
            //     }, {
            //       offset: 0.5,
            //       color: "rgba(36, 154, 255, 1)",
            //     },
            //     {
            //       offset: 1,
            //       color: "rgba(30, 231, 255, 1)",
            //     },
            //   ],
            //   false
            // ),
          },

        },

        // 表内每条数据覆盖区域背景颜色
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
                  color: " rgba(255,211,100,0.12)",
                },
                {
                  offset: 1,
                  color: " rgba(255,235,52,0)",
                },
              ],
              // 设为否则背景颜色显示
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: "#FF7D00",
            borderColor: "#FF7D00",
            borderWidth: 2,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5,
          },
        },
      },

      // 鼠标指针位置的样式
      // {
      //   type: "bar",
      //   // xAxisIndex: 1,
      //   zlevel: 2,
      //   itemStyle: {
      //     normal: {
      //       opacity: 0,

      //       // color: new echarts.graphic.LinearGradient(
      //       //   0,
      //       //   0,
      //       //   0,
      //       //   1,
      //       //   [
      //       //     {
      //       //       offset: 0.3,
      //       //       color: " rgba(255,211,100,0.12)",
      //       //     },
      //       //     {
      //       //       offset: 1,
      //       //       color: " rgba(255,235,52,0)",
      //       //     },
      //       //   ],
      //       //   false
      //       // ),
      //     },


      //     emphasis: {
      //       opacity: 1,
      //       color: new echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0,
      //             color: "rgba(17, 126, 255, 0)",
      //           },
      //           {
      //             offset: 1,
      //             color: "RGBA(219, 239, 255, 0.5)",
      //           },
      //         ],
      //         // false
      //       ),
      //     },
      //   },
      //   // 柱状的高度
      //   data: data1,
      // },








      // 第2条数据 dataQ

      {
        // 数据线的形状
        type: "line",
        data: dataQ,
        zlevel: 1,
        // 节点的图标的形状
        symbol: "circle",
        smooth: true,
        // 节点图标的大小
        symbolSize: 6,
        // 每个坐标是否给节点图标
        showSymbol: false,
        lineStyle: {
          normal: {
            // 折线的宽度
            width: 2,
            // 折线的颜色
            color: '#37E2E2'


            // new echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       offset: 0,
            //       color: "rgba(111, 66, 251, 1)",
            //     }, {
            //       offset: 0.5,
            //       color: "rgba(36, 154, 255, 1)",
            //     },
            //     {
            //       offset: 1,
            //       color: "rgba(30, 231, 255, 1)",
            //     },
            //   ],
            //   false
            // ),
          },

        },

        // 表内每条数据覆盖区域背景颜色
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
                  color: " rgba(100,255,236,0.12)",
                },
                {
                  offset: 1,
                  color: " rgba(52,255,243,0)",
                },
              ],
              // 设为否则背景颜色显示
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: "#37E2E2",
            borderColor: "#37E2E2",
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5,
          },
        },
      },

      // 鼠标指针位置的样式
      // {
      //   type: "bar",
      //   // xAxisIndex: 1,
      //   zlevel: 2,
      //   itemStyle: {
      //     normal: {
      //       opacity: 0,
      //       color: new echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0,
      //             color: "rgba(17, 126, 255, 0)",
      //           },
      //           {
      //             offset: 1,
      //             color: "rgba(219, 240, 255, 1)",
      //           },
      //         ],
      //         false
      //       ),
      //     },
      //     emphasis: {
      //       opacity: 1,
      //       color: new echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0,
      //             color: "rgba(17, 126, 255, 0)",
      //           },
      //           {
      //             offset: 1,
      //             color: "RGBA(219, 239, 255, 0.5)",
      //           },
      //         ],
      //         // false
      //       ),
      //     },
      //   },
      //   // 柱状的高度
      //   data: dataQ,
      // },

// 第三天数据
      {
        // 数据线的形状
        type: "line",
        data: dataW,
        zlevel: 1,
        // 节点的图标的形状
        symbol: "circle",
        smooth: true,
        // 节点图标的大小
        symbolSize: 6,
        // 每个坐标是否给节点图标
        showSymbol: false,
        lineStyle: {
          normal: {
            // 折线的宽度
            width: 2,
            // 折线的颜色
            color: '#3469FF'


            // new echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       offset: 0,
            //       color: "rgba(111, 66, 251, 1)",
            //     }, {
            //       offset: 0.5,
            //       color: "rgba(36, 154, 255, 1)",
            //     },
            //     {
            //       offset: 1,
            //       color: "rgba(30, 231, 255, 1)",
            //     },
            //   ],
            //   false
            // ),
          },

        },

        // 表内每条数据覆盖区域背景颜色
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
                  color: " rgba(100,162,255,0.12)",
                },
                {
                  offset: 1,
                  color: " rgba(52,105,255,0)",
                },
              ],
              // 设为否则背景颜色显示
              false
            ),
          },
        },


        // 鼠标移入折现后显示的节点颜色
        itemStyle: {
          normal: {
            color: "#3469FF",
            borderColor: "#3469FF",
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5,
          },
        },
      },

      // 鼠标指针位置的样式
      // {
      //   type: "bar",
      //   // xAxisIndex: 1,
      //   zlevel: 2,
      //   itemStyle: {
      //     normal: {
      //       opacity: 0,
      //       color: new echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0,
      //             color: "rgba(17, 126, 255, 0)",
      //           },
      //           {
      //             offset: 1,
      //             color: "rgba(219, 240, 255, 1)",
      //           },
      //         ],
      //         false
      //       ),
      //     },





      //     emphasis: {
      //       opacity: 1,
      //       color: new echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0,
      //             color: "rgba(17, 126, 255, 0)",
      //           },
      //           {
      //             offset: 1,
      //             color: "RGBA(219, 239, 255, 0.5)",
      //           },
      //         ],
      //         // false
      //       ),
      //     },
      //   },
      //   // 柱状的高度来源
      //   data: dataW,
      // },

















    ],


  }
}