//获取应用实例
var app = getApp()
Page({
  data: {
    navbar: ['个性推荐','歌单','主播电台','排行榜'],
    currentTab: 0,
    imgurls: ['/images/banner_1.jpg','/images/banner_2.jpg','/images/banner_3.jpg','/images/banner_4.jpg'],
    imageurls: ['/images/banner_2.jpg', '/images/banner_1.jpg', '/images/banner_4.jpg', '/images/banner_3.jpg']
  },

// 搜索框输入
  inputTyping: function(e){
    this.setData({
      inputVal: e.detail.value
    })
  },
  focusinput: function(e){
    wx.redirectTo({
      url: '../input/input'
    })
  },
  
// 头部导航条点击
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
