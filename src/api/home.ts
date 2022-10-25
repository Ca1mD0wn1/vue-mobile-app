import request from "../service/request";

interface IpageParams {
  limitNum?: number
  count?: number
}
export function getBannerListData() {
  return request.get('/banner/list')
}
export function getSeckillListData() {
  return request.get('/pro/seckilllist')
}

export function getProListData(params?: IpageParams) {
  return request.get('/pro/list', { params })
}