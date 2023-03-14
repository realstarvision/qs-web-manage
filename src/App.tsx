import React, { Component } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// import Framework from './layouts/framework'
import FrameLayout from './layouts/frame-layout'

import NoticeOrder from './pages/instrument-panel/index'
import NoticeTable from './pages/instrument-panel/noticeTable'
import Deparment from './pages/instrument-panel/deparment'
import AccountManagement from './pages/instrument-panel/accountManagement'
import CustomerManagement from './pages/customer-management'
import EarlyWarning from './pages/instrument-panel'
import CustIndex from './pages/order-management'
import Ear from './pages/instrument-panel/deparment'
import Login from './pages/login'
import './App.scss'
const App = () => {

  return (
    <Router>
      <FrameLayout>
        <Routes>
          {/* <Route exact path={'/hello2'} component={Hello2} /> */}
          {/* <Route exact path={'/hello'} component={Hello} /> */}
          <Route path="/" element={<Navigate to="/instrument-panel/notice-order" />} />
          <Route path={'/instrument-panel/notice-order'} element={<NoticeOrder />} />
          <Route path={'/instrument-panel/early-warning'} element={<NoticeTable />} />
          <Route path={'/instrument-panel/department'} element={<Deparment />} />
          <Route path={'/instrument-panel/accountManagement'} element={<AccountManagement />} />
          <Route path={'/customer-management/customerIndex'} element={<CustomerManagement />} />
          <Route path={'/customer-management/early'} element={<EarlyWarning />} />
          <Route path={'/customer-man/custIndex'} element={<CustIndex />} />
          <Route path={'/customer-man/ear'} element={<Ear />} />
          <Route path={'/login'} element={< Login />} />
          {/* <Route exact path={'/treeselect'} component={TreeSelect} />
            <Route exact path={'/iszmage'} component={ZISmage} />
            <Route exact path={'/user-permission'} component={OperUserManage} />
            <Route exact path={'/swiper-lunbo'} component={SwiperLunbo} /> */}
          <Route element={<div className="FBV FBAC FBJC" style={{ fontSize: 100 }}>404</div>} />
        </Routes>
      </FrameLayout>
    </Router>
  )
}

export default App;