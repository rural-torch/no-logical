var app = getApp()
var columnsleft = new Array();
var columnsright = new Array();
Page({

  //搜索
  search: function (e) {
    var that = this,
      data = that.data,
      columnsleft = data.columnsleft,
      columnsright = data.columnsright,
      tempPics = data.tempPics,
      length = tempPics.length,
      index = 0
    let searchtext = this.data.shoopingtext; //搜索框的值
    var that = this;
    var data = that.data;
    var tempPics = data.tempPics;
    var i = 0
    var flag=that.data.flag
    var flag1=that.data.flag1
    console.log(flag1)
    if(flag===1)
    {
    wx.request({
      url: 'https://duing.site/searchTopics', //服务器地址
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        userid: app.globalData.uid,
        key: searchtext
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
        })
        that.setData({
          tempPics: res.data,
        })
        if (flag1 === 0) {
          that.setData({
            columnsleft:[[]],
          columnsright:[[]]
          })
          that.renderPage()
          that.setData({
            flag1:1,
          })
        }
      }
    })
  }
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
        console.log('$$$$',columnsleft[typeIndex][j].topicid)
        
        if (columnsleft[typeIndex][j].topicid == e.currentTarget.dataset.id) {
          columnsleft[typeIndex][j].islike = islike + 1;
          that.setData({
            columnsleft: columnsleft
          });
        }
      }
      console.log(islike)
      console.log(app.globalData.uid);
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
      console.log(islike)
      console.log(app.globalData.uid);
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
          // console.log(res);
        }
      })
    }
  },

  show: function (e) {
    var that = this
    var data = that.data
    var tempPics = data.tempPics
    console.log(e.currentTarget.dataset.id)
    console.log(e)
    // console.log(typeof( parseInt(e.currentTarget.dataset.id))
        wx.navigateTo({
          url: '/pages/jumpto/index?topicid=' + parseInt(e.currentTarget.dataset.id)
        })
  },
  jsData: {
    rightHeight: [0],
    leftHeight: [0],
    isLoading: false
  },
  data: {
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    columnsleft: [
      []
    ],
    columnsright: [
      []
    ],
    tempPics: [],
    avatarUrl: '',
    nickname: '',
    flag: 0,
    flag1: 0,
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
  //渲染到瀑布流
  renderPage: function () {
    var that = this,
      data = that.data,
      columnsleft = data.columnsleft,
      columnsright = data.columnsright,
      flag = data.flag,
      tempPics = data.tempPics,
      length = tempPics.length,
      rightHeight = that.jsData.rightHeight,
      leftHeight = that.jsData.leftHeight,
      index = 0
    for (var i = length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        columnsleft[index].push(tempPics[i]);
        leftHeight[index] += tempPics[i].height
      } else {
        columnsright[index].push(tempPics[i]);
        rightHeight[index] += tempPics[i].height
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
    that.jsData.rightHeight = rightHeight
    that.jsData.leftHeight = leftHeight
  },
  
  //搜索框的值
  shoppinginput: function (e) {
    //当删除input的值为空时
    var that=this
    var data=that.data
    var flag1=that.data.columnsleft[0].length
    var flag
    if (e.detail.value == "") {
      this.setData({
        flag:0,
        flag1:0
      });
    }
    this.setData({
      shoopingtext: e.detail.value,
      flag:1
    })
  },

})