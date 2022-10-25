// src/api/kind.ts
import request from '../service/request'

// 分类列表
export function getCityListData () {
  return request.get('/city/sortCity')
}
