// src/api/search.ts
import request from '../service/request'

// 热门搜索
export function getHotSearchListData () {
  return request.get('/pro/hotword')
}

// 搜索列表数据
export function getSearchListData (params: { count?: number, limitNum?: number, keyword: string}) {
  return request.get('/pro/search', { params })
}
