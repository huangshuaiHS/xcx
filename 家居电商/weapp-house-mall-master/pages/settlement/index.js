//logs.js
var config = require('../../config.js')
var http = require('../..//utils/httpHelper.js')
var util = require('../../utils/util.js')
var sta = require("../../utils/statistics.js");
//获取应用实例
var app = getApp()
Page({
  data: {
    allGoods: {},
    sumPrice: 0,
    address: '',
    fkm:false
  },
  onLoad: function () {
    var that = this;
    // app.getUserInfo(function (userInfo){
    //   console.log(userInfo)
    //     that.setData({
    //           userInfo:userInfo
    //       });
    // })

  },
  onShow: function () {
    this.getDefaultAddress();
    sta();
    var allGoods = wx.getStorageSync('shoppingcar');
    var ljgm = wx.getStorageSync('ljgm');
    //判断是否是立即购买
    if (ljgm != null && ljgm != "") {
      //计算数量x单价=总价
      var sumPrice = util.accMul(ljgm.price, ljgm.buycount);
      this.setData({
        allGoods: [ljgm],
        sumPrice: sumPrice
      });
      return
    }
    var sumPrice = 0;
    for (var i = 0; i < allGoods.length; i++) {
      var price = allGoods[i].price;
      var count = allGoods[i].buycount;
      price = util.accMul(price, count);
      //allGoods[i].pay = price;
      sumPrice = util.accAdd(sumPrice, price);
    }
    this.setData({
      allGoods: allGoods,
      sumPrice: sumPrice
    });
  },

  getDefaultAddress: function () {
    //获取地址
    var that = this;
    //var data = {appid:config.APPID,userid:this.data.userInfo.id};
    // http.httpGet("?c=user&a=getAddrList" ,data,function(res){
    //     if(res.code == '200' && res.msg == 'success'){
    //         var allAddress = res.data.list;
    //         var address = '';
    //         for(var i=0;i<allAddress.length;i++){
    //             if( allAddress[i].isfirst == 1){
    //                 address = allAddress[i];
    //                 break;
    //             }
    //         }
    //         if(address == '' && allAddress.length > 0){
    //             address = allAddress[0];
    //         }
    //         that.setData({address:address});
    //     }
    // });
    that.setData({
      address: wx.getStorageSync('allAddress')[0]
    });

  },
  creatOrder: function (amount, discount, payamount, gid, number, addressid, callback) {
    var data = {
      appid: config.APPID,
      userid: this.data.userInfo.nickName,
      amount: amount,
      discount: discount,
      payamount: payamount,
      gid: gid,
      status: 0,
      addressid: addressid,
      number: number
    };
    // http.httpGet("?c=order&a=createOrder" ,data,function(res){
    //     if(res.code == '200' && res.msg == 'success'){
    //         //订单创建成功
    //          typeof callback == "function" && callback(res.data)
    //     }else{
    //         //订单创建失败
    //          typeof callback == "function" && callback('')
    //     }  
    // })
    console.log(data)
  },
  payOrderSuccess: function (orderid, status, callback) {
    var data = {
      appid: config.APPID,
      userid: this.data.userInfo.id,
      id: orderid,
      status: status
    };
    // http.httpGet("?c=order&a=updateOrder" ,data,function(res){
    //     if(res.code == '200' && res.msg == 'success'){
    //         //订单支付成功
    //          typeof callback == "function" && callback(res.data)
    //     }else{
    //         //订单支付失败
    //          typeof callback == "function" && callback('')
    //     }  
    // })
  },
  toAddress: function () {
    //   wx.navigateTo({url: '/pages/address/index'})
    var that = this;

    wx.chooseAddress({
      success(res) {
        var list = [{
          id: res.telNumber,
          isfirst: 1,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          username: res.userName,
          telNumber: res.telNumber
        }]
        that.setData({
          address: list
        })
        wx.setStorageSync('allAddress', list)
        // provinceName+cityName+countyName+detailInfo+" "+telNumber+userName
        console.log(res)
      }
    })
    //获取收获地址

    console.log("进来了")
  },


  settlement: function () {

    var that = this;


    //判断用户是否登录
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        });
      }
    })
    //检查地址是否为空
    if (this.data.address == "" || this.data.address == null) {
      wx.showModal({
        title: '提示',
        content: '请您先添加邮寄地址！',
        success: function (res) {
          if (res.confirm) {
            that.toAddress();
          }
        }
      })
      return;
    }
    setTimeout(function () {

      if (that.data.userInfo == null) {
        wx.showToast({
          title: '请您先登陆',
          icon: 'none',
          duration: 1500
        })
        return;
      }

      //继续生成订单
      var addressid = that.data.address.id;
      var allGoods = that.data.allGoods;
      var gid = '',
        number = '';
      allGoods.forEach(function (goods) {
        if (gid == '') {
          gid = goods.id;
          number = goods.buycount;
        } else {
          gid = gid + ',' + goods.id;
          number = number + ',' + goods.buycount;
        }
      })
      /*wx.showToast({
              title: '正在下单...',
              icon: 'loading',
              duration: 1000
              });*/
      that.creatOrder(that.data.sumPrice /*amount*/ , that.data.sumPrice /*discount*/ , 0 /*payamount*/ , gid, number, addressid,
        function (orderid) {
          if (orderid != '') {
            try {
              wx.setStorageSync('shoppingcar', '');
            } catch (e) {
              console.log('清空购物车失败');
            }
            console.log('下单成功，订单号为' + orderid)
            wx.redirectTo({
              url: '/pages/order/index'
            })

            /*wx.showToast({
                title: '下单成功',
                icon: 'success',
                duration: 1000
            });*/
            //此处写支付

          }
        });
      wx.showToast({
        title: '请等待...',
        icon: 'loading',
        duration: 1500
      });
      console.log("------------------")
      //清除立即购买
      wx.setStorageSync('ljgm', '');

      that.setData({
        fkm:true
      })
      wx.previewImage({
        current: '../../images/fkm.jpg', // 当前显示图片的http链接
        urls: ["../../images/fkm.jpg"] // 需要预览的图片http链接列表
      })
    }, 500) //延迟时间 这里是1秒

  }
})