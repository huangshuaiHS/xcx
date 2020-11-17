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
    
    buyCount:1,
    IndexList:[
        {
          id:"0",
          thumb:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2202773305,858084832&fm=11&gp=0.jpg",
          title:"西瓜",
          price:"5"
        },
        {
          id:"1",
          thumb:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=139113860,127951727&fm=26&gp=0.jpg",
          title:"橙子",
          price:"8"
        },
        {
          id:"2",
          thumb:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=282156732,749984537&fm=26&gp=0.jpg",
          title:"草莓",
          price:"15"
        },
        {
          id:"3",
          thumb:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2033652965,2723161418&fm=26&gp=0.jpg",
          title:"苹果",
          price:"8"
        },
        {
          id:"4",
          thumb:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2710632269,794544261&fm=26&gp=0.jpg",
          title:"梨子",
          price:"4"
        },
        {
          id:"6",
          thumb:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355899357,2357718018&fm=11&gp=0.jpg",
          title:"香蕉",
          price:"7"
        },
        {
          id:"7",
          thumb:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2372429943,1502293666&fm=11&gp=0.jpg",
          title:"芒果",
          price:"12"
        },
        {
          id:"8",
          thumb:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=139113860,127951727&fm=26&gp=0.jpg",
          title:"柠檬",
          price:"8"
        }
      ]
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
            //var data = {appid:config.APPID,id:id}
            // http.httpGet("?c=goods&a=getGoodsInfo" ,data,function(res){
            //         if(res.code == '200' && res.msg == 'success'){
            //             var goods = res.data;
            //             that.setData({goods:goods});
            //         }
            // });
            var list = that.data.IndexList;
            for(var i=0;i<list.length;i++){
                if(id === list[i].id){
                    that.setData({
                        goods:list[i]
                    })
                    break;
                }
            }
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

    gwc:function(){
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
              wx.showToast({
                title: '成功加入购物车',  // 标题
                icon: 'success',   // 图标类型，默认success
                duration: 1000   // 提示窗停留时间，默认1500ms
            })
        }catch(m){
              console.log('立即购买失败!');
        }
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
                // var allGoods =wx.getStorageSync('shoppingcar')
                // if(allGoods == ""){
                //    allGoods = []
                // }
                // //检查购物车是否有此商品
                // var hasCount = 0;
                // for(var i=0;i<allGoods.length;i++){
                //     var temp = allGoods[i];
                //     if(temp.id == goods.id){
                //       hasCount = temp.buycount;
                //       allGoods.splice(i, 1);
                //       break;
                //     }
                // }
                // goods.buycount = goods.buycount + hasCount;
                // allGoods.push(goods);
                //获取立即购买的数据  这儿不要购物车里的数据
                wx.setStorageSync('ljgm', goods);
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