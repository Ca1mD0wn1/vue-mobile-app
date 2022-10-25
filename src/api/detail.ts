import request from '../service/request'

export function getDetailData(proid: string) {
  return request.get('/pro/detail/' + proid)
}

export function getDetailRecommendData() {
  return request.get('/pro/recommendlist')
}
