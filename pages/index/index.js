var app = getApp()
var columnsleft = new Array();
var columnsright = new Array();

Page({
  //不需要渲染到wxml的数据存储在jsData中
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    columnsleft: new Array(7).fill(0).map(() => new Array()),
    columnsright: new Array(7).fill(0).map(() => new Array()),
    tempPics: [],
    showModalStatus: false,
    topicid:0,
    avatarUrl: '',
    nickname: '',
    flag: 0,
    hasChange: false,
    navbar: ['推荐', '关注', '风景', "美食", "活动", "文化", "其他"],
    currentTab: 0,
    thing: '',
    newArray: [],
    shoopingtext: "", //清空搜索框,
    typeIndex:0,
    islike:0,
  },
  navbarTap: function(e) {
    console.log(this)
    const typeIndex = e.currentTarget.dataset.idx;
    const type = this.data.navbar[e.currentTarget.dataset.idx];
    console.log(typeIndex, type)
    if (this.data.columnsleft[typeIndex].length === 0) {
      this.loadData(typeIndex)
    }
    this.setData({
      currentTab: typeIndex,
      typeIndex : e.currentTarget.dataset.idx
    })
  },
  //获取图片尺寸数据
  loadPic: function (e) {
    var that = this,
      data = that.data,
      tempPics = data.tempPics,
      index = e.currentTarget.dataset.index
    if (tempPics[index]) {
      //以750为宽度算出相对应的高度
      tempPics[index].height = e.detail.height * 750 / e.detail.width
      tempPics[index].isLoad = true
    }
    that.setData({
      tempPics: tempPics,
    }, function () {
      that.finLoadPic()
    })
  },
  //图片加载错误处理

  loadPicError: function (e) {
    var that = this,
      data = that.data,
      tempPics = data.tempPics,
      index = e.currentTarget.dataset.index
    if (tempPics[index]) {
      //图片加载错误时高度固定750，展示为正方形
      tempPics[index].height = 750
      tempPics[index].isLoad = true
    }
    that.setData({
      tempPics: tempPics,
    }, function () {
      that.finLoadPic()
    })
  },
  //判断图片是否加载完成
  finLoadPic: function () {
    var that = this,
      data = that.data,
      tempPics = data.tempPics,
      length = tempPics.length,
      fin = true
    for (var i = 0; i < length; i++) {
      if (!tempPics[i].isLoad) {
        fin = false
        break
      }
    }
    if (fin) {
      wx.showLoading({
        title: 'title',
      })
      wx.hideLoading()
    }
  },
  //渲染到瀑布流
  renderPage: function (typeIndex = 0) {
    var that = this,
      data = that.data,
      columnsleft = data.columnsleft,
      columnsright = data.columnsright,
      flag = data.flag,
      tempPics = data.tempPics,
      length = tempPics.length,
      index = 0;
    
      columnsleft[typeIndex] = [];
      columnsright[typeIndex] = [];

    for (var i = length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        columnsleft[typeIndex].push(tempPics[i]);
      } else {
        columnsright[typeIndex].push(tempPics[i]);
      }
    }
    if ((length - 1) % 2 === 0) {
      flag = 1;
    }
    that.setData({
      columnsleft: columnsleft,
      columnsright: columnsright,
      flag: flag
    })
  },
  addlove: function (e) {
    var that = this;
    var data = that.data;
    var tempPics = data.tempPics;
    var columnsleft = data.columnsleft;
    var columnsright = data.columnsright;
    var islike;
    var typeIndex=data.typeIndex;
    var topicid=that.data.topicid;
    console.log(data.typeIndex)
    var i = 0;
    var j = 0;
    var k = 0;
    if (app.globalData.avatarUrl!='') {
        for (i = 0; i < tempPics.length; i++) {
          if (tempPics[i].topicid == e.currentTarget.dataset.id) {
            islike = tempPics[i].islike;
          }
        }
        console.log('###',that.data.columnsright)
        if (islike === 0) {
          for (j = 0; j < Math.floor(tempPics.length / 2); j++) {
            if (columnsright[typeIndex][j].topicid == e.currentTarget.dataset.id) {
              columnsright[typeIndex][j].islike = islike + 1;
              that.setData({
                columnsright: columnsright
              });
            }
          }    
          for (j = 0; j < Math.ceil(tempPics.length / 2); j++) {   
            if (columnsleft[typeIndex][j].topicid == e.currentTarget.dataset.id) {
              columnsleft[typeIndex][j].islike = islike + 1;
              that.setData({
                columnsleft: columnsleft
              });
            }
          }
          that.setData({
            islike: 1,
          })
          wx.request({
            url: 'https://duing.site/likeTopic/giveLike',
            method: 'POST',
            data: {
              userid: app.globalData.uid,
              topicid: e.currentTarget.dataset.id
            },
            success(res) {
              console.log(islike)
            },
            fail(res) {
              // console.log(res);
            }
          })
        }
        if (islike != 0) {
          for (j = 0; j < Math.floor(tempPics.length / 2); j++) {
    
            if (columnsright[typeIndex][j].topicid == e.currentTarget.dataset.id) {
              columnsright[typeIndex][j].islike = 0;
              that.setData({
                columnsright: columnsright
              });
            }
          }
          for (j = 0; j <  Math.floor(tempPics.length / 2); j++) {
    
            if (columnsleft[typeIndex][j].topicid == e.currentTarget.dataset.id) {
              columnsleft[typeIndex][j].islike = 0;
              that.setData({
                columnsleft: columnsleft
              });
            }
          }
          that.setData({
            islike: 0,
          })
          wx.request({
            url: 'https://duing.site/likeTopic/removeLike',
            method: 'POST',
            data: {
              userid: app.globalData.uid,
              topicid: e.currentTarget.dataset.id
            },
            success(res) {
              console.log(islike)
            },
            fail(res) {
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

  //加载数据
  loadData: function (typeIndex) {
    var that = this
    var data = that.data
    var type = that.data.navbar[typeIndex];
      wx.request({
        url: 'https://duing.site/home', //服务器地址
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          userid: app.globalData.uid,
          type: type
        },

        success: function (res) {
          var type = ""
          res.data.forEach(item => {
            item.content = item.title;
            item.topicid = item.topicid;
            item.pic = item.image;
            item.loctext = item.site;
            item.time = item.time;
            item.avatarUrl = item.headimg;
            item.nickname = item.username;
            item.islike = item.islike;
            item.isimg=item.isimg;
          })
          that.setData({
            tempPics: res.data,
          })
          that.renderPage(typeIndex);
        },
      })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //启用标题栏显示加载状态
    this.onShow() //调用相关方法
    setTimeout(() => {
      wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
      wx.stopPullDownRefresh() //结束刷新
    }, 2000); //设置执行时间
  },


  search: function (e) {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  show: function (e) {
    var that = this
    var data = that.data
    var tempPics = data.tempPics
        wx.navigateTo({
          url: '/pages/jumpto/index?topicid=' + e.currentTarget.dataset.id
        })
  },


  
  onLoad: function () {
    this.loadData(0);
    let that = this
    wx.getStorage({
      key: 'ishide',
      success: function (res) {
        that.setData({
          isHide: res.data
        })
        wx.showTabBar({})
      }
    })
    this.setData({
      isHide: app.globalData.ishide
    })
  },
  /*onReachBottom: function() {
    this.loadData()
  },*/

  onShow:function(){
    var that=this;
    var jsData=that.jsData;
    this.setData({
      jsData : jsData
    })
     this.loadData(0);
  },

  adddetial: function (e) {

      if (app.globalData.avatarUrl!='') {
        wx.navigateTo({
          url: '/pages/report/index1',
        })
      }
      else{
        wx.showToast({
          title: '请先进行注册',
          icon: "loading",
        })
      }


  },
  adddetial1: function (e) {
wx.showActionSheet({
  itemList: ['以照片形式发表', '以视频形式发表'],
  success: function(res) {
    if(res.tapIndex===0)
    {
      if (app.globalData.avatarUrl!=''){
        wx.navigateTo({
          url: '/pages/askhelp/help',
        })
      }
      else{
        wx.showToast({
          title: '请先进行注册',
          icon: "loading",
        })
      }

  }
  if(res.tapIndex===1)
  {
  wx.getStorage({
    key: 'city',
    success: function (res) {
      wx.navigateTo({
        url: '/pages/askhelpv/askhelpv',
      })
    },
    fail: function (err) {
      wx.showToast({
        title: '请先进行注册',
        icon: "loading",
      })
    },
  })
}
  },
  fail: function(res) {
    console.log(res.errMsg)
  }
})
    
  },

  goto_counter: function (e) {
    wx.showModal({
      content: '你的互助已有用户开始创作啦，点击下方按钮查看情况',
      cancelColor: 'cancelColor',
      confirmText: '查看详情',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },

})