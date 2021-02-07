var app = getApp()
var columnsleft = new Array();
var columnsright = new Array();
Page({
  //不需要渲染到wxml的数据存储在jsData中
  jsData: {
    rightHeight: [0],
    leftHeight:[0],
    isLoading: false
  },
  data: {
    columnsleft:[[]],
    columnsright:[[]],
    tempPics: [],
    showModalStatus: false ,
    temp:[],
    avatarUrl:'',
    nickname:''
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
      tempPics: tempPics,
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
      tempPics: tempPics,
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
      wx.showLoading({
        title: 'title',
      })
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
      columnsleft = data.columnsleft,
      columnsright = data.columnsright,
      tempPics = data.tempPics,
      length = tempPics.length,
      rightHeight = that.jsData.rightHeight,
      leftHeight = that.jsData.leftHeight,
      index = 0
    for (var i = 0; i < length; i++) {
      /*if(rightHeight<leftHeight)
      {
      columnsright[index].push(tempPics[i]);
      rightHeight[index] += tempPics[i].height
      }
      else{columnsleft[index].push(tempPics[i]);
        leftHeight[index] += tempPics[i].height}*/
      if(i%2===0)
      {columnsleft[index].push(tempPics[i]);
        leftHeight[index] += tempPics[i].height}
        else{columnsright[index].push(tempPics[i]);
          rightHeight[index] += tempPics[i].height}
    }
    that.setData({
      columnsleft :columnsleft,
      columnsright : columnsright,
      //tempPics: []
    })
    that.jsData.rightHeight = rightHeight
    that.jsData.leftHeight = leftHeight
  },

  //加载数据
  loadData: function() {
    var that=this
    if (!that.jsData.isLoading) 
          {
            that.jsData.isLoading = true
    wx.request({
      　　url: 'https://duing.site/home', //服务器地址
      header: {
        　　'content-type': 'application/json'
        　　},
        method: 'GET',
        data: {
          　　},
      　　success: function (res) {

      var i=0
      var pics=[]
      for(i=0;i<res.data.length;i++){
        pics.push({
          pic:res.data[i].image,
          loctext:res.data[i].site,
          content:res.data[i].title,
          time:res.data[i].time,
        })
        that.setData({
          tempPics: pics,
        })
      }
      　　}
      　　})
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //启用标题栏显示加载状态
    this.onShow() //调用相关方法
    setTimeout(() => {
      wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
      wx.stopPullDownRefresh() //结束刷新
    }, 2000); //设置执行时间
  },


  search:function(e){
    wx.navigateTo({
      url: '/pages/search/index',
    })
},
  show:function(e){
    var bindex=e.currentTarget.dataset.bindex
    var bindex1=e.currentTarget.dataset.bindex1
    // console.log(bindex)
    // console.log(bindex1)
    if(bindex!=undefined)
    {
    wx.navigateTo({
      url: '/pages/jumpto/index?index='+bindex*2
    })
  }
  if(bindex1!=undefined)
    {
      if(bindex1===0)
      {bindex1=bindex1+1;
      }
      else{bindex1=bindex1*2+1;
      }
    wx.navigateTo({
      url: '/pages/jumpto/index?index='+bindex1
    })
  }
},
onShow:function(){ //返回显示页面状态函数
  //错误处理
  var that=this
  wx.getStorage({
    key: 'user',
  success:function(res){
  that.setData({
    avatarUrl:res.data.avatarUrl,
    nickname:res.data.nickname,
    })
  }
})
  // console.log("show")
  this.loadData()
},
  onLoad: function() {
    this.loadData()
  },
  /*onReachBottom: function() {
    this.loadData()
  },*/

  adddetial:function(e){
    wx.getStorage({
      key: 'city',
      success: function(res) {
        wx.navigateTo({
          url: '/pages/report/index1',
        })
      },
      fail:function(err){
        wx.showToast({
          title: '请先进行注册',
          icon:"loading",
        })
      },
    })

  },
  adddetial1:function(e){
    wx.getStorage({
      key: 'city',
      success: function(res) {
        wx.navigateTo({
          url: '/pages/askhelp/help',
        })
      },
      fail:function(err){
        wx.showToast({
          title: '请先进行注册',
          icon:"loading",
        })
      },
    })
  },

  goto_counter: function(e){ 
    wx.showModal({
      content:'你的互助已有用户开始创作啦，点击下方按钮查看情况',
      cancelColor: 'cancelColor',
      confirmText:'查看详情',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
    } 
})
/* var that = this
    const db = wx.cloud.database()
    if (!that.jsData.isLoading) {
      that.jsData.isLoading = true
        db.collection('index').where({
          _openid: 'osqkr4y6UIW2MVjCIvSDXGE8mU-A'
        })
        .get({
          success: function(res) {
            // res.data 包含该记录的数据
            console.log(res.data)
            var i=0
            var pics=[]
            for(i=0;i<res.data.length;i++){
            pics.push({
              pic:res.data[i].pic,
              loctext:res.data[i].loctext,
              content:res.data[i].content,
              time:res.data[i].time
            })
            that.setData({
              tempPics: pics
            })
          }
          }
        })  
    }
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
  <view class="main">
  <view wx:for="{{columnsleft}}" class="column-left">
    <view wx:for="{{item}}" class="column_item" wx:for-item="pics"  wx:key = 'index' wx:for-index="bindex" >
      <image catchtap="show" src="{{pics.pic}}" class="column_pic" mode="widthFix" data-bindex= '{{bindex}}' id="{{item.index}}"></image>
      <view class="list-loc" style="opacity:{{0.6}}">
      <image  src="/images/图层 180 拷贝.png" class="loc11"></image>
      <view class="loc_text">{{pics.loctext}}</view>
    </view>
    <view class="list-main">
        <view class="list-text">
      {{pics.content}}
    </view>
    <view class="list-time" style="color:{{timeColor}}">{{pics.time}}</view>
    <view class="list-user">
      <image class="motou" src="/images/南南1.jpg"></image>
      <text class="authname">作者的昵称</text>
    </view>
    <view class="list-love">
      <image src="/images/矢量智能对象 拷贝 2.png" class="love-img" bindtap="addlove"></image>
      <view >{{pics.love}}</view>
    </view>
  </view>
    </view>
  </view>
  <view wx:for="{{columnsright}}" class="column-right">
    <view wx:for="{{item}}" class="column_item" wx:for-item="pics"  wx:key = 'index1' wx:for-index="bindex1" >
      <image catchtap="show" src="{{pics.pic}}" class="column_pic" mode="widthFix" data-bindex1= '{{bindex1}}' id="{{item.index}}"></image>
      <view class="list-loc" style="opacity:{{0.6}}">
      <image  src="/images/图层 180 拷贝.png" class="loc11"></image>
      <view class="loc_text">{{pics.loctext}}</view>
    </view>
    <view class="list-main">
        <view class="list-text">
      {{pics.content}}
    </view>
    <view class="list-time" style="color:{{timeColor}}">{{pics.time}}</view>
    <view class="list-user">
      <image class="motou" src="/images/南南1.jpg"></image>
      <text class="authname">作者的昵称</text>
    </view>
    <view class="list-love">
      <image src="/images/矢量智能对象 拷贝 2.png" class="love-img" bindtap="addlove"></image>
      <view >{{pics.love}}</view>
    </view>
  </view>
    </view>
  </view>
</view>*/