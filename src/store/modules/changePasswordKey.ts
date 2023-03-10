import {Map} from 'immutable'

// 定义首次登录弹窗内点击修改密码打开修改吗弹窗的reducer
const reducer=(state=Map({
firstChangPassword:localStorage.getItem('firstChangPassword')==='true'


}),action)=>{

switch(action.type){
case 'changePasswordType':
    localStorage.setItem('firstChangPassword', !state.get('firstChangPassword'))
    return state.set('firstChangPassword',!state.get('firstChangPassword'))
    default:
        return state
}

}

export default reducer