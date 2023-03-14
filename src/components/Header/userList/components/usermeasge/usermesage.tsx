import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import { Box, Input, IconButton,Button,TextField  } from '@material-ui/core';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Upload, Input, message } from 'antd'
import { getUserInfo } from '@/utils/auth';
import Uploadimage from '@/components/uploadImage';
import { updateUserInfo } from '@/api/user';

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
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm()
  const [photoImg, setPhotoImg] = useState('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
  // const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  // const handleClose = function (value) {
  //     closDropChild(value);
  // };
  // const boxIconClose = function (value) {
  //     closDropChild(value);
  // };

  // const body = (
  //     <Box style={modalStyle} className={classes.paper} >
  //         <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
  //         <Box>
  //         <Box className='boxTitle'>
  //             <Box className='boxText'>个人信息</Box>
  //             <SvgIcon svgClass='boxIcon' svgName='Frame 427318800' onClick={()=>{boxIconClose(false)}}></SvgIcon>
  //         </Box>
  //         <form noValidate autoComplete="off" >
  //             <Box className='postBox'>
  //                 <Box className='postPhotoBox'>
  //                     <Box className='headerBox'>头像</Box>
  //                     <Input className='photoInput' id="icon-button-file" type="file"></Input>

  //                 </Box>
  //                 <Box className='accBox'>
  //                     <Box className='accountText' >登录账号</Box>
  //                     <Box className='kindValue'>12345678</Box>
  //                 </Box>
  //                 <Box className='nameBox'> 
  //                     <Box className='nameText'>持有人姓名</Box>

  //                     <Input placeholder="Placeholder"  inputProps={{ 'aria-label': 'description' ,}}  disableUnderline={true} defaultValue='' />
  //                 </Box>
  //                 <Box className='phoneBox'> 
  //                     <Box className='phoneText'>联系方式</Box>
  //                     <Input placeholder="Placeholder" disableUnderline={true} defaultValue=''  />
  //                 </Box>
  //                 <Box className='KindBox'> 
  //                     <Box className='KindText'>所属部门</Box>
  //                     <Box className='kindValue'>X部门</Box>
  //                 </Box>
  //                 <Box className='KindBox'> 
  //                     <Box className='KindText'>所属角色</Box>
  //                     <Box className='kindValue'>X部门</Box>
  //                 </Box>
  //             </Box>
  //             <Box className='buttonBox'>
  //         <Button className='noButton'>
  //         取消
  //         </Button>
  //         <Button   className='okButton' type='submit' onClick={() => { handleClose(false) }} >
  //         确定
  //         </Button>
  //         </Box>

  //         </form>
  //         </Box>


  //     </Box>
  //     </Box>
  //     );
  // useEffect(() => {

  const { account, department, roleEntity, id } = getUserInfo()
  useEffect(() => {
    if (true) {
      const { avatar, mobile, name } = getUserInfo()
      const other: any = {}
      other.avatar = avatar
      other.name = name
      other.mobile = mobile
      form.setFieldsValue(other);
    }
  }, [])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('values', values);
      updateUserInfo({ id: id, ...values }).then(({ code }: any) => {
        if (code === 200) {
          message.success('更新成功')
        }
      })

    })
  }
  return (
    <div>
      <Modal
        open={opEn}
        title={"个人信息"}
        width={558}
        destroyOnClose
        maskClosable={false}
        okButtonProps={{ loading }}
        onOk={() => handleSubmit()}
        onCancel={() => closDropChild()}
        forceRender
      >

        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          scrollToFirstError
        >
          <Form.Item
            label="头像"
            name="avatar"
            rules={[{ required: true, message: "请上传头像" }]}
          >
            <Uploadimage value={photoImg} onChange={(value: any) => {
              setPhotoImg(value)
            }} />
          </Form.Item>
          <Form.Item
            label="登录账号"
          >
            {
              account
            }
          </Form.Item>
          <Form.Item
            label="持有人姓名"
            name="name"
            rules={[{ required: true, message: "请输入持有人姓名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="联系方式"
            name="mobile"
            rules={[{ required: true, message: "请输入联系方式" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="所属部门"
            rules={[{ required: false }]}
          >
            {
              department?.dutyDescr || '--'
            }
          </Form.Item>
          <Form.Item
            label="所属角色"
            rules={[{ required: false }]}
          >
            {
              roleEntity.roleDescr
            }
          </Form.Item>
        </Form>


      </Modal>
    </div>
  );
}