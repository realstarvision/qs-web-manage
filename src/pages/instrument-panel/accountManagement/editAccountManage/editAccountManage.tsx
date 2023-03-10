import React, { useState, useEffect, useRef } from 'react'
import './editAccountManage.scss'
import { message, } from 'antd'
import EditAccountBra from '@/components/AntDBread/index'
import { Form,Input, Button,Select, Switch,} from 'antd';
import { useSearchParams } from 'react-router-dom'
export interface editAccountManageInput {
    editAccountName: string,
    editAccountUserName: string | number,
    editAccountKinds: string | number,
    editAccountTel: string,
    editAccountId: string | number,
    editAccountManageChecked: boolean
}
// 面包屑
const breadcrumbNameMap = {
    '/': '首页',
    '/instrument-panel': '工作台',
    '/instrument-panel/accountManagement': '账号管理',
    '/instrument-panel/accountManagement/editAccountManage': '编辑账号'
}

export default function addAccountManage() {
    // 表单ref
    const formRef = useRef();
    // 获取路由参数
    const [searchPar, setSearchPar] = useSearchParams()
    const search = searchPar.get('id')
    // 输入框状态初始值
    const [editAccountManageValue, setEditAccountManageValue] = useState<editAccountManageInput>({
        editAccountName: '',
        editAccountUserName: search,
        editAccountTel: '',
        editAccountKinds: 0,
        editAccountId: 0,
        editAccountManageChecked: true,
    })
    // const { RangePicker } = DatePicker;
    // // 开关的改变事件
    // const addAccountManageCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     addAccountManageValue.addAccountManageChecked = event.target.checked; setAddAccountManageValue({ ...addAccountManageValue })
    //     // console.log(event.target.checked)
    // }
    // // 点击保存事件
    // const addAccountSave = () => {
    //     console.log(addAccountManageValue)
    //     // 新建数组
    //     const addAccountManageValueArr = [{
    //         name: '登陆账号',
    //         value: addAccountManageValue.addAccountName
    //     },
    //     {
    //         name: '持有人姓名',
    //         value: addAccountManageValue.addAccountUserName
    //     },
    //     {
    //         name: '联系方式',
    //         value: addAccountManageValue.addAccountTel
    //     },
    //     ]
    //     // 新建数组  arr储存addAccountManageValueArr的每一项的value值
    //     let arr = []
    //     // 新建数组  newArr储存addAccountManageValueArr的非空值
    //     let newArr = []
    //     // 遍历addAccountManageValueArr
    //     addAccountManageValueArr.map((value, index) => {
    //         // 判断输入框值为空就谈出错误信息
    //         if (value.value === '') {
    //             message.error(`请输入${value.name}`)
    //         }
    //         //将输入框值加入arr
    //         arr.push(value.value)
    //         console.log(arr)
    //     })
    //     // 遍历arr
    //     arr.forEach((item) => {
    //         if (item != '') {
    //             newArr.push(item)
    //         }
    //     })
    //     // 判断输入框有值的数组和输入框总值的长度对比，等长就说明全部有值就谈成功
    //     if (newArr.length === arr.length) {
    //         // 手机号验证
    //         const testTel = /^[1][3-9][\d]{9}/
    //         if (testTel.test(addAccountManageValue.addAccountTel)) {
    //             // 请求数据上传服务器然后清空数据
    //             setTimeout(() => {
    //                 setAddAccountManageValue({
    //                     addAccountUserName: '',
    //                     addAccountName: '',
    //                     addAccountKinds: 0,
    //                     addAccountTel: '',
    //                     addAccountId: 0,
    //                     addAccountManageChecked: true,
    //                 })
    //                 message.success('保存成功')
    //             }, 1000)
    //         }
    //         else {
    //             message.error('请输入正确的手机号')
    //         }


    //     }
    // }

    // 初始化
    useEffect(() => {

    }, [])

    // 表单提交事件
   const formFinish=(value)=>{
    console.log(value)
    // 清空输入框的值
 let t=null
 clearTimeout(t)
 t=setTimeout(()=>{
    formRef.current.resetFields()
message.success('保存成功')

   
 },1000)
   }
    return (
        // 最外侧盒子
        <div className='editAccountManage' >
            {/* 面包屑 */}
            <div className='editAccountManageBra'>
                <EditAccountBra breadcrumbNameMap={breadcrumbNameMap}></EditAccountBra>
            </div>
            {/* 内容区 */}
            <div className='editAccountManageMain'>
                <div className='editAccountManageMainBox' style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', flexWrap: 'nowrap' }}>
                    {/* 内容区 标题 */}
                    <div className='editAccountManageTitle'>账号新增</div>
                    {/*   内容区输入框组 */}
                    <Form
                        className='editAccountManageForm'
                        labelCol={{ flex: '90px' }}
                        wrapperCol={{ flex: 1 }}
                        labelAlign="left"
                        layout="horizontal"
                        scrollToFirstError={true}
                        colon={false}
                        size='large'
                        ref={formRef}
                        requiredMark={false}
                        onFinish={(value) => {  formFinish(value); }}
                    // disabled={componentDisabled}
                    >
                        <div className='editAccountManageFormTop' >
                            <Form.Item label="登陆账号" name='userId' initialValue={editAccountManageValue.editAccountUserName}
                            >
                                <Input
                                    className='editAccountManageFormInput editAccountManageFormInputFirst'
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item label="持有人姓名" name='userName'
                        
                                rules={[{ required: true, message: '请输入持有人姓名' }, { pattern: /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的持有人姓名' }]}>
                                <Input
                                    className='editAccountManageFormInput '
                                    placeholder='请输入持有人姓名' />
                            </Form.Item>
                            <Form.Item label="联系方式" name='userTel'
                                rules={[{ required: true, message: '请输入联系方式' }, { pattern: /^[1][3-9][\d]{9}/, message: '请输入正确的手机号', }]}>
                                <Input
                                    className='editAccountManageFormInput'
                                    placeholder='请输入联系方式'
                                />
                            </Form.Item>
                            <Form.Item initialValue={1} label="所属部门" name='userDepart'>
                                <Select
                                    className='editAccountManageFormInput'
                                >
                                    {[
                                        { value: 0, label: 'aa' },
                                        { value: 1, label: 'bb' },
                                        { value: 2, label: 'cc' },
                                    ].map((value, index) => {
                                        return <Select.Option key={index} value={value.value}>{value.label}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item initialValue={1} label="所属角色" name='userRole'>
                                <Select
                                    className='editAccountManageFormInput'
                                // key={1}
                                // onChange={(value) => { console.log(value) }}
                                >
                                    {/* {[
                                        { value: 0, label: 'Jack' },
                                        { value: 1, label: 'Lucy' },
                                        { value: 2, label: 'yiminghe' },
                                    ].map((value, index) => {
                                        return <Select.Option key={index} value={value.value}>{value.label}</Select.Option>
                                    })} */}
                                     {[
                                        '张三','里斯','王五'
                                    ].map((value, index) => {
                                        return <Select.Option key={index} value={index}>{value}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="帐号状态" name='userStyle' initialValue={editAccountManageValue.editAccountManageChecked} valuePropName='checked'>
                                <Switch
                                    checkedChildren="禁用"
                                    unCheckedChildren="启用" />
                                </Form.Item>
                        </div>
                        <Form.Item className='addAccountManageFooter'>
                            <Button htmlType='submit' className='addAccountManageButton'
                            //  onClick={() => { addAccountSave() }}
                            >保存</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}