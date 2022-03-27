// index.js
// 获取应用实例
const app = getApp()
// 引入用发送请求的方法，路径要补全
import {request} from '../../request/request.js'
Page({
  data: {
    // 轮播图数组
    swiperData:[],
    // 导航栏数据
    navList:[],
    //楼层数据
    floorData:[]
  },
  onLoad() {
   this.getBanner()
   this.getNavList()
   this.getFloorData()
  },
  // 获取轮播图数据 发送异步请求
  getBanner(){
    request({
      url:'/home/swiperdata'
      }).then(result=>{
      if(result.data.meta.status==200){
        // console.log(result)
        this.setData({
          swiperData:result.data.message
        })
      }
    })
  },
  // 获取导航栏数据
  getNavList(){
    request({
      url:'/home/catitems'
    }).then(res=>{
      // console.log(res)
      if(res.data.meta.status==200){
        this.setData({
          navList:res.data.message
        })
      }
    })
  },
  // 获取楼层数据
  getFloorData(){
    request({
      url:'/home/floordata'
    }).then(res=>{
      // console.log(res)
      if(res.data.meta.status==200){
        let data=res.data.message
      // 修改路径
        data.forEach(item => {
          item.product_list.forEach(v=>{
            let strArr=v.navigator_url.split('?')
            // v.navigator_url
            let newUrl=strArr[0]+'/index?'+strArr[1]
            newUrl=newUrl.replace("goods_list","good_list")
            // console.log(newUrl)
            return v.navigator_url=newUrl
          })
        });
        this.setData({
          floorData:data
        })
        console.log(this.data.floorData)
      }
    })
  }
})
