Page({
  //不需要渲染到wxml的数据存储在jsData中
  jsData: {
    columnsHeight: [0, 0],
    isLoading: false
  },
  data: {
    columns: [
      [],
      []
    ],
    tempPics: [],
  },
  //获取图片尺寸数据
  loadPic: function(e) {
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
      tempPics: tempPics
    }, function() {
      that.finLoadPic()
    })
  },
  //图片加载错误处理
  loadPicError: function(e) {
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
      tempPics: tempPics
    }, function() {
      that.finLoadPic()
    })
  },
  //判断图片是否加载完成
  finLoadPic: function() {
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
      wx.hideLoading()
      if (that.jsData.isLoading) {
        that.jsData.isLoading = false
        that.renderPage()
      }
    }
  },
  //渲染到瀑布流
  renderPage: function() {
    var that = this,
      data = that.data,
      columns = data.columns,
      tempPics = data.tempPics,
      length = tempPics.length,
      columnsHeight = that.jsData.columnsHeight,
      index = 0
    for (var i = 0; i < length; i++) {
      index = columnsHeight[1] < columnsHeight[0] ? 1 : 0
      columns[index].push(tempPics[i])
      columnsHeight[index] += tempPics[i].height
    }
    that.setData({
      columns: columns,
      tempPics: []
    })
    that.jsData.columnsHeight = columnsHeight
  },
  //加载数据
  loadData: function() {
    var that = this
    if (!that.jsData.isLoading) {
      wx.showLoading()
      that.jsData.isLoading = true
      setTimeout(function() {
        var pics = []
        pics.push({
          pic: '/images/qi.jpeg',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding1.png',
          loctext:"那达慕",
          content:"一年一度的大赛开始啦，还不来参观吗~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding2.jpg',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/qi.jpeg',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding1.png',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding2.jpg',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/qi.jpeg',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding1.png',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding2.jpg',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        pics.push({
          pic: '/images/ding1.png',
          loctext:"那达慕",
          content:"欢迎来四川找丁真玩哦~",
          time:"2020-1-17  20:00"
        })
        that.setData({
          tempPics: pics
        })
      }, 1000)
    }
  },

  search:function(e){
    wx.navigateTo({
      url: '/pages/search/index',
    })
},

  show:function(e){
    var current=e.target.dataset.src;
    wx.navigateTo({
      url: '/pages/jumpto/index',
    })
},
  onLoad: function() {
    this.loadData()
  },
  onReachBottom: function() {
    this.loadData()
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
})