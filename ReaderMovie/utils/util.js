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

module.exports = {
  covertToStartsArray: covertToStartsArray,
}