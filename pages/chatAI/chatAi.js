// pages/chatAI/chatAi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],//聊天信息
    mess: '',
    toMess: '',
    url: 'ws://192.168.0.232:8090',
    that : this,
    reconnectTimerId : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.dbWatcher();
    this.queryChat();
    this.connectWebSocket();
    // console.log(this.data)
  },

   /**
   * 连接WebSocket服务器
   */
  connectWebSocket: function () {
    var that = this
    wx.connectSocket({
      url: that.data.url,
      success: function (res) {
        console.log('WebSocket连接成功'),
        console.log("发送心跳")
          that.data.heartbeatTimerId = setInterval(()=>{
            wx.sendSocketMessage({
              data: "{data:'你好', type: 2}",//心跳内容
              success: function () {
                console.log('发送心跳消息成功');
              },
              fail: function () {
                console.log('发送心跳消息失败');
              }
            })
          }, 5000); 
        // 每隔5秒发送一次心跳消息
        console.log(res);
      },
      fail: function (res) {
        console.log('WebSocket连接失败:', res)
      }
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开')
      that.setData({
        socketOpen: true
      })
      // for (var i = 0; i < that.data.socketMsgQueue.length; i++) {
      //   that.sendSocketMessage(that.data.socketMsgQueue[i])
      // }
      that.setData({
        socketMsgQueue: []
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败:', res)
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭:', res)
      that.reconnet()
      // that.setData({
      //   socketOpen: false
      // })
    })
    wx.onSocketMessage(function (res) {
      console.log('接收到服务器发送的数据:', res.data)
      var messages = that.data.messages
      messages.push(res.data)
      that.setData({
        messages: messages,
        scrollIntoView: 'message-' + messages.length
      })
    })
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
          toMess: `item"${that.data.content.length - 1}`
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
  },
  // 开始心跳定时器
  StartHeartbeat() {
    
    },
  //心跳测试
  sendHeartBeat(){
    wx.sendSocketMessage({
      data: "{data:'你好', type: 1}",//心跳内容
      success: function () {
        console.log('发送心跳消息成功');
      },
      fail: function () {
        console.log('发送心跳消息失败');
      }
    })
  },
  //重连
  reconnet(){
    let that = this
    var reconnectTimerId = setInterval(function(){
      wx.connectSocket({
        url: that.data.url,
        success: function () {
          console.log('WebSocket重新连接成功');
          clearInterval(reconnectTimerId);
          reconnectTimerId = null;
        },
        fail: function () {
          console.log('WebSocket重新连接失败');
        }
      },50000)
    })
  }
})