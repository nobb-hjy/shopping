import { request } from "../../request/request"

// pages/good_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods_id:0,
      detailData:{}
  },
  // 全局对象
  goodData:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      goods_id:options.goods_id
    })
    this.getGoodDetail(this.data.goods_id)
  },
  getGoodDetail(id){
    request({
      url:'/goods/detail',
      data:{
        goods_id:id
      }
    }).then(res=>{
      if(res.data.meta.status==200){
        // console.log(res)
        const detailData=res.data.message
        this.setData({
          detailData:{
            goods_name:detailData.goods_name,
            goods_price:detailData.goods_price,
            // 部分iPhone手机不识别webp格式图片，webp=>jpg
            goods_introduce:detailData.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics:detailData.pics
          }
        })
        this.goodData=detailData
      }else{
        console.log(res.data.meta.msg)
      }
    })
  },
  // 预览图片
  handlePreviewImg(e){
    // 先构造要预览的图片数组
    const urls=this.data.detailData.pics.map((item)=>item.pics_mid)
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      urls:urls,
      current: current,
      showmenu: true,
    })
  },
  // 加入购物车
  /*
  1.点击加入购物车
  2.获取缓存中的数据
  3.如果缓存中的数据已有该商品，则修改商品数据，再重新把数据返回给缓存
  4.如果不存在，则直接给购物车数组添加一条数据
  5.弹出提示
  */
  handleCartAdd(){
    const carts=wx.getStorageSync('cart')||[]
    const index =carts.findIndex(item=>item.goods_id===this.goodData.goods_id)
    if(index===-1){
      // 不存在
      this.goodData.num=1
      this.goodData.isChecked=true
      carts.push(this.goodData)
    }else{
      // 已有该商品
      carts[index].num++
    }
    // 添加进缓存
    // console.log(carts)
    wx.setStorageSync('cart', carts)
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  }
  })