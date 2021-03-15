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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    columnsleft:[[]],
    columnsright:[[]],
    tempPics: [],
    showModalStatus: false ,
    temp:[],
    avatarUrl:'',
    nickname:'',
    flag:0,
    hasChange: false,
    navbar: ['推荐', '关注', '风景',"美食","活动","文化","其他"], 
    currentTab: 0 ,
    thing:'',
    newArray: [],
    shoopingtext: "", //清空搜索框,

  },
  navbarTap: function(e){ 
    this.setData({ 
    currentTab: e.currentTarget.dataset.idx 
    }) 
  this.loadData();
    this.renderPage();
    },
 /* search: function(e) {
    var searchtext = this.data.shoopingtext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.shoopingarray) {
        var num = this.data.shoopingarray[index].title.indexOf(searchtext);
        let temp = 'shoopingarray[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        shoppinglist: true, //显示商品列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }
  },
  data: {
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoopingarray: [{ //商品
      id: 0,
      images: "/images/3201.png",
      title: "完达山甄选牧场酸奶饮品牛奶饮料常温发酵乳包...",
      money: "88.00",
      sold: "78箱",
      status: 0
    }, {
      id: 1,
      images: "/images/3202.jpg",
      title: "网红 天日盐饼干 粗粮早餐 代餐宿舍小吃零食 130g*...",
      money: "26.80",
      sold: "34包",
      status: 0
    }]
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        shoppinglist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
      for (var index in this.data.shoopingarray) {
        let temp = 'shoopingarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      shoopingtext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      shoopingtext: e.target.dataset.text
    })
  }
})*/
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
      flag=data.flag,
      tempPics = data.tempPics,
      length = tempPics.length,
      rightHeight = that.jsData.rightHeight,
      leftHeight = that.jsData.leftHeight,
      index = 0
      for(var i = length-1; i >= 0; i--)  {
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
    if((length-1)%2===0)
    {
      flag=1;
    }
    that.setData({
      columnsleft :columnsleft,
      columnsright : columnsright,
      flag:flag
    })
    that.jsData.rightHeight = rightHeight
    that.jsData.leftHeight = leftHeight
  },
  addlove: function (e) {
    console.log(e);
    var that=this;
    var data = that.data;
    var tempPics = data.tempPics;
    var columnsleft = data.columnsleft;
    var columnsright = data.columnsright;
    var islike;
    var i=0;
    var j=0;
    var k=0;
    for(i=0;i<tempPics.length;i++)
    {
      if(tempPics[i].topicid==e.currentTarget.dataset.id)
      {
        islike=tempPics[i].islike;
      }
    }
    if(islike===0)
    {
    for(j=0;j<tempPics.length/2;j++)
    {
      
        if(columnsright[0][j].topicid==e.currentTarget.dataset.id)
        {
          columnsright[0][j].islike=islike + 1;
          that.setData({
            columnsright : columnsright
          });
        }
    }
    for(j=0;j<tempPics.length/2;j++)
    {
      
        if(columnsleft[0][j].topicid==e.currentTarget.dataset.id)
        {
          columnsleft[0][j].islike=islike + 1;
          that.setData({
            columnsleft : columnsleft
          });
        }
    }
    console.log(islike)
    console.log(app.globalData.uid);
    that.setData({
      islike:1,
    })
    wx.request({
      url: 'https://duing.site/likeTopic/giveLike',
      method: 'POST',
      data:{
        userid:app.globalData.uid,
        topicid:e.currentTarget.dataset.id
      },
      success(res){
        console.log(islike)
            },
      fail(res){
              // console.log(res);
            }
          })
        }
        if(islike!=0)
        {
        for(j=0;j<tempPics.length/2;j++)
        {
          
            if(columnsright[0][j].topicid==e.currentTarget.dataset.id)
            {
              columnsright[0][j].islike=0;
              that.setData({
                columnsright : columnsright
              });
            }
        }
        for(j=0;j<tempPics.length/2;j++)
        {
          
            if(columnsleft[0][j].topicid==e.currentTarget.dataset.id)
            {
              columnsleft[0][j].islike=0;
              that.setData({
                columnsleft : columnsleft
              });
            }
        }
        console.log(islike)
        console.log(app.globalData.uid);
        that.setData({
          islike:0,
        })
        wx.request({
          url: 'https://duing.site/likeTopic/removeLike',
          method: 'POST',
          data:{
            userid:app.globalData.uid,
            topicid:e.currentTarget.dataset.id
          },
          success(res){
            console.log(islike)
                },
          fail(res){
                  // console.log(res);
                }
              })
            }
  },
  
  //加载数据
  loadData: function(option) {
    var that=this
    var data=that.data
        console.log(that.data.currentTab)
        console.log(that.data.thing)
    if (!that.jsData.isLoading) 
          {
            that.jsData.isLoading = true
    wx.request({
      　　url: 'https://duing.site/home', //服务器地址
      header: {
        　　'content-type': 'application/json'
        　　},
        method: 'POST',
        data: {
          userid:app.globalData.uid,
	        type:'推荐'
          　　},
         
      　　success: function (res) {
        console.log(that.data.type)
      var i=0
      var pics=[]
      var type=""
      for(i=0;i<res.data.length;i++){
        pics.push({
          topicid:res.data[i].topicid,
          pic:res.data[i].image,
          loctext:res.data[i].site,
          content:res.data[i].title,
          time:res.data[i].time,
          avatarUrl:res.data[i].headimg,
          nickname:res.data[i].username,
          islike:res.data[i].islike
        })
        console.log(res.data[0].topicid);
        that.setData({
          tempPics: pics,
        })
      }
      　　}
      　　})
    }
  },
  loadData1: function(option) {
    var that=this
    var data=that.data
        console.log(that.data.currentTab)
        console.log(that.data.thing)
    if (!that.jsData.isLoading) 
          {
            that.jsData.isLoading = true
    wx.request({
      　　url: 'https://duing.site/home', //服务器地址
      header: {
        　　'content-type': 'application/json'
        　　},
        method: 'POST',
        data: {
          userid:app.globalData.uid,
	        type:'风景'
          　　},
         
      　　success: function (res) {
        console.log(that.data.type)
      var i=0
      var pics1=[]
      var type=""
      for(i=0;i<res.data.length;i++){
        pics1.push({
          topicid:res.data[i].topicid,
          pic:res.data[i].image,
          loctext:res.data[i].site,
          content:res.data[i].title,
          time:res.data[i].time,
          avatarUrl:res.data[i].headimg,
          nickname:res.data[i].username,
          islike:res.data[i].islike
        })
        console.log(res.data[0].topicid);
        that.setData({
          tempPics: pics1,
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
  var that=this
  var data=that.data
  var tempPics=data.tempPics
  var bindex=e.currentTarget.dataset.bindex
  var bindex1=e.currentTarget.dataset.bindex1
  var flag=data.flag
  // console.log(bindex)
  // console.log(bindex1)
  if(bindex!=undefined)
  {
    if(flag===0)
    {
  wx.navigateTo({
    url: '/pages/jumpto/index?index='+(tempPics.length-2*bindex-2)
  })
}
if(flag===1)
{
wx.navigateTo({
url: '/pages/jumpto/index?index='+(tempPics.length-2*bindex-1)
})
}
}
if(bindex1!=undefined)
  {
    /*if(bindex1===0)
    {bindex1=parseInt(tempPics.length/2)-bindex1+1;
    }
    else{bindex1=parseInt((parseInt(tempPics.length/2)-bindex1)/2)+1;
    }*/
    if(flag===0)
    {
  wx.navigateTo({
    url: '/pages/jumpto/index?index='+(tempPics.length-2*bindex1-1)
  })
}
if(flag===1)
{
wx.navigateTo({
url: '/pages/jumpto/index?index='+(tempPics.length-2*bindex1-2)
})
}
}
},

onShow:function(){ //返回显示页面状态函数
  //错误处理
  // console.log("show")
  this.loadData()
},
bindGetUserInfo: function(e) {
  if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
    let user=[]
    // 查看是否授权
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function(res) {
                        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                        // 根据自己的需求有其他操作再补充
                        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                        app.globalData.avatarUrl=res.userInfo.avatarUrl,
                        app.globalData.username=res.userInfo.nickName,
                        app.globalData.sex=res.userInfo.gender
                        // console.log(user)
                        // console.log(user[0])
                   
                        wx.login({
                            success: res => {
                                // 获取到用户的 code 之后：res.code
                                console.log("用户的code:" + res.code);
                                if (res.code) {
                                 //将url中的appid和secret换成自己的  （可以在开发平台查看）
                                 var url = 'https://duing.site/user/getUserid?appid=wx29ec46bf9b823b20&secret=d4afc24d341231c8e6e8be329f1af029&code='+res.code
                                  wx.request({
                                    url: url,
                                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
                                    success: function (res) {
                                      // res.data.openid 即为所求openid
                                      app.globalData.uid=res.data.openid
                                      // console.log(that.globalData.uid)
                                      user.push({uid:app.globalData.uid,avatarUrl:app.globalData.avatarUrl,
                                        nickname:app.globalData.username,sex:app.globalData.sex})
                                      console.log(user)
                                    wx.setStorage({
                                          data: user[0],
                                          key: 'user',
                                      })
                                    app.globalData.ishide=false
                                    wx.setStorage({
                                      data: false,
                                      key: 'ishide',
                                    })
                                    that.setData({
                                        isHide: false
                                    });
                                    wx.showTabBar({})
                                    }
                                  });
                                } 
                            }
                        });
                    }
                });
            } else {
                // 用户没有授权
                // 改变 isHide 的值，显示授权页面
                app.globalData.ishide=true
                that.setData({
                    isHide: true
                });
                console.log("没有授权")
            }
        }
    });
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      
  } else {
      //用户按了拒绝按钮
      wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                  console.log('用户点击了“返回授权”');
              }
          }
      });
  }
},
  onLoad: function() {
    this.loadData()
    wx.hideTabBar({})

    let that=this
    wx.getStorage({
      key: 'ishide',
      success:function(res){
        that.setData({
          isHide:res.data
        })
        wx.showTabBar({})
      }
    })
    this.setData({
      isHide:app.globalData.ishide
    })
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
    } ,
    goto_fengjing:function(e){
      wx.getStorage({
        key: 'city',
        success: function(res) {
          wx.navigateTo({
            url: '/pages/index/fengjing/fengjing',
          })
        },
        fail:function(err){
          wx.showToast({
            title: '请先进行注册',
            icon:"loading",
          })
        },
      })
    }
})
