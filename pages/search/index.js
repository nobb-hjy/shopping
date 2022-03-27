import { request } from "../../request/request.js"

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    tip:'',
    text:'',//输入框的值,
    isShow:false
  },
  timeId:-1 ,
  getSearchList(e){
      const query={query:e.detail.value}
      // const res=request({url:'/goods/qsearch',data:{query}})
      // console.log(res)
      // 检查值合不合法 trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
      if(!query.query.trim()){
        return
      }
      // 显示取消按钮,搜索字段
      this.setData({isShow:true})
      this.setData({text:query.query})
      // 防抖  第一次，没有定时器，第二次有定时器，清除，第三次有定时器，清除，如果第三次输入之后，不在输入，则2秒后发送请求
      clearTimeout(this.timeId)
      this.timeId=setTimeout(()=>{
        request({
          url:'/goods/qsearch',
          data: {query:this.data.text}
        }).then(res=>{
          console.log(res)
          if(!res.data.message[0].goods_id){
            this.setData({tip:'没有找到相关商品'})
          }
          this.setData({searchList:res.data.message})
        })
      },2000)
    },
    // 重置
    resetText(){
      this.setData({text:'',searchList:[],isShow:false})
    }
})