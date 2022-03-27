// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onload只会执行一次，如果登录后返回，数据是不会更新到页面上的
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    // console.log(userInfo)
    this.setData({userInfo})
  }
})