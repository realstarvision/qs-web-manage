import request from '@/until/request'

const api = {
  getLoginUrl: '/star-gateway/login/getLoginUrl',
  getUserInfo: '/star-gateway/login/getTokenByUUID',
  logout: '/star-gateway/login/logout'
}


/**
 *  获取钉钉登录地址
 * @param clientId 0 = 综合管理 1=上传工具
 * @param uuid 
*/
export function getLoginUrl(data: { clientId: number; uuid: string }) {
  return request({
    baseURL: '/gateway',
    url: api.getLoginUrl,
    method: 'post',
    data
  })
}

/** 
*  获取用户信息
 * @param clientId 0 = 综合管理 1=上传工具
 * @param uuid 
*/

export function getUserInfo(data: { clientId: number; uuid: string; }) {
  return request({
    baseURL: '/gateway',
    url: api.getUserInfo,
    method: 'post',
    data
  })
}

/** 
*  用户登出
 * @param clientId 0 = 综合管理 1=上传工具
 * @param uuid 
*/

export function logout(data: any) {
  return request({
    baseURL: '/gateway',
    url: api.logout,
    method: 'post',
    data
  })
}
