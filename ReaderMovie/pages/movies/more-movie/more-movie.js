var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  onLoad: function (options) {
    var categroy = options.categroy;
    this.data.navigateTitle = categroy;  
    var dataUrl = "";
    switch(categroy){
      case "正在热映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    } 
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },

  //下滑加载更多电影(此处有bug，加载的电影会重复循环很多次)
  onScrollLower: function(e){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading(); //loading图标
  },

  //下拉刷新
  onPullDownRefresh: function(e){
    var freshUrl = this.data.requestUrl + "?start=0&&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(freshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      //判断电影标题的长度
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      //星星 [1,1,1,1,1] [1,1,0,0,0]
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.covertToStartsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var totalMovies = {}; 
    //如果要绑定新加载的数据 则要和老数据加在一起 
    if (!this.data.isEmpty){ 
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies //电影数组（20个）
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onReady: function(e){
    //动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function(res){
        //success
      }
    })
  }
})