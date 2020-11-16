// pages/swiper2/swiper2.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.systemType()
  },
  
  scroll (event) {
    console.log(event)
  },
 
  reactBottom () {
    console.log('触底-加载更多')
  },
 
  // 获取设备屏幕高度
  systemType () {
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = res.windowHeight
 
        this.setData({
          windowHeight: windowHeight
        })
 
        console.log(res)
      }
    })
  },
 
  tabChange (event) {
    this.setData({
      tab_index: event.detail.current
    })
    console.log(event)
  },
 
  // tab栏选择
  selectTab (event) {
    this.setData({
      tab_index: event.currentTarget.dataset.index
    })
   
  },
 
  // 返回顶部
  backTop () {
    let tab_index = this.data.tab_index
 
    this.setData({
      ['scrollTop' + tab_index]: 0
    })
  },
})