import React, { useContext, useState, useEffect } from "react";
import SvgIcon from '@/components/SvgIcon'
import { Menu, Dropdown, Badge } from "antd";
import { message } from '@/assets/index';
import { useNavigate, useLocation } from 'react-router-dom'
import { MenuContext } from "../utils/context";
import Header from '@/components/Header'
const GlobalHeader = (props: any) => {
  let navigate = useNavigate()
  const context = useContext(MenuContext);
  const [selectedItem, setSelectedItem] = useState<any>()
  const [selectedMoremenu, setSelectedMoremenu] = useState<any>()
  const [newsCount, setNewsCount] = useState(0);
  // 获取pathname
  let location = useLocation()
  // console.log(location)
  const { pathname } = location
  // console.log('pathname=============', pathname)
  // 消息列表 切换页面
  const onNewsClick = (key) => {
    // console.log('key');
  };
  const userInfo = (
    <div style={{ padding: "8px" }} className="FBH FBAC FBJC">
      <ul className="cbd-header-menu FBH">
        <li className="FBV FBJC FBAC menu-user">
          <div
            className="header-extra-node"
            onClick={() => onNewsClick("/msgnews")}
          >
            <Badge count={newsCount}>
              <img src={message} style={{ width: 16, height: 17 }} />
            </Badge>
          </div>
          <span className="title">消息</span>
          {/* 消息弹层 */}
          {/* <MailDetail callback={(f) => setNewsCount(f.length || 0)} /> */}
        </li>
        <li className="FBH FBJC FBAC" style={{ padding: "0 12px" }}>
          {/* <Dropdown overlay={usermenu}>
            <div
              className="cbd-header-my FBJC FBAC ds-f"
              style={{ paddingTop: 1 }}
            >
              <img src={exit} style={{ width: 16, height: 17 }} />
              <span className="title pl-6" style={{ fontSize: 14 }}>
                {username || ""}
              </span>
            </div>
          </Dropdown> */}
        </li>
      </ul>
    </div>
  );
  useEffect(() => {
    // if (pathname === "/msgnews") {
    //   props.handleHideMenu();
    //   setSelectedItem(pathname);
    //   return;
    // }

    // if (pathname === '/news') {
    //   props.handleHideMenu()
    //   setSelectedItem(pathname)
    //   return
    // 
    if (pathname === '/') {

      props.handlePyMenu()
      setSelectedItem('/')
      return
    }

    if (context?.menu?.length > 0) {
      // 如果pathname等于目录路径重定向到目录下的第一个

      const result = context.menu.filter(p => {
        return p.uri == pathname
      })

      if (result.length > 0) {
        // props.handleMcMenu();
        context.toggleMenu(result[0] || {});
        // console.log('result[0]', result[0].uri);

        setSelectedItem(result[0].uri);
        handleRedirectPath(result[0]?.childNodes[0])
        return
      }
    }
  }, [pathname, context.menu])
  const handleRedirectPath = (p) => {
    if (p && p.childNodes && p.childNodes.length > 0) {
      return handleRedirectPath(p.childNodes[0])
    } else {
      navigate(p.uri);
    }
  }

  return (
    // <header
    //   className="FBH"
    //   style={{
    //     backgroundImage: "linear-gradient(135deg, #2859CE 0%, #1E46B0 100%, #1A47B0 100%)",
    //     boxShadow: "0 2px 20px 0 rgba(2,27,93,0.20)", zIndex: 10
    //   }}
    // >
    <Header />
    // </header>
  )


}

export default GlobalHeader;