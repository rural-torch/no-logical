// pages/jumpto/index.js
var app = getApp()
Page({
 
    data: {
      avatarUrl:'',
      nickname:'',
      title:'',
      time:'',
      src: '',
      showimg:[],
      likes:0,
   
    },
    addlove: function (e) {
      var that = this;
      var data = that.data;
      var islike=data.islike;
      var likes=data.likes;
      var topicid=that.data.topicid;
      var i = 0;
      var j = 0;
      var k = 0;
      if (app.globalData.avatarUrl!=''){
          if (islike === 0) {
          
            wx.request({
              url: 'https://duing.site/likeTopic/giveLike',
              method: 'POST',
              data: {
                userid: app.globalData.uid,
                topicid: that.data.topicid
              },
              success(res) {
                that.setData({
                  islike:1,
                  likes:likes+1
                });
              },
              fail(res) {
                // console.log(res);
              }
            })
          }
          if (islike != 0) {
           
            wx.request({
              url: 'https://duing.site/likeTopic/removeLike',
              method: 'POST',
              data: {
                userid: app.globalData.uid,
                topicid: that.data.topicid
              },
              success(res) {
                that.setData({
                  islike: 0,
                  likes:likes-1
                })
              },
              fail(res) {
                // console.log(res);
              }
            })
          }
        }
        else{
          wx.showToast({
            title: '请先进行注册',
            icon: "loading",
          })
        }

      
    },
    addfoc: function (e) {
      var that = this;
      var data = that.data;
      var isfocus=that.data.isfocus;
      if (app.globalData.avatarUrl!='') {
          if (isfocus === 0) {
            wx.request({
              url: 'https://duing.site/fans/addFans',
              method: 'POST',
              data: {
                userid: that.data.userid,
                fansid: app.globalData.uid
              },
              success(res) {
                that.setData({
                  isfocus:1,
                });
                console.log(app.globalData.uid)
                console.log(that.data.userid)
              },
              fail(res) {
                // console.log(res);
              }
            })
          }    
          if (isfocus != 0) {
            
            wx.request({
              url: 'https://duing.site/fans/removeFans',
              method: 'POST',
              data: {
                userid: that.data.userid,
                fansid: app.globalData.uid
              },
              success(res) {
                that.setData({
                  isfocus: 0,
                })
                console.log(app.globalData.uid)
                console.log(that.data.userid)
              },
              fail(res) {
                // console.log(res);
              }
            })
          }
        }
        else {
          wx.showToast({
            title: '请先进行注册',
            icon: "loading",
          })
        }

     
    },
   
  onLoad: function (options) {
    var that=this
    var index = options.index
    console.log(options.topicid)
    wx.request({
      　　url: 'https://duing.site/topic/getTopicDetail', //服务器地址
      header: {
        　　'content-type': 'application/json'
        　　},
        method: 'POST',
        data: {
          userid:app.globalData.uid,
	        topicid:options.topicid
          　　},
      　　success: function (res) {
      　　console.log(res)
      var i=0
      var images=[]
      that.setData({
        showimg:res.data.img,
        avatarUrl:res.data.headimg,
       nickname:res.data.username,
       title:res.data.title,
       time:res.data.time,
       likes:res.data.likes,
       islike:res.data.islike,
       isfocus:res.data.isfocus,
       topicid:res.data.topicid,
       userid:res.data.userid,
       isimg:res.data.isimg,
      })

      　　}
      　　})
  },

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
{/* <view style="display:flex">
<image src="https://duing.site/saveFiles/images/评.png" style="height:40rpx;width:40rpx;margin-left:15rpx;margin-top:20rpx"></image>
<view style="margin-top:18rpx;margin-left:22rpx;font-size:smaller;color:#cdcdcd;font-weight:200">16</view>
</view> 
      <view style="margin-top:-22rpx;margin-left:22rpx;font-size:smaller;color:#cdcdcd;font-weight:200">6</view>
*/}
