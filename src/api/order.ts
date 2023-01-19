import request from '@/utils/request'

const api = {
  getOrderAmount: '/star-store/background/getOrderAmount',
  getOrderCharList: '/star-store/background/getOrderCharList',
  findOrderListByPage: '/star-store/background/findOrderListByPage',
  updateOrder: '/star-store/order/update',
  saveDelivery: '/star-store/order/saveDelivery',
  findDelivery: '/star-store/order/findDelivery'
}

/* 查询订单统计信息(待确认订单数-待交付订单数-当日新增订单数) */
export function getOrderAmount() {
  return request({
    url: api.getOrderAmount,
    method: 'get',
  })
}

/* 获取订单折线图数据 */
export function getOrderCharList() {
  return request({
    url: api.getOrderCharList,
    method: 'get',
  })
}

/* 分页获取订单列表 */
export function findOrderListByPage(data) {
  return request({
    url: api.findOrderListByPage,
    method: 'post',
    data
  })
}

/* 更新订单 */
export function updateOrder(data) {
  return request({
    url: api.updateOrder,
    method: 'post',
    data
  })
}


/* 添加订单交付物链接 */
export function saveDelivery(data) {
  return request({
    url: api.saveDelivery,
    method: 'post',
    data
  })
}


/* 根据订单ID 获取交付物链接 */
export function findDelivery(data) {
  return request({
    url: api.findDelivery,
    method: 'post',
    data
  })
}









