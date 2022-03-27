export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title:title,
      mask:true,
      icon:'none',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}