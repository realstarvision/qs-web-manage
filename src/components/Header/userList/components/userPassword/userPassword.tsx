import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box, Input, IconButton,Button,TextField  } from '@material-ui/core';
import {connect} from 'react-redux'
import SvgIcon from '@/components/SvgIcon'
import './userPassword.scss'
import { display } from '@mui/system';
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// 定位个人信息弹出层的位置
function getModalStyle() {
    const top = 53;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
  
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: ' 558px',
            height: '90%',
            background: ' #FFFFFF',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2.5, 1.88, 2.1, 2.85),
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'

        },
    }),
);



// 定义组件
 function SimplePassModal({ firstChangPassword,changeStorePasswordFun }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    //   const handleOpen = () => {
    //     setOpen(true);
    //   };

    const handleClose = function () {
        changeStorePasswordFun();
    };
    const boxIconClose = function () {
        changeStorePasswordFun();;
    };

    const body = (
        <Box style={modalStyle} className={classes.paper}>
            <Box>
            <Box className='boxTitle'>
                <Box className='boxText'>修改密码</Box>
                <SvgIcon svgClass='boxIcon' svgName='Frame 427318800' onClick={()=>{boxIconClose(false)}}></SvgIcon>
            </Box>
            <form noValidate autoComplete="off" >
                <Box className='postBox'>
                
                    <Box className='accBox'>
                        <Box className='accountText' >登录账号</Box>
                        <Box className='kindValue'>12345678</Box>
                    </Box>
                    <Box className='accBox'>
                        <Box className='accountText' >手机号码</Box>
                        <Box className='kindValue'>12345678</Box>
                    </Box>
                    <Box className='telBox'> 
                        <Box className='telText'>手机验证码</Box>
                       
                        <Input placeholder="请输入手机验证码"  disableUnderline={true} defaultValue='' ></Input>
                        <Button className='getCodeBox'>获取</Button>
                       
                    </Box>

                    <Box className='nameBox'> 
                        <Box className='nameText'>设置新密码</Box>
                        <Input placeholder="请输入新的密码"  disableUnderline={true} defaultValue='' />
                    </Box>
                 
                    <Box className='PassBox'> 
                        <Box className='PassText'>确认密码</Box>
                        <Input placeholder="请再次确认密码" disableUnderline={true} defaultValue=''  />
                    </Box>
                  
                    {/* <Box className='KindBox'> 
                        <Box className='KindText'>所属部门</Box>
                        <Box className='kindValue'>X部门</Box>
                    </Box>
                    <Box className='KindBox'> 
                        <Box className='KindText'>所属角色</Box>
                        <Box className='kindValue'>X部门</Box>
                    </Box> */}
                </Box>
            </form>
            </Box>
            <Box className='buttonBox'>
            <Button className='noButton'>
            取消
            </Button>
            <Button   className='okButton' onClick={() => { handleClose() }} >
            确定
            </Button>
            </Box>

        </Box>);

    return (
        <div>

            <Modal
                open={firstChangPassword}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
// 获取全局状态的函数
const useStoreChangePasswordKey=function(state){
 return {firstChangPassword:state.getIn(['changePasswordKey','firstChangPassword'])

}

}

// 修改全局状态的函数

const changeStorePasswordKey=(dispatch)=>{
return {

    changeStorePasswordFun(){

        dispatch({type:'changePasswordType'})
    }
}
}

export default connect (useStoreChangePasswordKey,changeStorePasswordKey)(SimplePassModal)