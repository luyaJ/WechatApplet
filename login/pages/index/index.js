// pages/index.js
var app = getApp();
Page({
  data: {
    username: null
  },

  onLoad: function (options) {
    if (app.appData.userInfo == null) {
      wx.redirectTo({ url: '../login/login' })
    } else {
      this.setDate({ username: app.appData.userInfo.username })
    }
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  }
})