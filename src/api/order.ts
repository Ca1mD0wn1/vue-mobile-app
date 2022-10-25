import request from '../service/request'

// 添加订单
export function addOrderData(params: { userid: string }) {
  return request.post('/order/addOrder', params)
}

// 获取订单信息
export function getOrderListData(params: { userid: string, time: string }) {
  return request.get('/order/confirmOrder', { params })
}

export interface IOrderAddress {
  userid: string
  time: string
  name: string
  tel: string
  province: string
  city: string
  county: string
  addressDetail: string
}
// 获取订单信息
export function updateOrderAddressData(params: IOrderAddress) {
  return request.post('/order/updateOrderAddress', params)
}