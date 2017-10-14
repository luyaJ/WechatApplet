var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
  
  },

  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(url, this.processDoubanData);
  },

  processDoubanData: function(data){
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
  
  }
})