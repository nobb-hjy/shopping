import { request } from "../../request/request"

Page({
  data: {
    address:{},
    cart:[],
    num:0,
    sum:0
  },
  onShow(){
    // 获取缓存的地址
    const address=wx.getStorageSync('address')
     // 获取缓存中的购物车数据
    let cart=wx.getStorageSync('cart') ||[]
    // 过滤购物车信息，支付的是勾选的信息
    cart=cart.filter(i=>i.isChecked)
    this.setData({address})
    let sum=0
    let num=0
    cart.forEach(v=>{
      sum+=v.num*v.goods_price
      num+=v.num
    })
    this.setData({
      cart,sum,num
    })
    wx.setStorageSync('cart', cart)
  },
  // 支付按钮 1.判断缓存中是否有token 2.没有就跳转授权，进行获取 
  async payBtn(){
    const token=wx.getStorageSync('token')
     if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 创建订单
    const header = {Authorization:token}
    const order_price=this.data.sum
    const consignee_addr=this.data.address
    const cart = this.data.cart
    let goods=[]
    cart.forEach(i=>goods.push({
      goods_id:i.goods_id,
      goods_number:i.goods_number,
      goods_price:i.goods_price
    }))
    const params={order_price,consignee_addr,goods}
    const res = await request({url:'/my/orders/create',method:'POST',data:header,params})
    console.log(res)
  }
})