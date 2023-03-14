import React from 'react'
import './addNoticeKinds.scss'
import { Button } from '@mui/material'
export default function addNoticeKinds() {
  return (
    // 最外层盒子
    <div className="addNoticeKindsBox">
      {/* 面包屑 */}
      <div className="addNoticeKindsBra">面包屑</div>
      {/* 内容区 */}
      <div className="addNoticeKindsMain">
        <div className="addNoticeKindsTitle">公告类型新增</div>
        <div className="addNoticeKindsStateBox">hi</div>
      </div>

      {/* 底部 */}
      <div className="addNoticeKindsFooter">
        <Button className="addNoticeKindsFooterButton">保存</Button>
      </div>
    </div>
  )
}
