// pages/task/t.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    see:true,
  taskinner:[{
  name:"胡乱起的名字",
  id:"856942333",
  place:"四川甘孜",
  mark:30,
  time:"2021-4-8",
  title:"标题标题标题标题标题标题标题标题标题",
  kind:"乡村美食",
  pho:[1,2,3],
  timeres:"2021-12-5日前完成",
  main:"长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容",
  fi:false,
  see:true
  },
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindbox3:function(){
  this.setData({
  see:false,
  })
  },
  c:function(){
    this.setData({
      see:true,

   })
  },
  m:function(){
    this.setData({
      see:true
   })
  },
  modal: function (e) {
    var self = this;
    this.setData({ modal: (e && e.currentTarget.dataset.modal) || "", input: self.data.user });
    // 这里对modal的赋值是关键
},
  onLoad: function (options) {

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