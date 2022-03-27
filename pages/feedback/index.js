// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'体验问题',
        isActive:true
      },
      {
        id:1,
        value:'商品、商家投诉',
        isActive:false
      }
    ],
    chooseImages:[],
    textarea:''
  },
  // 外网图片路径数组，因为不需要在页面上显示，所以写在data外面
  imgUrls:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 切换导航栏
  handleTabItemChange(e){
    // 点击标题，获取索引
    const {index}=e.detail
    // 修改isActive
    let {tabs}=this.data
    tabs.forEach((item,i)=>i===index?item.isActive=true:item.isActive=false)
    // 赋值到data中
    this.setData({
      tabs
    })
  },
  // 添加图片
  handleAddPic(){
    // 调用微信内置的选择图片api
    wx.chooseImage({
      count: 9,
      sourceType:['album'],
      sizeType:['original', 'compressed'],
      mediaType:['image', 'video'],
      success:(result)=>{
        // console.log(result)
        // 一次选完后用户可能还想选，所以，拼接数组
        this.setData({
          chooseImages:[...this.data.chooseImages,...result.tempFilePaths]
        })    
      }
    })
  },
  // 删除
  handleDelete(e){
    //  获取索引
    const index=e.currentTarget.dataset.index
    // 获取图片数组
    let imgs=this.data.chooseImages
    imgs.splice(index,1)
    this.setData({chooseImages:imgs})
  },
  // 文本域的输入事件
  handleTextArea(e){
    // console.log(e)
    this.setData({textarea:e.detail.value})
  },
  // 提交
  handleSubmit(){
    const {textarea,chooseImages}=this.data
    // 输入不合法
    if(!textarea.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:"none",
        mask:true
      })
      return
    }
    // 显示正在上传中
    wx.showLoading({
      title: '正在上传中',
      mask:true
    })
    // 判断是否有图片要上传
    if(chooseImages.length!=0){
          // 准备上传图片  上传图片的api不支持多个文件一起上传
    chooseImages.forEach((v,i)=>{
      wx.uploadFile({
        filePath: v,//文件路径
        name: 'image',//文件名
        url: 'https://img.coolcr.cn/api/upload',//图片上传到哪里
        formData:{},//携带的文本信息
        success:(result)=>{
          console.log(result)
          let url=JSON.parse(result.data).data.url
          this.imgUrls.push(url)
          // 所有的图片上传之后
          if(i===chooseImages.length-1){
            wx.hideLoading()
            console.log(this.imgUrls)
            console.log('把文本信息和外网的图片数组，提交到后台')
            // 页面重置
            this.setData({
            textarea:"",
            chooseImages:[]
          })
          // 返回上个页面
          wx.navigateBack({
            delta: 1,
          })
          }
      }
      })
    })
    }else{
      wx.hideLoading()
      console.log('只是提交了文本')
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})