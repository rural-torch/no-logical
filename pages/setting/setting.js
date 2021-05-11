var app = getApp()
Page({
  data:{
    cells: [
      [{title: '个人资料', text: '', access: true, fn: 'viewPersonInfo'}],
      [
        {title: '实名认证', text: '', access: true, fn: 'nameauth'}
      ],
      [{title: '关于', text: '', access: true, fn: 'viewAbount'}],
      [{title: '注销', text: '', access: true, fn: 'dele'}]
    ]
  },
  onLoad:function(options){},
  viewPersonInfo: function(){
		wx.redirectTo({
			url: "../setting/personInfo/personInfo"
		})
  },
  viewSystemInfo: function(){
		wx.redirectTo({
			url: "../systemInfo/systemInfo"
		})
  },
  dele:function(){
    wx.showModal({
      title: 
      '提示'
      ,
      content: 
      '确定要注销账户吗？您的历史数据可能会丢失。'
      ,
      success: 
      function
      (res) {
      if 
       (res.confirm) {
        wx.request({
          url: 'https://duing.site/user/deleteUser?userid='+app.globalData.uid,
          method: 'GET',
          success(res) {
            wx.showToast({
              title: '成功注销！',
              icon: 'none',
              duration: 1500
            })
           wx.reLaunch({
             url: '/pages/index/index',
           })
          },
          fail(res) {
            // console.log(res);
          }
        })
      }
      }
      })
  },
  viewLocation: function(){
		wx.redirectTo({
			url: "../location/location"
		})
  },
  clearStorage: function() {
    wx.showModal({
      title: '确认要清除',
      content: '清除缓存会删除浏览历史和收藏及个人资料',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage()
          app.initStorage()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },
  viewAbount: function() {
		wx.redirectTo({
			url: "../about/about"
		})
  }
})