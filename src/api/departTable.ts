import request from '@/utils/request'

const api = {
    getDepartTableList: '/star-qiaosi/department/findList',
   
  }

// 部门管理列表
  export function getDepartTable() {
    return request({
      url: api.getDepartTableList,
      method: 'get',

    })
  }