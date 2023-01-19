import { lazy, Suspense, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
// 组件
import Layout from '@/components/Layout'
import Error from '@/pages/error/404'
const Login = lazy(() => import('@/pages/login'))
import InstrumentPanel from '@/pages/instrument-panel'
import CustomerManagement from '@/pages/customer-management'
import OrderManagement from '@/pages/order-management'

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
  children?: Array<{
    index?: boolean
    path: string
    element: ReactNode
    name: string
    icon?: JSX.Element | string
    show?: boolean
  }>
}

// 菜单
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
  //       element: lazyload(<EarlyWarning />),
  //       name: '预警管理',
  //       icon: <SvgIcon svgName="data_list" />,
  //     },
  //     {
  //       path: 'analyse',
  //       element: lazyload(<Analyse />),
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
    element: (
      <Layout>
        <InstrumentPanel />
      </Layout>
    ),
    name: '仪表盘',
    icon: <SvgIcon svgName="instrument_panel_menu_icon" svgClass="icon" />,
  },
  {
    path: '/customer-management',
    element: (
      <Layout>
        <CustomerManagement />
      </Layout>
    ),
    name: '客户管理',
    icon: <SvgIcon svgName="customer_menu_icon" svgClass="icon" />,
  },
  {
    path: '/order-management',
    element: (
      <Layout>
        <OrderManagement />
      </Layout>
    ),
    name: '订单管理',
    icon: <SvgIcon svgName="order_menu_icon" svgClass="icon" />,
  },
]

// 一般路由
const router = [
  {
    path: '/',
    element: <Navigate to="/instrument-panel"></Navigate>,
  },
  {
    path: '/login',
    element: lazyload(<Login />),
  },
  {
    path: '*',
    element: lazyload(<Error />),
  },
]

export default router.concat(menuRouter)
