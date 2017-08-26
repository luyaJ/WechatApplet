var app = getApp()
Page({
	data:{
		inputVal: "",
    searchResult: []
	},

  cancel:function(){
    wx.switchTab({
      url: '../find/find'
    })
  },

  inputTyping:function(e){
    this.setData({
      inputVal: e.detail.value
    });
  },

	onLoad:function(options){
		
	},
	onReady:function(){
		
	},
	onShow:function(){
		
	},
	onHide:function(){
		
	},
	onUnload:function(){
		
	},
	onPullDownRefresh:function(){
		
	},
	onReachBottom:function(){
		
	}
})		