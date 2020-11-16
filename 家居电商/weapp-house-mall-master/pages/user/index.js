//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    userInfo: {},
  },
  onShow:function (){
    sta();
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo){
         that.setData({
              userInfo:userInfo
          });
    })
    wx.openSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        wx.getUserInfo({
          success: function(res) {
            console.log(res.userInfo) 
          }
        })
      }
    })
    
   
   

    wx.getSetting({
      success (res){
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo) 
            }
          })
        }
      }
    })
  
   
  },
  userdata:function (){
      wx.navigateTo({url: "/pages/userdata/index"})
  },
  address: function (){
      wx.navigateTo({url:"/pages/address/index"});
  },
  
  order:function (){
    //订单
    wx.navigateTo({url: "/pages/order/index"})
  },
  keep:function () {
    //收藏
  },
  share:function (){
    //分享
  }
})
