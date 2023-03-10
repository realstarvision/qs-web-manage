import { Map } from 'immutable'
// 创建登录时获取用户的reducer信息
const reducer = (state = Map({
    loginState: localStorage.getItem('loginState') === 'true',
    adminName: localStorage.getItem('adminName') || '',
    token: localStorage.getItem('token') || '',
    // 判定用户身份
    role: localStorage.getItem('role') || '',
    // 做权限用
    checkedKeys: JSON.parse(localStorage.getItem('checkedKeys')) || '',

}), { type, payload }) => {
    switch (type) {
        case 'chang-Login-State':
            return state.set('loginState', payload)
        case 'chang-Admin-Name':
            return state.set('adminName', payload)
        case 'chang-Token':
            return state.set('token', payload)
        case 'chang-Role':
            return state.set('role', payload)
        case 'chang-CheckedKeys':
            return state.set('checkedKeys', payload)
      default:
        return state

    }

}
export default reducer