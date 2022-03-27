// pages/auth/index.js
import {request} from '../../request/request.js'
import { login } from '../../utils/myUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 授权
  async handleGetUserInfo(e){
    try{
      // 获取信息
    const {encryptedData,iv,rawData,signature}=e.detail
    // 获取小程序登录后的token
    const {code}=await login()
       // 发送请求，获取token
    const params={encryptedData,iv,rawData,signature,code}
    const {token} = await request({url:'/users/wxlogin',data:params,method:"POST"})
    wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    wx.navigateBack({
      delta:1
    })
    }catch(err){
      console.log(err)
    }
  }
})