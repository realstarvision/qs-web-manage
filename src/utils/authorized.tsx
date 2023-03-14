import React, { useState, useEffect } from 'react';
import Login from '@/pages/login'

const Authorized = (props: any) => {
  const [accountInfo, setAccountInfo] = useState(null)
  // 初始化权限
  const onInit = () => {
    let accountInfo = sessionStorage.getItem("accountInfo-qqzx");
    if (accountInfo) {
      accountInfo = JSON.parse(accountInfo);
      setAccountInfo(accountInfo)
    }
    // 设置统一的头部变量 .....
    // fetch.defaults.headers.common.qqzx_token = accountInfo.token;
  }
  useEffect(() => {
    onInit()
  }, [])

  const { children } = props;
  console.log('children', children);

  // const dom = accountInfo ? children : <Login />;
  // const dom = children
  return <>
    {
      children
    }
  </>
}

export default Authorized;
