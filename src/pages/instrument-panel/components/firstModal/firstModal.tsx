import React, { useEffect, useState } from 'react'
import { Button, Modal } from '@mui/material'
import { connect } from 'react-redux'
import './firstModal.scss'

// 组件功能: 首次登录提示用户修改密码弹窗

 function firstModal(props) {
    // 获取全局状态及修改方法
    const{firstChangPassword,changePasswordFun}=props
    // 遮罩层状态开关
    const [modalKey, setModalKey] = useState(true)

    // 登陆后调用接口请求服务器密码,判定首次设定密码与此刻密码是否一致,一致就将遮罩层打开让用户修改密码
    const [nowPassword, setNowPassword] = useState('123456')
    const [severPassword, setSeverPassword] = useState('123456')
    // 首次登录遮罩层提示修改密码
    const firstTest = function () {
        // 获取用户信息
        // UserInfo()
        if (nowPassword === severPassword) {
            setModalKey(true)
        }
        else {
            setModalKey(false)
        }

    }

    // 点击修改时关闭遮罩层 并打开修改密码遮罩层
    const okClick = function () {
        
        setModalKey(false)

        // 打开修改密码遮罩层,组件传值麻烦需要用到redux
        // modifyPassword(value)
        changePasswordFun()
        setTimeout(() => {
            console.log(firstChangPassword)
        }, 2000);
       
    }
  // 点击取消 关闭遮罩层
    const noClick = function () {
      
        setModalKey(false)

    }

    useEffect(() => {


        console.log('我是子组件')
        console.log(firstChangPassword)
        firstTest()
    },[])

    return (
        <Modal className='messageBox' open={modalKey}  
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
           >
            {/* 弹窗盒子 */}
            <div className='modalBox'>
                {/* 弹窗标题 */}
                <div className='modalTitle'>提示</div>
                {/* 弹窗内容 */}
                <div className='modalMain'>
                    <div>当前密码为初始密码，存在安全隐患。</div>
                    <div>为保障您的账户安全，请及时修改密码。</div>
                </div>
                {/* 弹窗按钮 */}
                <div className='modalButton'>
                    <Button className='noButton' onClick={() => { noClick() }}>
                        取消
                    </Button>
                    <Button className='okButton' onClick={() => { okClick() }}>
                        前往修改
                    </Button>
                </div>

            </div>
        </Modal>

    )
}

// 从全局中获取打开密码修改遮罩层的状态，并点击时触发事件修改其状态



// 获取全局状态的函数 ,需要在获取的话在全局定义完毕之后 
// 在return后面的{}追加即可,如果只是修改而不使用则将第一个参数设为null即可
const usePasswordKey=(state)=>{
return {firstChangPassword:state.getIn(['changePasswordKey','firstChangPassword'])

}
}

// 修改全局状态的函数
const changePasswordKey=(dispatch)=>{
return {
changePasswordFun(){

    dispatch({type:'changePasswordType'})
}

}
}

export default  connect (usePasswordKey,changePasswordKey)(firstModal)
