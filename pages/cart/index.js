// pages/cart/index.js
import {showToast} from '../../utils/myUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allchecked:false,
    num:0,
    sum:0
  },
  cart:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onShow(){
    // 获取缓存的地址
    const address=wx.getStorageSync('address')
     // 获取缓存中的购物车数据
    const cart=wx.getStorageSync('cart') ||[]
    this.setData({address})
    this.setCart(cart)
    // // 计算全选  使用every() 数组方法，遍历，每次都会有一个回调函数，如果每个都满足条件，全部返回true，那么every（）返回true
    // // 注意如果数组为空，则返回true
    // // const allchecked=cart.length?cart.every(item=>item.isChecked):false
    // let allchecked=true
    // // 计算总价格 1.商品需要被选中
    // let sum=0
    // let num=0
    // cart.forEach(v=>{
    //   if(v.isChecked){
    //     sum+=v.num*v.goods_price
    //     num+=v.num
    //   }else{
    //     allchecked=false
    //   }
    // })
    // allchecked=cart.length?cart.every(item=>item.isChecked):false
   
    // this.setData({
    //   address,
    //   cart,
    //   allchecked,
    //   sum,
    //   num
    // })
  },
  // 点击添加收货地址
  handleChooseAddress(){
  //  获取收货地址页面
  wx.chooseAddress({
    success: (result) => {
      // console.log(result)
      this.setData({
      address:{
        userName:result.userName,
        provinceName:result.provinceName,
        cityName:result.cityName,
        countyName:result.countyName,
        detailInfo:result.detailInfo,
        telNumber:result.telNumber
      }
      })
      // 设置缓存
      wx.setStorageSync('address', result)
    },
  })
  },
  // 购物车加减功能
  handleEditNum(e){
    // console.log(e)
    const {good,operation}=e.currentTarget.dataset
    const cart =wx.getStorageSync('cart')
    // console.log(cart)
    const index=cart.findIndex((item)=>item.goods_id===good.goods_id)
    if(operation===-1 && cart[index].num===1){
      // 小于0，直接把这条购物车信息删除
      wx.showModal({
        title: '提示',
        content: '要删除该信息吗',
        success :(res)=>{
          if(res.confirm){
            cart[index].num+=operation
            cart.splice(index,1)
            this.setCart(cart)
            // this.setData({
            //   cart
            // })
            // wx.setStorageSync('cart', cart)
          }else if (res.cancel){
            console.log('用户点击取消')
          }
        }
      })
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
    // let sum=0
    // let num=0
    // cart.forEach(v=>{
    //   if(v.isChecked){
    //     sum+=v.num*v.goods_price
    //     num+=v.num
    //   }
    // })
    // this.setData({
    //   cart,
    //   sum,
    //   num
    // })
    // wx.setStorageSync('cart', cart)
  },
   // 商品的选中和全选按钮
   handleAllCheck(){
    // 拿到allchecked值，直接取反，然后更改购物车中的isChecked值，最后保存数据
    let {cart,allchecked} =this.data
    allchecked=!allchecked
    cart.forEach(i=>i.isChecked=allchecked)
    this.setCart(cart)
    this.setData({allchecked})
   },
   handleCheck(e){
    //  获取被修改的商品id
    const goods_id=e.currentTarget.dataset.id
    // 获取购物车数组
    const {cart}=this.data
    // 找到被修改的对象
    const index = cart.findIndex(i=>i.goods_id===goods_id)
    cart[index].isChecked=!cart[index].isChecked
    // 把结果返回到数据和缓存中
    this.setCart(cart)
   },
  //  封装  计算购物车的同时，重新计算底部工具栏的数据
  setCart(cart){
    // 计算总数量，总价格，全选按钮
     // 计算总价格 1.商品需要被选中
     let allchecked=true
     let sum=0
     let num=0
     cart.forEach(v=>{
       if(v.isChecked){
         sum+=v.num*v.goods_price
         num+=v.num
       }else{
         allchecked=false
       }
     })
     allchecked=cart.length?cart.every(item=>item.isChecked):false
     this.setData({
       cart,allchecked,sum,num
     })
     wx.setStorageSync('cart', cart)
  },
  // 点击结算功能
  payBtn(){
    const {address,num}=this.data
    // 判断是否选择了收货地址
    if(!address){
      showToast({title:'您还没有选择收货地址'})
      return
    }
    // 判断是否选择了商品
    if(num==0){
      showToast({title:'您还没有勾选商品'})
      return
    }
    // 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})