//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    userInfo: null,
    dengl:true
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('个人中心下拉刷新?')
    // 显示标题栏进度条效果
    wx.showNavigationBarLoading();
    setTimeout(function(){
      //关闭下拉刷新
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },1000);
    // 取消页面刷新动画
  },
  onShow:function (){
    var that = this
    sta();
     //获取当前用户
    // wx.getUserInfo({
    //   success: function(res) { 
    //     console.log(res.userInfo)
    //     that.setData({
    //       userInfo:res.userInfo
    //     })
    //   }
    // })
  }, 
  onLoad: function () {
    
    // var that = this
    // app.getUserInfo(function (userInfo){
    //      that.setData({
    //           userInfo:userInfo
    //       });
    //       console.log(userInfo)
    // })
  },
  userdata:function (){
      wx.navigateTo({url: "/pages/userdata/index"})
  },
  address: function (){
      wx.navigateTo({url:"/pages/address/index"});
      
  },
  
  order:function (){ 
    if(this.data.userInfo == null){
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500
      })
      return;
    }
    //订单
    wx.navigateTo({url: "/pages/order/index"})
  },
  keep:function () {
    //收藏
  },
  share:function (){
    //分享
  },
  userInfoHandler:function(e){
    if(e.detail.userInfo == null || e.detail.userInfo == ""){
      return;
    }
    this.setData({
      userInfo:e.detail.userInfo,
      dengl:false
    });
  }
})
