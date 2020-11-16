//index.js
var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
var sta = require("../../utils/statistics.js")
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,//是否显示面板指示点
    autoplay: true,  //是否自动切换
    interval: 5000, //自动切换时间
    duration: 1000,  //滑动时间
    
    buyCount:1
    },
    onLoad:function(options){
        var id = options.id;
        this.getGoodsList(id);
    },
    onShow:function (){
        sta();
    },
    getGoodsList:function(id){
            var that = this;
            var data = {appid:config.APPID,id:id}
            // http.httpGet("?c=goods&a=getGoodsInfo" ,data,function(res){
            //         if(res.code == '200' && res.msg == 'success'){
            //             var goods = res.data;
            //             that.setData({goods:goods});
            //         }
            // });
            that.setData({
                goods:{
                    id:"0",
                    thumb:[
                        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1147502441,1106223242&fm=26&gp=0.jpg",
                        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2202773305,858084832&fm=11&gp=0.jpg"
                    ],
                    title:"西瓜",
                    price:"5",
                    description:"5元/1斤"
                  }
            })
    },
    buyCount:function(e){
        var id = e.currentTarget.id;
        var count = this.data.buyCount;
        if(id == "add"){
            count = (count>0)?count+1:1
        }else{
            count = (count>0)?count-1:0 
        }
        this.setData({buyCount:count});
        this.buyNow('');
    },

    buyNow:function(e){

          var count = this.data.buyCount;
          count = (count>0)?count:1;
          var goods = this.data.goods;
          //取出购物车商品
          goods = {id:goods.id,
            name:goods.title,
            img:goods.thumb,
            price:goods.price,
            buycount:count};
          try{
                var allGoods =wx.getStorageSync('shoppingcar')
                if(allGoods == ""){
                   allGoods = []
                }
                //检查购物车是否有此商品
                var hasCount = 0;
                for(var i=0;i<allGoods.length;i++){
                    var temp = allGoods[i];
                    if(temp.id == goods.id){
                      hasCount = temp.buycount;
                      allGoods.splice(i, 1);
                      break;
                    }
                }
                goods.buycount = goods.buycount + hasCount;
                allGoods.push(goods);
                wx.setStorageSync('shoppingcar', allGoods);
          }catch(m){
                console.log('立即购买失败!');
          }
          if(e != ''){
                var currentPagess = getCurrentPages();
                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                    success: function(res){
                    wx.navigateTo({url: '../settlement/index'})
                    }
                })
          }
    }
})