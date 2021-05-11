const app = getApp()

Page({
  data:{
    cells: [],
    genderArray: ['女', '男'],
  },
  
  onShow:function(options){
    var that = this
    wx.request({//get请求
      url: 'https://duing.site/user/getUser?userid='+app.globalData.uid, //服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        var data=res.data
        var cells = [[],[],[],[]]
        cells[0].push({title: '头像', text: data.headimg == '' ? '未填写' : data.headimg, access: false, fn: ''})
        cells[1].push({title: '昵称', text: data.username == '' ? '未填写' : data.username, access: false, fn: ''})
        cells[1].push({title: '性别', text: data.gender === '' ? '未填写' : that.data.genderArray[data.gender], access: false, fn: ''})
        cells[1].push({title: '职业', text: data.job == '' ? '未填写' : data.job, access: false, fn: ''})
        cells[1].push({title: '地点', text: data.address == '' ? '未填写' : data.address, access: false, fn: ''})
        cells[2].push({title: '手机号', text: data.phone == '' ? '未填写' : data.phone, access: false, fn: ''})
        cells[3].push({title: '个性签名', text: data.sign == '' ? '未填写' : data.sign, access: false, fn: ''})
        that.setData({
          cells: cells
        })
      }
    })
  }
})