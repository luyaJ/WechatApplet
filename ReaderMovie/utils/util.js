// // 公共文件 
// //星星转换
function covertToStartsArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i=0; i<5 ; i++){
    if(i <= num){
      array.push(1);
    } 
    else{
      array.push(0);
    }
  }
  return array;
}

function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'Application/json'
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
      console.log(error);
    }
  });
}

module.exports = {
  covertToStartsArray: covertToStartsArray,
  http: http
}