//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
//添加方法（快递单号api）
  getExpressInfo:function(nu,cb){ //传两个参数，快递单号和方法
    wx.request({
      url: 'http://apis.baidu.com/kuaidicom/express_api/express_api?muti=0&order=desc&nu='+nu,
      data: {
         x: '' ,
         y: ''
      },
      header: {
          'apikey': 'ce6edaea850c6744d7b5381c123778fd'
      },
      success: function(res) {
        // console.log(res.data)
        cb(res.data)
      }
    })
  },

  globalData: {
    userInfo: null
  }
})
