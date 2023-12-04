// pages/index/index.js
Page({
  data: {
    token: null,
    userInfo: {},
    canIUseGetUserProfile: false,
  },
 
  getUserProfile() {
    console.log('getUserProfile')
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res)  => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          encryptedData: res.encryptedData,
        })
        let encryptedData=res.encryptedData;
        let userData = res.userInfo;
        let iv = res.iv;
        wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              method: 'POST',
              url: 'http://localhost:8101/api/login',
              data: {
                  code: res.code,
                  encryptedData: encryptedData,
                  iv: iv,
                  user: userData,
              },
              success(res){
                wx.setStorage({
                  key: "token",
                  data: res.data
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    })
  },
  getToken(){
    let that = this
    wx.getStorage({
      key: "token",
      success(res){
        console.log(res)
        that.setData({
          token: res.data.data
        })
      }
    })
    let token = wx.getStorageSync('token').data
    console.log(token)
  },
  onLoad(){
    this.getUserProfile();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
 
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
 
  }
})