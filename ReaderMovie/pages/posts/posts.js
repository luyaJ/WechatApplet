// 引用本地数据data.js
var postsData = require('../../data/data.js'); //只能用相对路径

Page({
  data: {
  
  },
  onLoad: function (options) {
    this.setData({
      postList: postsData.postList
    });
  },

  //点击文章
  onPostTap: function (ev) {
    var postId = ev.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    });
  },

  //点击轮播图
  onSwiperTap: function(ev) {
    //target指的是当前点击的组件， currentTarget指的是事件捕获的组件
    var postId = ev.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    });
  }

})