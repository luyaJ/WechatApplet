//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    id1:'back',
    id2:'del',
    id3:'addel',
    id4:'+',
    id5:'9',
    id6:'8',
    id7:'7',
    id8:'-',
    id9:'6',
    id10:'5',
    id11:'4',
    id12:'*',
    id13:'3',
    id14:'2',
    id15:'1',
    id16:'/',
    id17:'0',
    id18:'.',
    id19:'history',
    id20:'=',
    screenData:'0',
    lastIsOperator:false,
    arr:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //this指page
  clickBtn:function(e) {
    // console.log(e.target.id);
    var id = e.target.id;
    if(id == this.data.id1){   //退格
        var data = this.data.screenData;
        if(data == 0){
          return;
        }
        data = data.substring(0,data.length-1);
        if(data == "" || data == "-"){
          data = 0;
        }
        this.setData({screenData:data});
        this.data.arr.pop();

    } else if(id == this.data.id2){   //清屏
        this.setData({screenData:0});
        this.data.arr.length = 0;

    } else if(id == this.data.id3){   //正负号
        var data = this.data.screenData;
        if(data == 0){
          return;
        }
        var firstWord = data.substring(0,1);
        if(firstWord == "-"){
          data = data.substring(1,data.length);
          this,data.arr.shift();
        } else {
          data = "-" + data;
        }
        this.setData({screenData:data});
        this.data.arr.unshift("-");

     } else if(id == this.data.id20){ //等于=
        var data = this.data.screenData;
        if(data == 0){
          return;
        }
        var lastWord = data.substring(data.length-1,data.length);
        if(isNaN(lastWord)){
          return;
        }
        var num = '';

        var lastOperator;
        var arr = this.data.arr;
        var optarr = [];
        for(var i in arr){
          if((isNaN(arr[i]) == false) || (arr[i] == this.data.id18) || (arr[i] == this.data.id3)){
            num += arr[i];
          } else {
            lastOperator = arr[i];
            optarr.push(num);
            optarr.push(arr[i]);
            num = '';
          }
        }
        optarr.push(Number(num));
        var result = Number(optarr[0]) * 1.0; //为了小数
        console.log(result);
        for(var i=0 ; i<optarr.length ; i++){
          if(isNaN(optarr[i])){
            if(optarr[1] == this.data.id4){
              result += Number(optarr[i+1]);
            } else if(optarr[1] == this.data.id8){
              result -= Number(optarr[i+1]);
            } else if(optarr[1] == this.data.id12){
              result *= Number(optarr[i+1]);
            } else if(optarr[1] == this.data.id16){
              result /= Number(optarr[i+1]);
            }
          }
        }
        this.data.arr.length = 0;
        this.data.arr.push(result);
        this.setData({screenData:result + ""});
     }
    else {

      // if((id == this.data.id4) || (id == this.data.id8) || (id = this.data.id12) || (id = this.data.id16)){
      //   if(this.data.lastIsOperator == true || this.data.screenData == 0){
      //     return;
      //   }
      // } 

      if(this.data.screenData == 0){
        var data = id;
      } else {
        data = this.data.screenData + id; 
      }  
      this.setData({screenData:data});
      this.data.arr.push(id);


      //判断操作符
      if((id == this.data.id4) || (id == this.data.id8) || (id = this.data.id12) || (id = this.data.id16)){
        this.setData({lastIsOperator:true});
      } else {
        this.setData({lastIsOperator:false});
      }


    }


    
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
