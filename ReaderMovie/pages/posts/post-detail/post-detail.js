var postsData = require('../../../data/data.js'); 

Page({
  data: {

  },
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
     postData: postData
    });

    //文章收藏 缓存 (StorageSync 同步)
    var postsCollected = wx.getStorageSync('posts_collected')
    //未被收藏
    if (postsCollected){  
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      });
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },

  onCollectTap: function(event){
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏的变成未收藏的，未收藏的变成收藏的
    postCollected = !postCollected; 
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    });

    //交互反馈
    wx.showToast({
      title: postCollected ? "收藏成功":"取消成功",
      duration: 1000,
      icon: "success"
    });
  }

})