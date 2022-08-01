// 内存环形图标
export function memoryOption(data: number) {
  let maxValue = 100 //进度条最大值
  let value = data * 100
  return {
    //环形中间文字
    graphic: [
      //第一行文字
      //内容 + 位置
      {
        type: 'text',
        left: 'center',
        top: '45%',
        style: {
          //value当前进度
          text: value + '%',
          textAlign: 'center',
          fill: '#000',
          fontSize: 16,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['70%', '64%'], //['外圆大小', '内圆大小']
        center: ['50%', '50%'], //圆心位置['左右'， '上下']
        hoverAnimation: false, //取消鼠标悬停动画
        animationEasing: 'cubicOut', //设置动画缓动效果
        //取消显示饼图自带数据线条
        labelLine: {
          normal: {
            show: false,
          },
        },
        //增加阴影效果
        itemStyle: {
          normal: {
            shadowBlur: 200,
            shadowColor: 'rgba(44, 196, 196, 0.8)',
          },
        },
        data: [
          //value当前进度 + 颜色
          {
            value: value,
            itemStyle: {
              normal: {
                color: '#73DEB3',
              },
            },
          },
          //(maxValue进度条最大值 - value当前进度) + 颜色
          {
            value: maxValue - value,
            itemStyle: {
              normal: {
                color: '#ddd',
              },
            },
          },
        ],
      },
    ],
  }
}