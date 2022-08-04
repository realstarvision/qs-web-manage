import { lazy, Suspense, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Assignment, Mood } from '@mui/icons-material'
// import { DataManagement } from '@/components/SvgIcon'
import SvgIcon from '@/components/SvgIcon'
// 组件
import Layout from '@/components/Layout'
import Log from '@/pages/log'
const Login = lazy(() => import('@/pages/login'))
const DataStatistics = lazy(() => import('@/pages/data-management/data-statistics'))
const DataList = lazy(() => import('@/pages/data-management/data-list'))
const OriginalCountSet = lazy(() => import('@/pages/algorithm-management/original-countSet'))
const LabelCountSet = lazy(() => import('@/pages/algorithm-management/label-countSet'))
const Role = lazy(() => import('@/pages/authority/role'))
const Error = lazy(() => import('../pages/error/404'))

// 组件懒加载
const lazyload = (children: ReactNode): ReactNode => {
  return <Suspense>{children}</Suspense>
}

// 免登录名单
export const whiteList = ['/login']

export interface Router {
  path: string
  element: JSX.Element
  name: string
  open?: boolean
  icon?: JSX.Element | string
  children?: (
    | {
        index: boolean
        path: string
        element: ReactNode
        name: string
        icon?: JSX.Element | string
      }
    | {
        path: string
        element: ReactNode
        name: string
        index?: undefined
        icon?: JSX.Element | string
      }
  )[]
}

// 菜单
export const menuRouter: Router[] = [
  {
    path: '/data',
    element: <Layout />,
    name: '数据管理',
    icon: <SvgIcon svgName="data_management" />,
    children: [
      {
        index: true,
        path: 'data-statistics',
        element: lazyload(<DataStatistics />),
        name: '数据统计',
        icon: <SvgIcon svgName="data_statistic" />,
      },
      {
        path: 'data-list',
        element: lazyload(<DataList />),
        name: '数据列表',
        icon: <SvgIcon svgName="data_list" />,
      },
    ],
  },
  {
    path: '/algorithm',
    element: <Layout />,
    name: '算法管理',
    icon: <SvgIcon svgName="algorithm_icon" />,
    children: [
      {
        path: 'original-countSet',
        element: lazyload(<OriginalCountSet />),
        name: '原始数据集',
        icon: <SvgIcon svgName="original_data" />,
      },
      {
        path: 'label-countSet',
        element: lazyload(<LabelCountSet />),
        name: '标注数据集',
        icon: <SvgIcon svgName="label_data" />,
      },
    ],
  },
  // {
  //   path: '/authority',
  //   element: <Layout />,
  //   name: '权限管理',
  //   icon: <SvgIcon svgName="dashboard_icon" />,
  //   children: [
  //     {
  //       path: 'role',
  //       element: lazyload(<Role />),
  //       name: '角色管理',
  //       icon: <Mood />,
  //     },
  //     {
  //       path: 'log',
  //       element: lazyload(<Log />),
  //       name: '操作日志',
  //       icon: <Mood />,
  //     },
  //   ],
  // },
  {
    path: '/log',
    element: (
      <Layout>
        <Log />
      </Layout>
    ),
    name: '操作日志',
    icon: <SvgIcon svgName="dashboard_icon" />,
  },
]

// 一般路由
const router = [
  {
    path: '/',
    element: <Navigate to="/data/data-statistics"></Navigate>,
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
