const TokenKey = 'Admin-Token'
const userInfo = 'User-Info-order-manage'

export function getToken() {
  return sessionStorage.get(TokenKey)
}
// 存储token
export function setToken(token: string) {
  console.log(token)
  return sessionStorage.setItem('Token', token)
}

export function removeToken() {
  return sessionStorage.remove('Token')
}

export function getUserInfo() {

  const info = JSON.parse(sessionStorage.getItem(userInfo))
  return info
}

export function setUserInfo(info: any) {

  const user = sessionStorage.setItem(userInfo, JSON.stringify(info))

  return user
}

export function removeUserInfo() {
  return sessionStorage.clear(), localStorage.clear()

}
