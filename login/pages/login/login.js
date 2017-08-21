var app = getApp();
Page({
  data: {
    username:null,
    psw:null
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },

  btnClick:function(e){
    wx.redirectTo({url:'../user/user'})
  },
  usernameInput:function(e){
    this.setData({username:e.detail.value})

  },
  pswInput:function(e){
    this.setData({psw:e.detail.value})
   
  }

})