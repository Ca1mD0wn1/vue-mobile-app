// src/views/home/home.d.ts
export interface IBannerItem {
  alt: string
  bannerid: string
  flag: boolean
  img: string
  link: string
}
export interface INavItem {
  navid: number
  title: string
  imgurl: string
}
export interface IPro {
  banners: string[]
  brand: string
  category: string
  desc: string
  discount: number
  img1: string
  img2: string
  img3: string
  img4: string
  isrecommend: number
  issale: number
  isseckill: number
  originprice: number
  proid: string
  proname: string
  sales: number
  stock: number
}