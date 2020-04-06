export default (option)=>{
  // const baseUrl = 'http://157.122.54.189:9088'
  // 加载中
  uni.showLoading({
    title:'加载中'
  })

  return new Promise((resolve,reject)=>{
    
    wx.request({
      ...option,
      method:option.method || 'get',
      success:resolve,
      fail:reject,
      complete(){
        uni.hideLoading()
      }
    })
  })
}