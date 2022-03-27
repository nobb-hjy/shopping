// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserProfile(){
    wx.getUserProfile({
      desc: '获取个人信息',
      success:(result)=>{
        const {userInfo}=result
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  } 
})