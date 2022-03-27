import { request } from "../../request/request"

// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false
      },
      {
        id:2,
        value:'待发货',
        isActive:false
      },
      {
        id:3,
        value:'退款/退货',
        isActive:false
      },
    ],
    orders:[
      {
        id:'HMCDCDV18339R84T985Y91',
        price:'1205',
        date:'2020/7/8 下午 9:45:56',
        type:1
      },
      {
        id:'HMCDCDV18355R84T675Y91',
        price:'92345',
        date:'2020/7/8 下午 9:45:56',
        type:2
      },
      {
        id:'HMVVFBCDV18339R84T985Y',
        price:'9999',
        date:'2020/7/8 下午 9:45:56',
        type:3
      },
      {
        id:'CDBFCDV18339R84T985Y91',
        price:'7865',
        date:'2020/7/8 下午 9:45:56',
        type:2
      },
      {
        id:'HMCDCDV18FGRG84T985Y91',
        price:'3554',
        date:'2020/7/8 下午 9:45:56',
        type:1
      },
      {
        id:'HMCDCDVVFGHJR84T985Y91',
        price:'2145',
        date:'2020/5/12 上午 9:45:56',
        type:2
      },
      {
        id:'HSERCDVCDBF45R84T985Y91',
        price:'2345',
        date:'2020/7/8 下午 9:45:56',
        type:3
      }
    ],
    orderscopy:[]
  },

  onLoad(options){
    // 复制一份orders
    let {orders}=this.data
    this.setData({orderscopy:orders})
  },
  onShow() {
    // const token=wx.getStorageSync('token')
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
    //   return
    // }
    // 1.获取当前的小程序的页面栈数组，最大为10
    let pages=getCurrentPages()
    // 2.索引最大的就是当前页面，拿到
    let currentPage=pages[pages.length-1]
    // console.log(currentPage)
    // 拿到options currentPage.options
    const {type} = currentPage.options
    this.getOrders(type)
    this.changeType(type-1)
  },
  // 获取数据
  // async getOrders(type){
  //   const {orders}=await request({url:'/my/orders/all',data:{type}})
  //   console.log(orders)
  //   this.setData({orders})
  // },
  getOrders(type){
    // 在数据副本里面过滤，数剧才完整
    let {orderscopy}=this.data
    console.log(orderscopy)
    const orders=orderscopy.filter((item)=>item.type==type)
    this.setData({orders})
    console.log(this.data.orders)
  },
   // 切换-2
   changeType(index){
    // 修改isActive
    console.log(index)
    let {tabs}=this.data
    tabs.forEach((item,i)=>i===index?item.isActive=true:item.isActive=false)
    // 赋值到data中
    this.setData({
      tabs
    })
    
  },
  // 切换tab
  handleTabItemChange(e){
    // 点击标题，获取索引
    const {index}=e.detail
    this.changeType(index)
    const type=index+1
    this.getOrders(type)
  }
})