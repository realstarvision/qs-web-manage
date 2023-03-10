import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './noticeDetail.scss'
import SvgIcon from '@/components/SvgIcon'
import BreadComPon from '@/components/AntDBread/index'

// 内容区数据
const detailText = [{
  'mm': '公告标题',
  'aa': 'dsAda'
},
{
  'mm': '公告区域',
  'aa': 'dsBda'
},
{
  'mm': '隶属板块',
  'aa': 'dsCda '
},
{
  'mm': '公告类型',
  'aa': 'dsDda'
},
{
  'mm': '正文内容',
  'aa': 'dsEda'
},

]
// 面包屑
const breadCrumDetail = {
  '/': '首页',
  '/instrument-panel': '工作台',
  '/instrument-panel/early-warning': '公告管理',
  '/instrument-panel/early-warning/detail': '公告查看'
}
export default function NoticeDetail() {
  // 接收首页点击单条广告跳转后传递过来的参数
  const [noticeDetailSearch, setNoticeDetailSearch] = useSearchParams()
  const getDetailId = noticeDetailSearch.get('id')

  const [noticeDetailNum, setNoticeDetailNum] = useState({
    'ul':'src/assets/image/item1.jpg',
    'name':'张三',
    'day':'2023-2-20',
    'time':'14:20'
  })

  useEffect(() => {
    // 请求数据
    // getNoticeDetailNmFun(getDetailId).then((data)=>{

    //     setNoticeDetailNum(data)

    // })

    console.log(getDetailId)
  }, [getDetailId])
  return (
    // 最外层盒子
    <div className='detailBox'>
    
      {/* 面包屑 */}
      <div className='detailBraBox'>
        
      <BreadComPon breadcrumbNameMap={breadCrumDetail}></BreadComPon>
      </div>
      {/* 内容区 */}
      <div className='detailMainBox'>
        {/* 内容区上部分 */}
        <div className='detailTopBox' >
          {/* 内容区标题 */}
          <div className='detailTitle'>公告</div>
          {/* 内容区内容盒子 */}
          <div className='detailTopMainBox'>
            {/* 数据渲染 */}
            <div>{detailText.map((item, index) => {
              return <>
                <p className='detailTopMainTextBox' key={item.aa}>
                  <span className='detailTopMainTextLeft'>{item.mm}</span>
                  <span>{item.aa}</span>
                </p>

              </>

            })}</div>
            <div className='detailTopMainImg'>
              <div className='detailTopMainImgSvg'>
                {false?
                 <img className='imgBox' src={noticeDetailNum.ul} alt="" /> 
                 : <SvgIcon svgName='DetailAge' svgClass='detailImgSvg'></SvgIcon>}
              </div>
            </div>
          </div>

        </div>
        {/* 底部 */}
        <div className='detailFooterBox'>

          <span className='detailFooterLeft'>{noticeDetailNum.name}</span>
          <span>{noticeDetailNum.day}&nbsp;&nbsp;{noticeDetailNum.time}</span>
      



        </div>
      </div>

    </div>
  )
}
