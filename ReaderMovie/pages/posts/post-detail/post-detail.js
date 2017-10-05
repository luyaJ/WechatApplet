var postsData = require('../../../data/data.js');
var app = getApp();  //获得全局变量 

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
     postData: postData
    });

    //缓存 (StorageSync 同步) 
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

    //音乐播放
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusicMonitor();

  },

  setMusicMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
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
  },

  //音乐播放器 
  musicTap: function(e) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic : false
      });
    }
    else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
    }   
  }

})