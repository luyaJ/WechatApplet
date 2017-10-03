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

  onPostTap: function (ev) {
    var postId = ev.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }

})