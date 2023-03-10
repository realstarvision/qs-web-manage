// import { configureStore } from '@reduxjs/toolkit'
// import toolActive from './module/toolActive'
// import login from './module/login'

// export const store = configureStore({
//   reducer: {
//     toolActive,
//     login
//   },
// })

// export default {}

import thunk from 'redux-thunk'
import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import {combineReducers} from 'redux-immutable'
import changePasswordKey from './modules/changePasswordKey'
import user from './modules/user'
// 定义全局唯一的reducer
const reducer=combineReducers({
    changePasswordKey,
    user

})

// 定义全局唯一的全局状态
 const store=createStore(reducer,applyMiddleware(thunk))

 export default store