Page({
  data: {
    latitude:0,//位置纬度
    longitude:0,//位置经度
    imgs:[],//图片路径
    imgNum:0,//图片数量
    topicTypes:["类型1","类型2","类型3"],//类型选项
    place:null,//位置
    type:null,//类型
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
  addPlace:function(){
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
  addType:function(e){
    let types = this.data.topicTypes;
    //console.log(e);
    let index = e.detail.value;
    this.setData({
      type: types[index]
    });
  },
  submit:function(){
    //数据上传服务端
  }
})