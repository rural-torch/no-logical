//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    
    focu:15,
    fans:"1.5w",
    mark:60,
    id:"856942333",
    mes:20,
    bu1:"bu",
    bu2:"",
    bu3:"",
    condition1:true,
     condition2:false,
     condition3:false,
    video:[1,2,3,4,1,1,1,1,1],
    video2:[1,2,3,4,5,1,1,1,1],
    tasklist:[{
      date:"2021-1-8 9:00",
      title:"标题标题标题标题标题标题标题标题标题",
      name:"胡乱起的名字",
      place:"四川甘孜",
      emark:30,
      si:"执行中",
      fi:false
    },
    {
      date:"2021-1-8 9:00",
      title:"标题标题标题标题标题标题标题标题标题",
      name:"胡乱起的名字",
      place:"四川甘孜",
      emark:40,
      si:"已完成",
      fi:true
    },
    {
      date:"2021-1-8 9:00",
      title:"标题标题标题标题标题标题标题标题标题",
      name:"胡乱起的名字",
      place:"四川甘孜",
      emark:20,
      si:"已完成",
      fi:true
    }
  ]

  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
},
  bt1:function(){
    this.setData({
      bu1:"bu",
      bu2:"",
      bu3:"",
      condition1:true,
     condition2:false,
     condition3:false
    })
  },
  onLoad: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
    },
    
  bt2:function(){
    this.setData({
     bu1:"",
     bu2:"bu",
     bu3:"",
     condition2:true,
     condition1:false,
     condition3:false
    })
  },
  bt3:function(){
    this.setData({
     bu1:"",
     bu2:"",
     bu3:"bu",
     condition3:true,
     condition2:false,
     condition1:false
    })
  },
  bindfocus: function(){
   wx.navigateTo({
      url: '/pages/pagemy/focus',
    })
  },
  bindfans: function(){
    wx.navigateTo({
      url: '/pages/pagemy/fans',
    })
  },
  bindmark:function(){
    wx.navigateTo({
      url: '/pages/pagemy/honormark',
    })
  },
  bindmess:function(){
    wx.navigateTo({
      url: '/pages/pagemy/message',
    })
  },
  bindsev:function(){
    wx.navigateTo({
      url: '/pages/pagemy/service',
    })
  },
  bindtask:function(){
    wx.navigateTo({
      url: '/pages/pagemy/task',
    })
  }
})
