// pages/category/index.js
import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[],
    rightContent:[],
    activeIndex:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /*  优化  数据格式：wx.setStorageSync('cate', {thme:Date.now(),data:res.data.message})
    1.先判断本地存储中有没有旧的数据
    2.没有旧数据，直接发送新的请求
    3.有旧数据，同时旧数据没有过期，就使用本地数据
    */ 
    const cates=wx.getStorageSync('cate')
    if(!cates){
      // 没有旧数据
      this.getCateList()
    }else{
      // 定义过期时间
      if(Date.now()-cates.time>1000*10){
        // 过期了重新发送请求
        this.getCateList()
      }else{
        // console.log('使用旧数据')
        this.setData({
          cateList:cates.data,
          rightContent:cates.data[0].children,
          activeIndex:cates.data[0].cat_id
        })
      }
    }
    // this.getCateList()
  },
  getCateList(){
    request({
      url:'/categories'
    }).then(res=>{
      console.log(res)
      if(res.data.meta.status==200){
        //把数据存入到本地
        wx.setStorageSync('cate', {thme:Date.now(),data:res.data.message})
        this.setData({
          cateList:res.data.message,
          rightContent:res.data.message[0].children,
          activeIndex:res.data.message[0].cat_id
        })
      }
    })
  },
    // 点击左侧菜单，获取右侧数据
  getRightList(event){
    // console.log(event)
    this.setData({
      activeIndex:event.target.dataset.index
    })
    this.data.cateList.map(item=>{
      // console.log(item)
      if(item.cat_id===event.target.dataset.index){
        this.setData({
          rightContent:item.children,
          scrollTop:0
        })
        console.log(this.data.rightContent)
      }
    })
  }
})