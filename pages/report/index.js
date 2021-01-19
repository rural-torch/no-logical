Page({
  data: {
    latitude:0,//位置纬度
    longitude:0,//位置经度
    imgs:[],//图片路径
    imgNum:0,//图片数量
    helpTypes:["类型1","类型2","类型3"],//求助类型选择
    moneyList:[1,3,5,10,20,50,100],//打赏
    place:null,//求助位置
    type:null,//求助类型
    date:null,//时间限制
    money:null,
    detail:"",//详细描述
  },
  chooseImg:function(){
    let addImgs = this.data.imgs;
    let num = addImgs.length;
    let that = this;
    wx.chooseImage({
      count: 9 - num,
      sizeType:['original','compressed'],
      success:function(res){
        addImgs = addImgs.concat(res.tempFilePaths);
        num = addImgs.length;
        that.setData({
          imgs: addImgs,
          imgNum: num
        });
      }
    });
  },
  choosePlace:function(){
    let that = this;
    wx.getLocation({
      success:function(res){
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
        });
      }
    })
    wx.chooseLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      success:function(res){
        //console.log(res);
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          place:res.address
        });
      }
    });
  },
  chooseType:function(e){
    let types = this.data.helpTypes;
    //console.log(e);
    let index = e.detail.value;
    this.setData({
      type: types[index]
    });
  },
  chooseDate:function(e){
    //console.log(e);
    this.setData({
      date: e.detail.value
    });
  },
  chooseMoney:function(e){
    let moneys = this.data.moneyList;
    //console.log(e);
    let index = e.detail.value;
    this.setData({
      money: moneys[index]
    });
  },
  inputDetail:function(e){
    //console.log(e);
    this.setData({
      detail: e.detail.value
    });
  },
  submit:function(){
    //数据上传服务端
  }
})