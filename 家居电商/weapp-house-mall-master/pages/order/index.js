//index.js
var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
var sta = require("../../utils/statistics.js");
//获取应用实例
var app = getApp()
Page({
  data: {
    orderList:[],
  },
 onLoad: function () {
    var that = this;
   
  },
  onShow:function(){
    sta();
      this.getlist();
  },
  getlist:function(){
    var that = this;
    //var data = {appid:config.APPID,userid:this.data.userInfo.id/*,page:'',pageSize:'',order:'id'*/}
    // http.httpGet("?c=order&a=getOrderList" ,data,function(res){
    //         if(res.code == '200' && res.msg == 'success'){
    //              var orderList = res.data.list;
    //              that.setData({orderList:orderList});
    //         }
    // });
    
    // that.setData({
    //   orderList:[wx.getStorageSync("ljgm")]
    // });
    var orderList = [
      {
        status:0,
        code:123321,
        goods:[
          {
            thumb:"../../images/dd.png"
          }
        ],
        amount:100,
        id:1
    },
    {
      status:1,
      code:1111222,
      goods:[
        {
          thumb:"../../images/dd.png"
        }
      ],
      amount:150,
      id:2
  }
  ]
  that.setData({
      orderList
   });

  },
  pay:function(e){

      wx.showToast({
        title: '订单支付成功!',
        icon: 'success',
        duration: 1000
      })
      //支付成功订单
      var orderid = e.target.id;
      this.updateOrderInfo(orderid,1);
  },
  cancelOrder:function (e){
     wx.showToast({
        title: '取消订单成功!',
        icon: 'success',
        duration: 1000
      })
    //取消订单
     var orderid = e.target.id;
     this.updateOrderInfo(orderid,9);
    
  },
  updateOrderInfo:function(orderid,status){
            var that = this;
            //var data = {appid:config.APPID,userid:this.data.userInfo.id,status:status,id:orderid}
            // http.httpGet("?c=order&a=updateOrder" ,data,function(res){
            //         if(res.code == '200' && res.msg == 'Edit success'){
            //             var orderList = that.data.orderList;
            //             for(var i= 0 ;i<orderList.length;i++){
            //                   if(orderList[i].id == orderid){
            //                       orderList[i].status = status;
            //                       break;
            //                   }
            //             }
            //             that.setData({orderList:orderList});
            //         }
            // });
  }
})
