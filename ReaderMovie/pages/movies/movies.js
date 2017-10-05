var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  onLoad: function (options) {
    var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&&count=3";
   
    this.getMovieListData(inTheaterUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },

  //访问api
  getMovieListData: function (url, settedKey, categroyTitle){
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'Application/json'
      },
      success: function (res) {
        console.log(res);
        that.processDoubanData(res.data, settedKey, categroyTitle);
      },
      fail: function(){
        console.log(error);
      }
    });
  },

 //数据绑定
  processDoubanData: function (moviesDouban, settedKey, categroyTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      //判断电影标题的长度
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6) + '...';
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
    var readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categroyTitle: categroyTitle
    };
    this.setData(readyData);
  }

})