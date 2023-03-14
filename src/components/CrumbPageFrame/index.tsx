import React from 'react'
import Crumb from '@/components/AntDBread/index'
import s from './s.module.scss'

export default function index({ breadcrumbNameMap, children, title = '' }) {
  return (
    <div className={s.container}>
      <div className={s.crumb}>
        <Crumb breadcrumbNameMap={breadcrumbNameMap}></Crumb>
      </div>
      <div className={s.main}>
        <div className={s.title}>{title}</div>
        <div className={s.children}>{children}</div>
      </div>
    </div>
  )
}
