Page({
  data: {
    navigateTitle: ""
  },
  onLoad: function(options) {
    var categroy = options.categroy;
    this.data.navigateTitle = categroy;
  },
  
  onReady: function (options){
    //点击更多后，动态设置相应页面的导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function(res){

      }
    })
  }
})