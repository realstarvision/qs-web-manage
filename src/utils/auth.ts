import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userInfo = 'User-Info-order-manage'

export function getToken() {
  return Cookies.get(TokenKey)
}
// 存储token
export function setToken(token: string) {
  console.log(token)
  return localStorage.setItem('Token', token)
}

export function removeToken() {
  return localStorage.remove('Token')
}

export function getUserInfo() {
  const info = Cookies.get(userInfo)
  return info ? JSON.parse(info as string) : ''
}

export function setUserInfo(info: { avatarUrl: string, nick: string }) {
  const user = JSON.stringify(info)
  return Cookies.set(userInfo, user)
}

export function removeUserInfo() {
  return Cookies.remove(userInfo) ,localStorage.clear()
 
}
