// pages/chatAI/chatAi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],//聊天信息
    mess: '',
    toMess: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.dbWatcher();
    this.queryChat();
    console.log(this.data)
  },

  

  //获取格式化的时间 yyyy-mm-dd-hh:mm-ss
	getFormatTime(){
		let date = new Date();
		let ymd = date.toISOString().substring(0,10);//年-月-日
		let hms = date.toTimeString().substring(0,8);//小时-分钟-秒钟
		console.log(ymd + "-" + hms);
		return ymd + "-" + hms;//拼接
	},
  sendMess(){
    // console.log(1)
    let that = this;
    let mess = that.data.mess;
    let content = that.data.content;
    let date = that.getFormatTime();
    let id = that.data.currentId;
    // console.log(id,11)
    wx.showLoading({
      title: '发送ing.....',
    })
    console.log(mess)
    that.setData({
        content: content.concat({
          id: 1,
          text: mess,
          // data: date
          toMess: "item"+content.length - 1
      })
    })
    wx.hideLoading({
      noConflict: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    console.log(that.data.content)
  },
  //数据库的监听器
  dbWatcher(){
    let that = this;
  
    },
    //查询聊天
  queryChat(){
    let that = this;
    console.log(that.data.content)
    wx.showLoading({
      title: '查询...',
    })
    that.setData({
      content: [{
        id: 2,
        text: "你好"
      },{
        id: 1,
        text: "我很好"
      }]
    });
    //定位到最后一行
    that.setData({
      toBottom : `item${that.data.content.length - 1}`,
    })
    wx.hideLoading({
      noConflict: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    console.log(that.data.content)
  }
})