// src/api/kind.ts
import request from '../service/request'

// 分类列表
export function getCategoryListData() {
  return request.get('/pro/categorylist')
}

// 分类下品牌列表
export function getCategoryBrandListData(params: { category: string }) {
  return request.get('/pro/categorybrandlist', { params })
}

// 分类下品牌的产品列表
export function getCategoryBrandProListData(params: { category: string, brand: string }) {
  return request.get('/pro/categorybrandprolist', { params })
}
