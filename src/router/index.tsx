import { lazy, Suspense, ReactNode, Children } from 'react'
import { Navigate } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
// 组件
import { Outlet } from 'react-router-dom'
import Layout from '@/components/Layout'
import Error from '@/pages/error/404'
import NoticeManagement from '@/pages/instrument-panel/deparment/index'
const Login = lazy(() => import('@/pages/login'))
import InstrumentPanel from '@/pages/instrument-panel'
import CustomerManagement from '@/pages/customer-management'
import OrderManagement from '@/pages/order-management'
import NoticeTable from '@/pages/instrument-panel/noticeTable/index'
import NoticeDetail from '@/pages/instrument-panel/noticeTable/noticeDetail/noticeDetail'
import noticeDetail from '@/pages/instrument-panel/noticeTable/noticeDetail/noticeDetail'
import AddNotice from '@/pages/instrument-panel/noticeTable/addNotice/addNotice'
import NoticeKinds from '@/pages/instrument-panel/noticeTable/noticeKinds/noticeKinds'
import AddNoticeKinds from '@/pages/instrument-panel/noticeTable/noticeKinds/addNoticeKinds/addNoticeKinds'
import AddDepartment from '@/pages/instrument-panel/deparment/addDepartment/addDepartment'
import EditDepartment from '@/pages/instrument-panel/deparment/editDepartment/EditDepartment'
import ConfigDepartment from '@/pages/instrument-panel/deparment/configDepartment/ConfigDepartment'
import AddDepartRole from '@/pages/instrument-panel/deparment/configDepartment/addDepartRole/AddDepartRole'
import EditDepartRole from '@/pages/instrument-panel/deparment/configDepartment/editDepartRole/EditDepartRole'
import DepartRolePrivileges from '@/pages/instrument-panel/deparment/configDepartment/departRolePrivileges/DepartRolePrivileges'
import AccountManage from '@/pages/instrument-panel/accountManagement/index'
import AddAccountManage from '@/pages/instrument-panel/accountManagement/addAccountManagement/addAccountManage'
import EditAccountManage from '@/pages/instrument-panel/accountManagement/editAccountManage/editAccountManage'
import WatchAccountManage from '@/pages/instrument-panel/accountManagement/watchAccountManage/watchAccountManage'
 

// 组件懒加载
const lazyload = (children: ReactNode): ReactNode => {
  return <Suspense>{children}</Suspense>
}

// 免登录名单
export const whiteList = ['/login']

export interface Router {
  show?: boolean
  path: string
  element: JSX.Element
  name: string
  open?: boolean
  icon?: JSX.Element | string
  side?:boolean
  // activeIcon?: JSX.Element | string
  children?: Array<{
    index?: boolean
    path: string
    element: ReactNode
    name: string
    icon?: JSX.Element | string
    side?:boolean
    show?: boolean
  }>
}

// 菜单
// menuRouter的chlidren第一项为一级路由main部分默认显示的页面
// 默认显示的页面一定要配置在子路由的第一项不参与侧边栏的渲染
export const menuRouter: Router[] = [
  // {
  //   path: '/integrated-management',
  //   element: <Layout />,
  //   name: '综合管理',
  //   icon: <SvgIcon svgName="data_management" />,
  //   children: [
  //     {
  //       index: true,
  //       path: 'work-order',
  //       element: lazyload(<WorkOrder />),
  //       name: '工单管理',
  //       icon: <SvgIcon svgName="data_statistic" />,
  //     },
  //     {
  //       path: 'early-warning',
  //       element: lazyload(<WorkOrder />),
  //       name: '预警管理',
  //       icon: <SvgIcon svgName="data_list" />,
  //     },
  //     {
  //       path: 'analyse',
  //       element: lazyload(<WorkOrder />),
  //       name: '文档管理',
  //       icon: <SvgIcon svgName="data_list" />,
  //     },
  //   ],
  // },
  // {
  //   path: '/system-management',
  //   element: <Layout />,
  //   name: '系统管理',
  //   icon: <SvgIcon svgName="algorithm_icon" />,
  //   children: [
  //     {
  //       path: 'user',
  //       element: lazyload(<User />),
  //       name: '用户管理',
  //       icon: <SvgIcon svgName="original_data" />,
  //     },
  //     {
  //       path: 'role',
  //       element: lazyload(<Role />),
  //       name: '角色管理',
  //       icon: <SvgIcon svgName="label_data" />,
  //     },
  //     {
  //       path: 'area',
  //       element: lazyload(<Area />),
  //       name: '区域管理',
  //       icon: <SvgIcon svgName="label_data" />,
  //     },
  //   ],
  // },

  {
    path: '/instrument-panel',
    element: (<Layout></Layout>),
    name: '工作台',
    side:true,
    icon: <SvgIcon svgName="Frame" svgClass="icon" />,
    // activeIcon: <SvgIcon svgName="Frame" svgClass="icon" />,
    children: [

      {

        path: 'notice-order',
        element: lazyload(<InstrumentPanel />),
        name: '首页',
        side:false,
        icon: <SvgIcon svgName="data_statistic" />,
      },
      {
        path: 'early-warning',
        element: lazyload(<NoticeTable />),
        name: '公告管理',
        side:true,
        icon: <SvgIcon svgName="data_list" />,
      },
      {
        path: 'department',
        element: lazyload(<NoticeManagement />),
        name: '部门管理',
        side:true,
        icon: <SvgIcon svgName="data_list" />,
      },
      {
        path: 'accountManagement',
        element: lazyload(<AccountManage />),
        name: '账号管理',
        side:true,
        icon: <SvgIcon svgName="data_list" />,
      },
    ],
  },

  {
    path: '/customer-management',
    name:'部门管理',
    side:false,
    element: (
      <Layout></Layout>
    ),
    icon: <SvgIcon svgName="FrameTwo" svgClass="icon" />,
    
    // activeIcon: <SvgIcon svgName="FrameTwo" svgClass="icon" />,
    children: [{
      path: 'customerIndex',
      element: lazyload(<CustomerManagement />),
      name: '部门管理首页',
      icon: <SvgIcon svgName="customer_menu_icon" svgClass="icon" />,

    },
    {
      path: 'early',
      element: lazyload(<NoticeManagement />),
      name: '预警管理',
      icon: <SvgIcon svgName="data_list" />,
    },
    ]
  },
  {
    path: '/customer-man',
    element: (
      <Layout></Layout>
    ),
    name: '政务大屏',
    icon: <SvgIcon svgName="FrameTwo" svgClass="icon" />,
    // activeIcon: <SvgIcon svgName="FrameTwo" svgClass="icon" />,
    children: [{
      path: 'custIndex',
      element: lazyload(<OrderManagement />),
      name: '政务大屏首页',
      icon: <SvgIcon svgName="customer_menu_icon" svgClass="icon" />,

    },
    {
      path: 'ear',
      element: lazyload(<NoticeManagement />),
      name: '预警管理',
      icon: <SvgIcon svgName="data_list" />,
    },]}
  // {
  //   path: '/order-management',
  //   element: (

  //       <OrderManagement />

  //   ),
  //   name: '订单管理',
  //   icon: <SvgIcon svgName="order_menu_icon" svgClass="icon" />,
  // },
]

