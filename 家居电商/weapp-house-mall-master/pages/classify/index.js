Page({
  data: {
    cateItems: [{
        cate_id: 1,
        cate_name: "苹果",
        ishaveChild: true,
        children: [{
          child_id: 1,
          name: '小苹果',
          image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1621431005,1388131397&fm=26&gp=0.jpg"
        },{
          child_id: 2,
          name: '红苹果',
          image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2467399165,2458535836&fm=26&gp=0.jpg"
        }]
      },
      {
        cate_id: 2,
        cate_name: "香蕉",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '进口香蕉',
            image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2293980408,4239562480&fm=26&gp=0.jpg"
          },
          {
            child_id: 2,
            name: '一个香蕉',
            image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1748720342,2199604140&fm=26&gp=0.jpg"
          },
          {
            child_id: 3,
            name: '青香蕉',
            image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2841365665,36508706&fm=26&gp=0.jpg"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "西瓜",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '半西瓜',
            image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3662167854,144343282&fm=26&gp=0.jpg"
          },
          {
            child_id: 2,
            name: '进口西瓜',
            image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1159913768,2283097008&fm=26&gp=0.jpg"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "葡萄",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('商品分类下拉刷新?')
    // 显示标题栏进度条效果
    wx.showNavigationBarLoading();
    setTimeout(function () {
      //关闭下拉刷新
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
    // 取消页面刷新动画
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  xqy(){
    wx.showToast({
      title: '该功能开发中,敬请期待...',
      icon: 'none',
      duration: 1500
    })
  }
})