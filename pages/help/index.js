//banner
var needsData=require('../data/need-datas.js')
Page({
  data: {
    filterItem_a:['三天内','一周内','半年内','其他'],
      filterIndex:0,
    filterIndex:0,
    index:null,
    preList:needsData.needList,
    
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
 
    // 筛选
    forproduct: [{ name: '农产品' }, { name: '风景宣传' }, { name: '特色农家餐馆' }, { name: '农家乐游玩' }],
    prestyle: [{ name: '风景展示' }, { name: '游玩体验' }, { name: '剧情展开' }],
    monney: [{ name: '0-10' }, { name: '10-50' }, { name: '50-500' }, { name: '500以上' }],

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
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
    this.setData({
      first: e.target.dataset.name
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
  const arr = this.data.filterItem_a
  const text_a = arr[index]
  console.log(text_a)
    let data = needsData.needList
    let res = data.filter(item => item.timblk == text_a)
    if(res.length){
      const i = arr.indexOf(text_a)
      console.log(res)
      console.log(index)
      console.log(i)
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
   /// console.log(text)
  },
  onLoad: function (options) {
 
  },
  // 售价
  clickNum: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
    this.setData({
      second: e.target.dataset.name
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
  const arr = this.data.filterItem_b
  const text_b = arr[index]
  console.log(text_b)
    let data = needsData.needList
    let res = data.filter(item => item.location == text_b)
    if(res.length){
      const i = arr.indexOf(text_b)
      console.log(res)
      console.log(index)
      console.log(i)
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
   /// var text = this.data.name
    ///console.log(text)
  },
  onLoad: function (options) {
 
  },
  // 房型
  clickHouse: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _res: e.target.dataset.num
    })
    this.setData({
      fours: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
  },
  onLoad: function (options) {
    // this.data.postList = postsData.postList
    this.setData({
      needList:needsData.needList
      });
     },
 
 onReachBottom:function(event){
 console.log('asdfasdfasdf')
 },
 
 onPostTap: function (event) {
 var needId = event.currentTarget.dataset.needid;
 // console.log("on need id is" + needId);
 wx.navigateTo({
  url: "../detail/detail?id=" + needId
 })
 },
 

 
  // 筛选
  choseTxtColor: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    console.log(e.currentTarget.dataset.id)
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
  }
})