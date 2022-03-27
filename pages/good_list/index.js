// pages/good_list/index.js
import {request} from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    params:{
      cid:0,
      pagenum:1,
      pagesize:10,
      query:''
    },
    goodList:[],
    message:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
      this.setData({
        params:{cid:options.cid==undefined?'':options.cid,pagenum:1,pagesize:10,query:options.query}
      })
      this.getGoodList(this.data.params)
  },
  // 获取列表数据
  getGoodList(params){
    request({
      url:'/goods/search',
      data:{...params}
    }).then(res=>{
      if(res.data.meta.status==200){
        this.setData({
          goodList:this.data.goodList.concat(res.data.message.goods),
          message:res.data.message
        })
      }
    })
  },
  //上拉加载下一页数据
  onReachBottom(){
    // 获取总页数
    const sumpage=Math.ceil(this.data.message.total / this.data.params.pagesize)
    console.log(this.data.params.pagesize)
    // 判断当前页数是否小于总页数，如果是，则加载下一页，如果不是，则不能加载了
    if(this.data.params.pagenum<sumpage){
      this.setData({
        params:{
          cid:this.data.params.cid,
          pagenum:this.data.params.pagenum+1,
          pagesize:this.data.params.pagesize
        }
      })
      this.getGoodList(this.data.params)
    }else{
      wx.showToast({
        title: '没有了',
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      params:{
        cid:this.data.params.cid,
        pagenum:1,
        pagesize:10
      }
    })
    this.getGoodList(this.data.params)
  },
  // 子组件传过来的自定义事件
  handleTabItemChange(e){
    // 点击标题，获取索引
    const {index}=e.detail
    // console.log(e)
    // 修改isActive
    let {tabs}=this.data
    tabs.forEach((item,i)=>i===index?item.isActive=true:item.isActive=false)
    // 赋值到data中
    this.setData({
      tabs
    })
  }
})
