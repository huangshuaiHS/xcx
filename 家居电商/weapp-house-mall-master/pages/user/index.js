//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    userInfo: null,
    dengl:true
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
    
    this.setData({
      userInfo:e.detail.userInfo,
      dengl:false
    });
  }
})
