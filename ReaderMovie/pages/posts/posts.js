// 引用本地数据data.js
var postsData = require('../../data/data.js'); //只能用相对路径

Page({
  data: {
  
  },

  onLoad: function (options) {
    //this.data.postList = postsData.postList
    this.setData({
      postList: postsData.postList
    });
    
  }
})