// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helloworld: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.test();
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

  },
  test(){
    var that = this
    console.log(123)
    wx.request({
      url: 'http://localhost:9002/weixin/helloworld',
      success:function(res) {
        console.log(res)// 服务器回包信息
        that.setData({
          helloworld: res.data
        })
      }
    })
  }
})