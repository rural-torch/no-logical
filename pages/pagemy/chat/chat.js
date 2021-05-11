// pages/chat/chat.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
 
/**
 * 初始化数据
 */
function initData(that) {
 inputVal = '';
 
 msgList = [{
   speaker: 'server',
   contentType: 'text',
   content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
  },
  {
   speaker: 'customer',
   contentType: 'text',
   content: '我怕是走错片场了...'
  }
 ]
 that.setData({
  msgList,
  inputVal
 })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
  focus: false,
  keyfocus:true,
  ifplus:false,
  ifmess:false,
  scrollHeight: '100vh',
  inputBottom: 0,
  inputVal:''
  },
  cleanInput:function() {
    
    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值
    this.setData({
     inputVal: this.data.inputVal
    })
    },
  sendme:function(e){
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: this.data.inputVal
     })
     inputVal = '';
     this.setData({
      msgList,
      inputVal,
      ifmess:false,
     });
  },
  bindplus: function(){
   
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  if (this.data.ifplus==true){
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0,
      keyfocus:false,
      toView: 'msg-' + (msgList.length - 1),
      ifplus:false
  })
  }
  else{
    keyHeight = "235";
    this.setData({
     scrollHeight: (windowHeight - keyHeight) + 'px',
     keyfocus:false,
     toView: 'msg-' + (msgList.length - 1),
     inputBottom: keyHeight + 'px',

    })
    
    this.setData({
      ifplus:true
    })
  }
},
iffocus:function(res){
  let that=this
 if(res.detail.value==""){
 that.setData({
   ifmess:false,
   keyfocus:true
 })
 }
 else{
  that.setData({
    ifmess:true,
    inputVal:res.detail.value,
    keyfocus:true
  })
 }
},
adddetial:function(e){
  wx.navigateTo({
    url: '/pages/report/index',
  })
},
adddetial1:function(e){
  wx.navigateTo({
    url: '/pages/askhelp/help',
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this);
    this.setData({
     cusHeadIcon: app.globalData.avatarUrl,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
     scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
     toView: 'msg-' + (msgList.length - 1),
     inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);
   
   },
   
   //失去聚焦(软键盘消失)
   blur: function(e) {
    this.setData({
     scrollHeight: '100vh',
     inputBottom: 0
    })
    this.setData({
     toView: 'msg-' + (msgList.length - 1),
    })
   
   },
   
   /**
    * 发送点击监听
    */
   sendClick: function(e) {
    msgList.push({
     speaker: 'customer',
     contentType: 'text',
     content: e.detail.value
    })
    inputVal = '';
    this.setData({
     msgList,
     inputVal
    });
   
   
   },
   
   /**
    * 退回上一页
    */
   toBackClick: function() {
    wx.navigateBack({})
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