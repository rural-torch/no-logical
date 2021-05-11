var util = require('../../utils/util.js');
let app=getApp()
Page({
  data: {
    title:"",
    latitude:0,//位置纬度
    longitude:0,//位置经度
    imgs:'',//图片路径
    topicTypes:["风景","美食","活动","文化","其他"],//类型选项
    place:null,//位置
    type:null,//类型
    flag:false,
  },
  onLoad: function(option) {
    var Id = option.id;
    this.setData({helpid:Number(Id)})
    var that=this;
    wx.getStorage({
      key: 'user',
    success:function(res){
      that.setData({
      uid:res.data.uid
      })
    }
  })
  },
  chooseImg:function(){
    console.log('#######')
    let addImgs = this.data.imgs;
    let that = this;
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        addImgs = res.tempFilePath;
        console.log('###',res.tempFilePath)
        that.setData({
          imgs: addImgs,
          flag:true,
        });
      }
    })
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
  addTitle:function(e){
    this.setData({
      title: e.detail.value,
    })
  },
  repo:function(e){
    let topicid = '';
    
    // 数据上传服务端
    let that = this;
    var title=e.detail.value.title;
    let uid=that.data.uid
    wx.request({
      url: 'https://duing.site/topic/addTopic',
      method: 'POST',
      data:{
        topicid:100,
        userid:app.globalData.uid,
        title:e.detail.value.title,
        time:new Date().getTime(),
        site:that.data.place,
        type:that.data.type,
        like:0,
        comment:0,
        status:0,
      },
      success(res){
        topicid = res.data.topicid;
        console.log()
          wx.uploadFile({
            url: 'https://duing.site/topic/uploadFile',
            filePath: that.data.imgs,
            name: 'uploadfile',
            formData:{
              topicid:topicid,
              index:1,
            },
            
            success(res){
              // console.log(res);
              wx.showToast({
                title: '发表成功！',
              })
            },
            fail(res){
              // console.log(res);
            }
          })
          setTimeout(function () {
            wx.switchTab
            ({
            url:'/pages/index/index'
          })
          }, 1000) //延迟时间 这里是1秒
      }
    })
    var tes=String(this.data.helpid)
    wx.setStorage({
      data:1,
      key:tes,
      success: function(res){
        console.log(res)
      }
        })

  },
})
