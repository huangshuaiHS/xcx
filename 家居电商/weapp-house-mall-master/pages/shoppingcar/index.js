//logs.js
var util = require('../../utils/util.js')
var sta = require("../../utils/statistics.js");
Page({
  data: {
    allGoods:{},
    sumPrice:0
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('购物车下拉刷新?')
    // 显示标题栏进度条效果
    wx.showNavigationBarLoading();
    setTimeout(function(){
      //关闭下拉刷新
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },1000);
    // 取消页面刷新动画
  },
  onLoad: function () {
  
  },
  onShow:function (){
    sta();
    this.showAllGoods();
  },
  settlement:function (){
    wx.navigateTo({url: '/pages/settlement/index'})
  },
  jia:function (e){
    this.jiaj(e,true);
  },
  jian:function (e){
    this.jiaj(e,false);
  },
  showAllGoods:function (){

    var allGoods =  wx.getStorageSync('shoppingcar');
    var sumPrice = 0;
    for(var i=0;i< allGoods.length;i++){
        var price = allGoods[i].price;
        var count =  allGoods[i].buycount;
        price = util.accMul(price,count);
        sumPrice = util.accAdd(sumPrice,price);
    }

    this.setData({
      allGoods:allGoods,
      sumPrice:sumPrice
    });
  },
  toDetail:function(e){
      var id = e.currentTarget.dataset.id;
        wx.redirectTo({
          url: '../detail/index?id='+id}
        )
  },
  jiaj:function (e,boo){
    var id = e.currentTarget.dataset.id;
    var s = 0;
    var allGoods = this.data.allGoods;
    for(var i=0;i<allGoods.length;i++){
        if(allGoods[i].id==id){
            if(boo){
                s = allGoods[i].buycount+1;
            }else{
                s = allGoods[i].buycount-1;
            }
            //最低值不得低于1
            if(1>s){
                allGoods.splice(i, 1);
            }else{
                allGoods[i].buycount = s;
            }
            break;
          }
    }
    wx.setStorageSync('shoppingcar', allGoods);
    this.setData({
      allGoods:allGoods
    });
    this.showAllGoods();
  }
})
