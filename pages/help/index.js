//banner
var needsData=require('../data/need-datas.js')
const { needList } = require('../data/need-datas.js')
var app = getApp();
Page({
  data: {
    timeLimit:'其他',
    site:'',
    type:'',
    min:0,
    max:99999999999,
    height: '',
    a:10,
    filterItem_a:['三天内','一周内','半年内','其他'],
      filterIndex:0,
    filterIndex:0,
    index:null,
    preList:[],
    prelist1:[],
    filterItem_b:['北京','上海',"安徽","江苏","河南","河北","湖北","湖南"],
    filterItem_c:['三天内','一周内','半年内','其他'],
    filterItem_d:['三天内','一周内','半年内','其他'],
    skin: '',
    
    images:{},
    // 下拉菜单
    first: '发布时间',
    second: '求助地点',
    thirds: '求助类别',
    fours: '荣誉积分',
    _num: 0,
    _res: 0,
    preList1:[],
    // 筛选
    forproduct: [{ name: '农产品' }, { name: '风景宣传' }, { name: '特色农家餐馆' }, { name: '农家乐游玩' }],
    prestyle: [{ name: '风景展示' }, { name: '游玩体验' }, { name: '剧情展开' }],
    monney: [{ name: '0-10' }, { name: '10-50' }, { name: '50-500' }, { name: '500以上' }],
    shengfen: [{name:'不限'},{ name: '北京' }, { name: '天津' }, { name: '上海' },{ name: '重庆' },{ name: '河北' },{ name: '山西' },{ name: '辽宁' },{ name: '吉林' },{ name: '黑龙江' },{ name: '江苏' },{ name: '浙江' },{ name: '安徽' },{ name: '福建' },{ name: '江西' },{ name: '山东' },{ name: '河南' },{ name: '湖北' },{ name: '湖南' },{ name: '广东' },{ name: '海南' },{ name: '四川' },{ name: '贵州' },{ name: '云南' },{ name: '陕西' },{ name: '甘肃' },{ name: '甘肃' },{ name: '台湾' },{ name: '内蒙古自治区' },{ name: '广西壮族自治区' },{ name: '西藏自治区' },{ name: '宁夏回族自治区' },{ name: '新疆维吾尔自治区' },{ name: '香港特别行政区' },{ name: '澳门特别行政区' }],
    one: 0,
    two: 0,
    third: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
  },
  isShow: true,
  currentTab: 0,
 
  // 下拉切换
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
    // 区域
    search:function(e){
      wx.navigateTo({
        url: '/pages/search/index',
      })
  },
  tabNav: function (e) {
    this.setData({
      displays: "block"
    })
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
 
      var showMode = e.target.dataset.current == 0;
 
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  // 下拉切换中的切换
  // 区域
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  // 下拉菜单1 2 3 4
    // 区域
 /* clickSum: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _sum: e.target.dataset.num
    })
    this.setData({
      first: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
    console.log(text)
  },
  onLoad: function (options) {
 
  },
  clickMum: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _mum: e.target.dataset.num
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
    console.log(text)
  },
  onLoad: function (options) {
 
  },
  clickCum: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _cum: e.target.dataset.num
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
    console.log(text)
  },
  onLoad: function (options) {
 
  },*/
  //发布时间
  onFilterList:function(e) {
    // console.log(e.target.dataset.num)
    this.setData({
      _num1: e.target.dataset.num
    })
    this.setData({
      first: e.target.dataset.name,
      timeLimit:e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    if(e === null){
      var index = this.data.filterIndex
    }else{
       var index =e. target.dataset.num
      if(index !== 'undefined'){
        this.setData({
          filterIndex:index
        })
      }
    }
    app.globalData.tlelnth=10
    this.setData({a:10})
    var that=this;
    wx.request({//get请求
      url: 'https://duing.site/helpSortHome', //服务器网址
      method:"POST",
      data:{
        timeLimit:that.data.timeLimit,
        site:that.data.site,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
        type:that.data.type,
        min:that.data.min,
        max:that.data.max
      },
      success: function(res) {
        let list=res.data.reverse()
        // console.log(list)
        // message=res.data.message,
        if(list.length<=10){
        that.setData({
          preList1:list
        })
        console.log(that.data.pr)
      }else{
          var preList1=[]
          for(var i=0;i<10;i++){
            preList1.push(list[i])
          }
          that.setData({
            preList1:preList1
          })
        }
      },
      fail:function(err){
        // console.log(err);
      },
    })

  /*const arr = this.data.filterItem_a
  const text_a = arr[index]
  // console.log(text_a)
    let data = needsData.needList
    let res = data.filter(item => item.timblk == text_a)
    if(res.length){
      const i = arr.indexOf(text_a)
      // console.log(res)
      // console.log(index)
      // console.log(i)
      if(index == i){ //筛选项对应的index
        this.setData({
          preList:res
        })
      }
    
    }else{
      this.setData({
        preList:data
      })
    }
   /// var text = this.data.first
   /// console.log(text)*/
  },
  // 售价
  clickNum: function (e) {
    // console.log(e.target.dataset.num)
    this.setData({
      _num2: e.target.dataset.num
    })
    if(e.target.dataset.num==1){
      this.setData({
      second: '求助地点',
     site:''
      })
    }else{ 
      this.setData({
      second: e.target.dataset.name,
      site:e.target.dataset.name
    })}
    this.setData({
      displays: "none"
    })
    if(e === null){
      var index = this.data.filterIndex
    }else{
       var index =e. target.dataset.num
      if(index !== 'undefined'){
        this.setData({
          filterIndex:index
        })
      }
    }
    app.globalData.tlelnth=10
    this.setData({a:10})
    var that=this;
    wx.request({//get请求
      url: 'https://duing.site/helpSortHome', //服务器网址
      method:"POST",
      data:{
        timeLimit:that.data.timeLimit,
        site:that.data.site,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
        type:that.data.type,
        min:that.data.min,
        max:that.data.max
      },
      success: function(res) {
        let list=res.data.reverse()
        console.log(res)
        // message=res.data.message,
        if(list.length<=10){
        that.setData({
          preList1:list
        })
        console.log(that.data.pr)
      }else{
          var preList1=[]
          for(var i=0;i<10;i++){
            preList1.push(list[i])
          }
          that.setData({
            preList1:preList1
          })
        }
      },
      fail:function(err){
        // console.log(err);
      },
    })
  },
  Clicksort:function(e){
      // console.log(e.target.dataset.num)
      this.setData({
        _num3: e.target.dataset.num
      })
      if(e.target.dataset.num==4){
        this.setData({
        thirds: e.target.dataset.name,
        type:'',
        })
      }else{ 
        this.setData({
        thirds: e.target.dataset.name,
        type:e.target.dataset.name
      })}
      this.setData({
        displays: "none"
      })
    
     
      if(e === null){
        var index = this.data.filterIndex
      }else{
         var index =e. target.dataset.num
        if(index !== 'undefined'){
          this.setData({
            filterIndex:index
          })
        }
      }
      app.globalData.tlelnth=10
    this.setData({a:10})
    var that=this;
    wx.request({//get请求
      url: 'https://duing.site/helpSortHome', //服务器网址
      method:"POST",
      data:{
        timeLimit:that.data.timeLimit,
        site:that.data.site,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
        type:that.data.type,
        min:that.data.min,
        max:that.data.max
      },
      success: function(res) {
        let list=res.data.reverse()
        // console.log(list)
        // message=res.data.message,
        if(list.length<=10){
        that.setData({
          preList1:list
        })
        console.log(that.data.pr)
      }else{
          var preList1=[]
          for(var i=0;i<10;i++){
            preList1.push(list[i])
          }
          that.setData({
            preList1:preList1
          })
        }
      },
      fail:function(err){
        // console.log(err);
      },
    })
  },
  onShow: function () {
    // var that=this
    // wx.getStorage({
    //   key: 'need_List',
    // success:function(res){
    // that.setData({
    //   needList:res.data,
    //   preList:needList
    //   });
    //   console.log(needList)
    // }
    // })
    
   
  },
  // 房型
  clickHouse: function (e) {
    // console.log(e.target.dataset.num)
    this.setData({
      _res: e.target.dataset.num
    })
    if(e.target.dataset.num==1){
      this.setData({min:0,max:10})
  }else if(e.target.dataset.num==2){
    this.setData({min:10,max:100})
  }else if(e.target.dataset.num==3){
    this.setData({min:100,max:500})
  }else if(e.target.dataset.num==4){
    this.setData({min:500,max:999999999})
  }else if(e.target.dataset.num==5){
    this.setData({min:0,max:999999999})
  }
 
    this.setData({
      fours: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    app.globalData.tlelnth=10
    this.setData({a:10})
    var that=this;
    wx.request({//get请求
      url: 'https://duing.site/helpSortHome', //服务器网址
      method:"POST",
      data:{
        timeLimit:that.data.timeLimit,
        site:that.data.site,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
        type:that.data.type,
        min:that.data.min,
        max:that.data.max
      },
      success: function(res) {
        let list=res.data.reverse()
        // console.log(list)
        // message=res.data.message,
        if(list.length<=10){
        that.setData({
          preList1:list
        })
        console.log(that.data.pr)
      }else{
          var preList1=[]
          for(var i=0;i<10;i++){
            preList1.push(list[i])
          }
          that.setData({
            preList1:preList1
          })
        }
      },
      fail:function(err){
        // console.log(err);
      },
    })
  },
  onLoad: function (options) {
    var that=this;
    wx.request({//get请求
      url: 'https://duing.site/helpHome', //服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let list=res.data.reverse()
        // console.log(list)
        // message=res.data.message,
        if(list.length<=10){
        that.setData({
          preList1:list
        })
        console.log(that.data.pr)
      }else{
          var preList1=[]
          for(var i=0;i<10;i++){
            preList1.push(list[i])
          }
          that.setData({
            preList1:preList1
          })
        }
      },
      fail:function(err){
        // console.log(err);
      },
    })

    // this.data.postList = postsData.postList
    this.setData({
      needList:needsData.needList
      });
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            height: res.windowHeight
          })
        }
      })
     
     },
 
 onReachBottom:function(event){
//  console.log('asdfasdfasdf')
 },
 onPullDownRefresh: function () {
  app.globalData.tlelnth=10
  this.setData({a:10})
  this.onLoad()
},
 onPostTap: function (event) {
 var needId = event.currentTarget.dataset.needid;
//  console.log("on need id is" + needId);
 wx.navigateTo({
  url: "/pages/detail/detail?id=" + needId
 })
 },
 

 
  // 筛选
  choseTxtColor: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      one: id
    })
  },
  chaoxiang: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      two: id
    })
  },
  louceng: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      third: id
    })
  },
  zhuangxiu: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      four: id
    })
  },
  leibei: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      five: id
    })
  },
  tese: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      six: id
    })
  },
  paixu: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      seven: id
    })
  },
  lower() {
    var that=this;
    wx.request({//get请求
      url: 'https://duing.site/helpSortHome', //服务器网址
      method:"POST",
      data:{
        timeLimit:that.data.timeLimit,
        site:that.data.site,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
        type:that.data.type,
        min:that.data.min,
        max:that.data.max
      },
      success: function(res) {
        let list=res.data.reverse()
        // console.log(list)
        // message=res.data.message,
        if(list.length<(app.globalData.tlelnth+10)){
          if(list.length<(app.globalData.tlelnth+1)){
         that.setData({
           preList1:list
         })
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: '我也是有底线的',
            icon: 'success',
            duration: 300
          });
          return false;}
          else{ 
            var a=app.globalData.tlelnth+10
            var isShowLoading=false
            app.globalData.tlelnth=a
            if(!isShowLoading){
            wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
              title: '加载中',
              icon: 'loading',
            });
            isShowLoading=true
          }
            setTimeout(() => {
             that.setData({
                preList1: list
              });
              if(isShowLoading){
                wx.hideLoading()
                isShowLoading =false;
          
          }
            }, 1500)
            /*that.setData({
            preList1:list
          })
           wx.showToast({ //如果全部加载完成了也弹一个框
             title: '我也是有底线的',
             icon: 'success',
             duration: 300
           })*/;
          }
       
        }else{
          var preList1=[]
          var a=app.globalData.tlelnth+10
          var isShowLoading=false
          for(var i=0;i<a;i++){
            preList1.push(list[i])
          }
          that.setData({a:a})
          app.globalData.tlelnth=a
          if(!isShowLoading){
            wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
              title: '加载中',
              icon: 'loading',
            });
            isShowLoading=true
          }
          setTimeout(() => {
           that.setData({
              preList1: preList1
            });
            if(isShowLoading){
              wx.hideLoading()
              isShowLoading =false;
        
        }
          }, 1500)
        }
      },
      fail:function(err){
        // console.log(err);
      },
    })
  /*  var a=this.data.a
    var all=this.data.prelist1
    var b=a
    var resArr = this.data.preList;
    for ( a; a < b+10; a++) {
      resArr.push(this.data.all[a]);
    };
    this.setData({
      a:a
    })
    console.log('a:',this.data.a)
    if (all.length < this.data.a) {
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: 'success',
        duration: 300
      });
      return false;
    } else {
      wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
      });
      setTimeout(() => {
        this.setData({
          preList: resArr
        });
        wx.hideLoading();
      }, 1500)
    }
    */
  },
  reqsel(){ 
    let that = this;
    wx.request({//get请求
      url: 'https://duing.site/helpSortHome', //服务器网址
      method:"POST",
      data:{
        timeLimit:that.data.timeLimit,
        site:that.data.site,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
        type:that.data.type,
        min:that.data.min,
        max:that.data.max
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
        let list=res.data.reverse()
        if(list.length<(app.globalData.tlelnth+10)){
          if(list.length<(app.globalData.tlelnth+1)){
         that.setData({
           preList1:list
         })
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: '我也是有底线的',
            icon: 'success',
            duration: 300
          });
          return false;}
          else{ 
            var a=app.globalData.tlelnth+10
            var isShowLoading=false
            app.globalData.tlelnth=a
            if(!isShowLoading){
            wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
              title: '加载中',
              icon: 'loading',
            });
            isShowLoading=true
          }
            setTimeout(() => {
             that.setData({
                preList1: list
              });
              if(isShowLoading){
                wx.hideLoading()
                isShowLoading =false;
          
          }
            }, 1500)
            /*that.setData({
            preList1:list
          })
           wx.showToast({ //如果全部加载完成了也弹一个框
             title: '我也是有底线的',
             icon: 'success',
             duration: 300
           })*/;
          }
       
        }else{
          var preList1=[]
          var a=app.globalData.tlelnth+10
          var isShowLoading=false
          for(var i=0;i<a;i++){
            preList1.push(list[i])
          }
          that.setData({a:a})
          app.globalData.tlelnth=a
          if(!isShowLoading){
            wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
              title: '加载中',
              icon: 'loading',
            });
            isShowLoading=true
          }
          setTimeout(() => {
           that.setData({
              preList1: preList1
            });
            if(isShowLoading){
              wx.hideLoading()
              isShowLoading =false;
        
        }
          }, 1500)
        }
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })},
})
