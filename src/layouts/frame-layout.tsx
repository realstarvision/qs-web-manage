import React, { useState } from 'react';
import Framework from '@/layouts/framework';
import { getParams } from '@/utils/tool';
import { FrameContext } from "@/utils/context";
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Authorized from '@/utils/authorized'
import { ConfigProvider } from 'antd'
import { useLocation } from 'react-router-dom'
/**
 * 链接上添加noFrame参数，项目就会无侧边栏和顶部头
 */
const FrameLayout = (props: any) => {
  let urlParams = getParams();
  const { children } = props
  const [showTool, setShowTool] = useState(false)
  const handleCk = (k: any) => {
    setShowTool(k)
    if (k) {
      sessionStorage.setItem('showTool', k)
    }
  }
  let location = useLocation()
  const { pathname } = location
  const render = () => {
    if (urlParams.noFrame || pathname === '/login') {
      return <div style={{ height: '100%', overflow: 'auto' }}>{children}</div>
    } else {
      return <Authorized><Framework>{children}</Framework></Authorized>
    }
  }
  return (
    <ConfigProvider locale={zhCN}>
      <FrameContext.Provider value={{ noFrame: !!urlParams.noFrame, showTool, toggleTool: handleCk }}>
        {render()}
      </FrameContext.Provider>
    </ConfigProvider>
  );
}

export default FrameLayout;