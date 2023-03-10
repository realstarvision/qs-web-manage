import React ,{useEffect, useState,useRef} from 'react'
import './Notice.scss'
import {Link } from 'react-router-dom'
import { Box } from '@material-ui/core'



function App() {
const [list] = useState([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]);

const [isScrolle, setIsScrolle] = useState<boolean>(true);
// 用于跳转至查看公告页面部分组件不显示
const[historyNum,setHistoryNum]=useState({removeNoticeCompon:'removeNoticeCompon'})
// 滚动速度，值越小，滚动越快
const speed = 30;
const warper:React.MutableRefObject<Element> = useRef();
const childDom1:React.MutableRefObject<Element> = useRef();
const childDom2:React.MutableRefObject<Element> = useRef();

// 开始滚动
useEffect(() => {

console.log(childDom2.current)
// console.log(typeof(childDom2.current.innerHTML)) ---string
// console.log(childDom2.current.innerHTML.length)
// 多拷贝一层，让它无缝滚动 +=让第二个框内的数据无限 ，实现无限滚动
childDom2.current.innerHTML.length<8?childDom2.current.innerHTML+= childDom1.current.innerHTML:childDom2.current.innerHTML= childDom1.current.innerHTML
// 判断盒子2的长度过长的话就让他回复原样
childDom2.current.innerHTML.length>30?childDom2.current.innerHTML= childDom1.current.innerHTML:childDom2.current.innerHTML+= childDom1.current.innerHTML

let timer;

if (isScrolle) {
timer = setInterval(
() =>
warper.current.scrollTop >= childDom1.current.scrollHeight
? (warper.current.scrollTop = 0)
: warper.current.scrollTop++,
speed
);
}
return () => {
clearTimeout(timer);
};
}, [isScrolle]);

const hoverHandler = (flag) => setIsScrolle(flag);

return (

<Box  style={{overflow:'hidden',height:'210px'}}>
    <Box>
         <Box className="noticeBoxText">
    <span>
      公告
    </span>
<Link to={`/instrument-panel/early-warning?id=${historyNum.removeNoticeCompon}`} className='navBox'>查看更多</Link>
  </Box >
  
  <Box className='parent' ref={warper} >
<Box className='child' ref={childDom1} >
{list.map((item,index) => (
    <Box className='mapBox'
    key={item}
onMouseOver={() => hoverHandler(false)}
onMouseLeave={() => hoverHandler(true)}>
  {/* 点击产品详情跳转至产品详情页并传递参数 */}
  <Link to={`/instrument-panel/early-warning/detail?id=${index}`} className="noticeLink" >
<Box className='titleBox'>洪涝</Box>
<Box className='textBox'>{item}</Box>
</Link>
</Box>

))}
</Box>
<Box className='child' ref={childDom2}></Box>
</Box>
  </Box>
  </Box>
);
}
export default App;
// 首页公告栏与公告管理页面的实现逻辑
//  首先:点击查看更多,跳转至公告管理页面
// (与原公告管理共用一个页面)
// 实现逻辑:
// 1: 路由跳转时传递一个参数,进入公告管理页面拿到这个值 link传递  useparmas取值
// 2: 同页面显示不同功能: 
//   2-1 识别点击查看更多跳转传递的参数,使用三目运算判断,如果这个值存在那么说明是首页查看更多跳转过来的
//   2-1-1 
//  从点击更多跳转过来的对应的显示区域:
//   1:搜索框减去一个
  // 2:列表第一列的选择按钮消失
  // 3:列表最后一列的显示操作按钮变化
  // 4: 列表的数据只显示已发布,对应的列表头部的筛选功能消失
  // 5: 最后一页操作列表的实现思路:
  //  如果时从首页跳转过去的,那么传递参数,进入页面判断参数是否存在,如果存在则只显示查看功能
    //  ,如果不是则说明时公告管理页面则根据状态来判定显示什么内容: 
    // 如果是已发布则显示查看和删除
    // 如果是未发布则显示操作和删除
    // 如果是已删除则分情况
        //   已发布的删除后 那么显示的操作变为-，
        // 操作：
        // 具体看后端的数据，如果做了点击已发布删除的接口，那么点击删除，请求数据，判断状态码，替换组件
          //  如果没有做接口，则创建一个状态为true，状态做三目运算去识别显示的内容，点击删除，修改状态码，并调接口传递至服务器
        //   未发布的删除后，则数据移除，请求数据，重新渲染






   