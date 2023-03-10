import * as echarts from 'echarts'
import { useTranslation } from 'react-i18next'

export default function orderDataPieOptions(listData) {
  const { t } = useTranslation()

  // 内容数据
  let data = [
    {
      value: 335,
      name: '直接访问'
    },
    {
      value: 234,
      name: '联盟广告'
    },
    {
      value: 1548,
      name: '搜索引擎'
    },
    {
      value: 1548,
      name: '喵喵'
    },
  
  ]
 let optionDataValue=0
 data.forEach((item)=>{
  optionDataValue+=item.value

 })
  //数据处理
  return {
  
   
// 中间原型区域内显示数据
    graphic:[{
      type:'text',
      left:'center',
      top: '46%',
      style:{
          text:'告警总量' ,  //使用“+”可以使每行文字居中
          textAlign:'center',
          font:'PingFang SC-Regular, PingFang SC',
          fontSize:'12px',
          fill:'#4E5969',  }},
          
{
type:'text',
      left:'center',
      top:'52%',
      style:{
          text:  optionDataValue, //使用“+”可以使每行文字居中
          textAlign:'center',
          font:'PingFang SC-Regular, PingFang SC',
          fontSize:'14px',
          fill:'#4E5969',
          fontWeight:'bolder',
        
      }}],


      
    // 图例的位置
    legend: {
      // 图例垂直排列
      // orient: 'vertical',
    bottom: '4%',
    data,
    itemHeight: 6,//图例图标的高度
          itemWidth:7,//图例图标的宽度
          itemGap: 25,//图例图标与文字间的间距
          icon: "circle",//设置图例图标的形状为实心圆，这个不填，默认是矩形
          textStyle: {
           fontSize: 12,//图例文字字体大小
           color: '#8A90A3'//图例文字颜色
          },

    },
    series: [
      // 图表的位置
      {
        type: 'pie',
        data:data,
       
       align:'top',
        showEmptyCircle:true,
        radius: ['28%', '52%'],
        // 各扇形颜色
        color:['#21CCFF','#104AED','#313CA9','#249EFF'],
    //  每个数据外围是否展示内容
      label: {
        show: true,
        normal: {
          position:'outer',
         
         
         // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
          // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
          // {a}指series.name  {b}指series.data的name
          // {c}指series.data的value  {d}%指这一部分占总数的百分比
          formatter: '{c}'
        },
      },
      labelLine: {
      show:true,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '15',
          fontWeight: 'bold',

        }
      },
   } ]
  }
}