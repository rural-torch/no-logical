// pages/fans/f.js
var app=getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    fanslist:[],
    isfocus:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({//get请求
      url: 'https://duing.site/fans/getUserAllFans?userid='+app.globalData.uid, ////服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
        that.setData({
          fanslist:res.data.reverse()
        })
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })
  },
  foc:function(e){
  var that = this;
  var data = e.target.dataset.userid;
  var isf= e.target.dataset.isfocus;
  var isfocus=that.data.isfocus;
  wx.getStorage({
    key: 'job',
    success: function (res) {
      if (isf === 0) {
        wx.request({
          url: 'https://duing.site/fans/addFans',
          method: 'POST',
          data: {
            userid: data,
            fansid: app.globalData.uid
          },
          success(res) {
            that.setData({
              isfocus:1,
            });
            console.log(app.globalData.uid)
            console.log(data)
          },
          fail(res) {
            // console.log(res);
          }
        })
      }    
      if (isf != 0) {
        
        wx.request({
          url: 'https://duing.site/fans/removeFans',
          method: 'POST',
          data: {
            userid: data,
            fansid: app.globalData.uid
          },
          success(res) {
            that.setData({
              isfocus: 0,
            })
            console.log(app.globalData.uid)
            console.log(data)
          },
          fail(res) {
            // console.log(res);
          }
        })
      }
    },
    fail: function (err) {
      wx.showToast({
        title: '请先进行注册',
        icon: "loading",
      })
    },
  })},
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})