import request from '@/utils/request'

const api = {
  userList: '/star-store/background/findUserListByPage',
  login: '/star-qiaosi/user/login',
  updateUser: '/star-store/background/updateUser',
  updateUserInfo: '/star-qiaosi/user/updateById',
}


/* 密码登录 */
export function Login(data) {
  return request({
    url: api.login,
    method: 'post',
    data
  })
}



/** 
*  分页获取客户列表
*/

export function getUserList(data) {
  return request({
    url: api.userList,
    method: 'post',
    data
  })
}


/* 根据用户id更新用户信息 */
export function updateUser(data) {
  return request({
    url: api.updateUser,
    method: 'post',
    data
  })
}

/* 根据用户id更新用户信息 */
export function updateUserInfo(data) {
  return request({
    url: api.updateUserInfo,
    method: 'post',
    data
  })
}

