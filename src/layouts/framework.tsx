import React, { Component, useState, useEffect, Children } from 'react'
import { MenuContext, FrameContext } from '../utils/context'
// 配置政策
import GlobalHeader from './global-header'
import Sidebar from './sidebar'
import './framework.scss'
const Framework = (props) => {
  // 全部菜单
  const [pageMenus, setPageMenus] = useState<any>([])
  //选择菜单
  const [selectmenu, setSelectmenu] = useState<any>([])
  //
  const [visible, setVisible] = useState<any>(false)
  //未读的信息数量
  const [newsCount, setNewsCount] = useState<any>(undefined)
  const [menuVisible, setMenuVisible] = useState<any>(true)
  const onLogout = () => {
    sessionStorage.removeItem('accountInfo-qqzx')
    window.location.reload()
  }
  // 调接口获取菜单栏的menus权限
  const getPageMenus = () => {
    setPageMenus([
      {
        name: '工作台',
        uri: '/instrument-panel/notice-order',
        id: 50,
        type: 0,
        iconUrl: null,
        childNodes: [
          {
            name: '工单处理中心',
            uri: '/instrument-panel/notice-order',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
          {
            name: '公告管理',
            uri: '/instrument-panel/early-warning',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
          {
            name: '部门管理',
            uri: '/instrument-panel/department',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
          {
            name: '账号管理',
            uri: '/instrument-panel/accountManagement',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
        ],
      },
      {
        name: '工单管理',
        uri: '/instrument-panel/work-order',
        id: 38,
        type: 1,
        iconUrl: null,
        childNodes: [
          {
            name: '工单管理',
            uri: '/instrument-panel/work-order',
            id: 39,
            type: 2,
            iconUrl: null,
            childNodes: null,
          },
          {
            name: '自动派单',
            uri: '/instrument-panel/automatic-order-delivery',
            id: 40,
            type: 2,
            iconUrl: null,
            childNodes: null,
          },
        ],
      },
      {
        name: '部门',
        uri: null,
        id: 50,
        type: 0,
        iconUrl: null,
        childNodes: [
          {
            name: '部门管理',
            uri: '/customer-management/customerIndex',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
          {
            name: '预警管理',
            uri: '/customer-management/early',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
        ],
      },
      {
        name: '政务',
        uri: null,
        id: 50,
        type: 0,
        iconUrl: null,
        childNodes: [
          {
            name: '政务大屏',
            uri: '/customer-man/custIndex',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
          {
            name: '预警管理',
            uri: '/customer-man/ear',
            id: 38,
            type: 1,
            iconUrl: null,
            childNodes: null,
          },
        ],
      },
    ])
  }
  // 打开 左侧目录 弹窗
  const showDrawer = () => {
    setVisible(!visible)
  }
  // 获取消息的未读数量
  const getUnReadCount = () => {
    // getUnreadMessageNumberApi({}).then((res) => {
    //   if (res.success) {
    //     this.setState({
    //       newsCount: res.data,
    //     });
    //   } else {
    //     this.setState({
    //       newsCount: undefined,
    //     });
    //   }
    // });
  }
  useEffect(() => {
    // pageMenus(
    //   [
    //     {
    //       path: '/notice-order',
    //       name: '工作台',
    //       children: [
    //         {
    //           name: '公告管理',
    //           path: '/early-warning',
    //         },
    //         {
    //           name: '部门管理',
    //           path: '/department',
    //         },
    //         {
    //           name: '账号管理',
    //           path: '/accountManagement',
    //         }
    //       ]
    //     },
    //     {
    //       path: '/customerIndex',
    //       name: '部门管理',
    //       children: [
    //         {
    //           path: '/early',
    //           name: '预警管理',
    //         }
    //       ]
    //     },
    //     {
    //       path: '/custIndex',
    //       name: '财务大屏',
    //       children: [
    //         {
    //           path: '/ear',
    //           name: '预警管理',
    //         }
    //       ]
    //     }
    //     // {
    //     //   path: '/policy-manage',
    //     //   name: '应用管理',
    //     //   children: [
    //     //     {
    //     //       name: '应用名称',
    //     //       path: '/policy-manage/policy-config/:policyCode/:policyId',
    //     //       hideInMenu: true,
    //     //       isHiddenMenu: true,
    //     //       children: [{
    //     //         name: '上架申请',
    //     //         path: '/policy-manage/publish-release/:policyCode',
    //     //         hideInMenu: true,
    //     //         isHiddenMenu: true
    //     //       }, {
    //     //         name: 'API授权',
    //     //         path: '/policy-manage/api-config/:policyCode/apply',
    //     //         hideInMenu: true,
    //     //       }]
    //     //     },
    //     //     {
    //     //       name: '支付配置',
    //     //       path: '/payway-config',
    //     //       hideInMenu: true,
    //     //       isHiddenMenu: false
    //     //     },
    //     //     {
    //     //       name: '认证设置',
    //     //       path: '/policy-manage/certification-config',
    //     //       hideInMenu: true,
    //     //     },
    //     //     {
    //     //       name: '密钥',
    //     //       path: '/policy-manage/secret-config',
    //     //       hideInMenu: true,
    //     //     },
    //     //     // {
    //     //     //   name: 'API资源',
    //     //     //   path: '/policy-manage/api-config/:policyCode',
    //     //     //   hideInMenu: true,
    //     //     //   children: [
    //     //     //     {
    //     //     //       name: 'API授权',
    //     //     //       path: '/policy-manage/api-config/:policyCode/apply',
    //     //     //       hideInMenu: true,
    //     //     //     }
    //     //     //   ]
    //     //     // },

    //     //   ]
    //     // },
    //   ])
    getPageMenus()
    // getUnReadCount()
  }, [])
  // const userMenu = (
  //   <Menu>
  //     <Menu.Item key="logout" onClick={this.onLogout}>
  //       <Icon type="logout" style={{ marginRight: 8 }} />
  //       退出登录
  //     </Menu.Item>
  //   </Menu>
  // );
  const userInfo = (
    <div>
      <div className="header-right">
        <a style={{ marginLeft: 20 }} href="http://10.0.251.88:30051/table-list?setToken=true" target="_blank">
          直达直达
        </a>
      </div>
    </div>
  )
  const RenderSider = () => {
    return (
      <>
        <div className="sidebar-menu" style={{ height: document.body.scrollHeight - 56, position: 'relative' }}>
          <Sidebar />
        </div>
        <div
          className="FB1 FBV FLVH100"
          style={{
            backgroundColor: '#f6f6f6',
            overflow: 'auto',
            padding: '16px',
            height: window.innerHeight - 56,
          }}
        >
          {props.children}
        </div>
      </>
    )
  }
  return (
    <>
      <MenuContext.Provider
        value={{
          menu: pageMenus,
          selectmenu: selectmenu,
          toggleMenu: (selectmenu) => {
            setSelectmenu({ selectmenu })
          },
        }}
      >
        {/* 左侧目录栏 id是给Drawer定位用的，请勿修改和删除 */}
        <div className="cbd-framework cbd-gov-framework FBV">
          <GlobalHeader
            onListClick={showDrawer}
            newsCount={newsCount}
            // showQuestions={hasQuestions}
            handleHideMenu={() => setMenuVisible(false)} // 隐藏全部菜单
            handlePyMenu={() => setMenuVisible(true)} // isVisbIframe=true显示政策菜单false显示业务菜单
            handleMcMenu={() => setMenuVisible(true)}
          />
          <div className="FBH FB1" id="qinqing-framework">
            {/* 左侧政策目录栏 */}
            <FrameContext.Consumer>{RenderSider}</FrameContext.Consumer>

            {/* {this.renderContent()} */}
          </div>
        </div>
      </MenuContext.Provider>
    </>
  )
}

export default Framework
