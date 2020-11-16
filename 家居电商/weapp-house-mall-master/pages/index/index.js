var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    indicatorDots: false,//是否显示面板指示点
    autoplay: false,  //是否自动切换
    current:0,      //当前所在index 
    interval:0, //自动切换时间
    duration: 200,  //滑动时间
    clas:["action"],
    goodsData:[{
                title:"推荐"
                },{
                  title:"商品"
                },{
                  title:"分类"
                }
              ],
    bander:[
      {
        cid:"0",
        image:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2894050254,1298142909&fm=26&gp=0.jpg",
      },
      {
        cid:"1",
        image:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2949620428,436075594&fm=26&gp=0.jpg",
      },
      {
        cid:"2",
        image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819687348,2126727518&fm=26&gp=0.jpg",
      }
    ],
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
        id:"6",
        thumb:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2372429943,1502293666&fm=11&gp=0.jpg",
        title:"芒果",
        price:"12"
      },
      {
        id:"6",
        thumb:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=139113860,127951727&fm=26&gp=0.jpg",
        title:"柠檬",
        price:"8"
      }
    ]
  },
  onLoad:function(){
   
   
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success (res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 18,
    //       name:"重庆市",   
    //       address:"要把钱",
    //       success(res){
    //         console.log(res)
    //       }
    //     })
    //   } 
    //  })



      var that = this;
      app.getUserInfo(function(userInfo){
          that.setData({userInfo:userInfo});
          that.getGoodsType();
      })
      //  http.httpGet("?c=banner&a=getBanner",{
      //   appid:config.APPID,
      // },function (res){
      //   console.log(res);
      //     that.setData({
      //       bander:res.data
      //     });
      // });
        //获取商品列表
        that.setData({
          bander:that.data.bander
        });
      that.getGoodsList("",'1,2',function(list){
        console.log(2)
          that.setData({
            //IndexList:list
            IndexList:that.data.IndexList
          });
      })

    
  },
  onShow:function(){
  
        sta();
        app.getAppInfo(
          function (appInfo){
                wx.setNavigationBarTitle({
                  title: appInfo.title
                })
            }
        );
        
  },
  getGoodsType:function(){
        var that = this;
        var data = {appid:config.APPID,userid:this.data.userInfo.id}
        // http.httpGet("?c=type&a=getTypeList" ,data,function(res){
        //     if(res.code == '200' && res.msg == 'success'){
        //         var list = res.data.list;
        //         var goodsData = [{type:0,title:"全部"}];
        //         for(var i=1;i<list.length+1;i++){
        //             goodsData[i]= {type:list[i-1].id,title:list[i-1].typename};
        //         }
        //         that.setData({goodsData:goodsData});
        //         that.loadTabGoodsList(0);
                 
        //     }
        // });
  },
  getGoodsList:function(type,status,callback){
        var that = this;
        var data = {appid:config.APPID,typeid:type,status:status}
        if(status != '' || status != 0){
            //data.status = status;
        }
        // http.httpGet("?c=goods&a=getGoodsList" ,data,function(res){
        //         if(res.code == '200' && res.msg == 'success'){
        //             var list = res.data.list;
        //             typeof callback == "function" && callback(list)
        //         }
        // });
       
        
    
  },
  loadTabGoodsList:function(index){
        var that = this;
        var goodsData = that.data.goodsData;
        if(goodsData[index].banner == undefined || goodsData[index].list ==undefined){
              var type = goodsData[index].type; 
              //获取推荐商品
              this.getGoodsList(type,'2',function(list){
                    var goods = that.data.goodsData;
                    goods[index].banner = list;
                    that.setData({goodsData:goods});
              })
               //获取商品列表
              this.getGoodsList(type,'1,2',function(list){
                    var goods = that.data.goodsData;
                    goods[index].list = list;
                    that.setData({goodsData:goods});
              })
            
        }
        
  },
  //事件处理函数
  switchs: function(e) {
    var index = e.detail.current;
    this.loadTabGoodsList(index);
    this.setData({clas:[]});
    var data = [];
    data[index] = "action";
    this.setData({clas:data});
  },
  xun:function (e){
      var index = e.target.dataset.index;
      this.setData({current:index});
      this.setData({
        bander:this.data.bander,
        IndexList:this.data.IndexList
      })
      //this.loadTabGoodsList(index);
  },
  todetail:function(e){
        var id = e.currentTarget.id;
        wx.navigateTo({
          url: '../detail/index?id='+id,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  },
  //处理分页
  bindlower:function(e){
    
  }
  
})
