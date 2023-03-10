import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box, Input, IconButton,Button,TextField  } from '@material-ui/core';

import SvgIcon from '@/components/SvgIcon'
import './userMesage.scss'
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// 定位个人信息弹出层的位置
function getModalStyle() {
    const top = 52;
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
            height: '95vh',
            background: ' #FFFFFF',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2.5, 1.88, 2.1, 2.85),
        },
    }),
);

export default function SimpleModal({ opEn, closDropChild }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    //   const handleOpen = () => {
    //     setOpen(true);
    //   };

    const handleClose = function (value) {
        closDropChild(value);
    };
    const boxIconClose = function (value) {
        closDropChild(value);
    };

    const body = (
        <Box style={modalStyle} className={classes.paper} >
            <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
            <Box>
            <Box className='boxTitle'>
                <Box className='boxText'>个人信息</Box>
                <SvgIcon svgClass='boxIcon' svgName='Frame 427318800' onClick={()=>{boxIconClose(false)}}></SvgIcon>
            </Box>
            <form noValidate autoComplete="off" >
                <Box className='postBox'>
                    <Box className='postPhotoBox'>
                        <Box className='headerBox'>头像</Box>
                        <Input className='photoInput' id="icon-button-file" type="file"></Input>

                    </Box>
                    <Box className='accBox'>
                        <Box className='accountText' >登录账号</Box>
                        <Box className='kindValue'>12345678</Box>
                    </Box>
                    <Box className='nameBox'> 
                        <Box className='nameText'>持有人姓名</Box>
                       
                        <Input placeholder="Placeholder"  inputProps={{ 'aria-label': 'description' ,}}  disableUnderline={true} defaultValue='' />
                    </Box>
                    <Box className='phoneBox'> 
                        <Box className='phoneText'>联系方式</Box>
                        <Input placeholder="Placeholder" disableUnderline={true} defaultValue=''  />
                    </Box>
                    <Box className='KindBox'> 
                        <Box className='KindText'>所属部门</Box>
                        <Box className='kindValue'>X部门</Box>
                    </Box>
                    <Box className='KindBox'> 
                        <Box className='KindText'>所属角色</Box>
                        <Box className='kindValue'>X部门</Box>
                    </Box>
                </Box>
                <Box className='buttonBox'>
            <Button className='noButton'>
            取消
            </Button>
            <Button   className='okButton' type='submit' onClick={() => { handleClose(false) }} >
            确定
            </Button>
            </Box>

            </form>
            </Box>
          

        </Box>
        </Box>
        );

    return (
        <div>

            <Modal
                open={opEn}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}