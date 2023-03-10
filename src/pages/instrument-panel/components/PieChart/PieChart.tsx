import React,{useEffect, useRef,useState} from 'react'

import { Box,  Paper } from '@mui/material'
import './PieChart.scss'

import orderDataPieOptions from './pieOption'
import PieEChart from '@/components/Echarts'
import PieTable from '../pieTable/pieTable'

export default function PieChart() {
  
  // 折线图数据列表
  const [orderPieCharList, setOrderPieCharList] = useState([])
  return (
  
    <Box className='instrumentBottomBox'>
        <Paper>
    <Box className='pieChartBox'>
   
    <Box className='TextBox'>窨井盖设备告警数量统计</Box>
 
 <PieEChart  options={ orderDataPieOptions(orderPieCharList)}></PieEChart>
 
    </Box>
    </Paper>
    <Box className='tableBox'>
      <Paper className='tablePaper'> 
        <Box className='titleBox'>窨井盖设备告警详情统计</Box> 
        <PieTable></PieTable>
        
        </Paper>
  

    </Box>
    
 </Box>

  )
}