// 一般路由
 const router = [
  {
    path: '/',
  name:'工作台',
    element: (<Navigate to={'/instrument-panel/notice-order'}></Navigate>),
  },
  {
    path: '/instrument-panel',
    name: '工作台首页',
    element: (<Navigate to={'/instrument-panel/notice-order'}></Navigate>),
  },
  {
    path: '/customer-man',
    name:'公告管理',
    element: ( <Navigate to={'/customer-man/custIndex'}></Navigate>),
  },
  {
    path: '/instrument-panel/early-warning/detail',
    name: '公告查看',
    element:lazyload( <Layout><NoticeDetail></NoticeDetail></Layout>),
  },
  {
    path: '/instrument-panel/early-warning/addNotice',
    name: '新增公告',
    element:lazyload( <Layout><AddNotice></AddNotice></Layout>),
  },
  {
    path: '/instrument-panel/early-warning/noticeKinds',
    name: '公告配置',
    element:lazyload( <Layout><NoticeKinds></NoticeKinds></Layout>),
  },
  {
    path: '/instrument-panel/early-warning/noticeKinds/addNoticeKinds',
    name: '公告类型新增',
    element:lazyload( <Layout><AddNoticeKinds></AddNoticeKinds></Layout>),
  },
  {
    path: '/instrument-panel/department/addDepartment',
    name: '新增部门',
    element:lazyload( <Layout><AddDepartment></AddDepartment></Layout>),
  },
  {
    path: '/instrument-panel/department/editDepartment',
    name: '部门编辑',
    element:lazyload( <Layout><EditDepartment></EditDepartment></Layout>),
  },
  {
    path: '/instrument-panel/department/configDepartment',
    name: '部门区域划分配置',
    element:lazyload( <Layout><ConfigDepartment></ConfigDepartment></Layout>),
  },
  {
    path: '/instrument-panel/department/configDepartment/addDepartRole',
    name: '角色新增',
    element:lazyload(   <Layout><AddDepartRole></AddDepartRole></Layout>),
  },
  {
    path: '/instrument-panel/department/configDepartment/editDepartRole',
    name: '角色编辑',
    element:lazyload(   <Layout><EditDepartRole></EditDepartRole></Layout>),
  },
  {
    path: '/instrument-panel/department/configDepartment/departRolePrivileges',
    name: '角色权限',
    element:lazyload(   <Layout><DepartRolePrivileges></DepartRolePrivileges></Layout>),
  },
  {
    path: '/instrument-panel/accountManagement/addAccountManage',
    name: '新增账号',
    element:lazyload(   <Layout><AddAccountManage></AddAccountManage></Layout>),
  },
  {
    path: '/instrument-panel/accountManagement/editAccountManage',
    name: '编辑账号',
    element:lazyload(   <Layout><EditAccountManage></EditAccountManage></Layout>),
  },
  {
    path: '/instrument-panel/accountManagement/watchAccountManage',
    name: '操作记录',
    element:lazyload(   <Layout><WatchAccountManage ></WatchAccountManage ></Layout>),
  },
  {
    path: '/login',
    name:'登录',
    element: lazyload(<Login />),
  },
  {
    path: '*',
    name:'访问出错',
    element: lazyload(<Error />),
  },
]

export default router.concat(menuRouter)
