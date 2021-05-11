var util = require('../../../utils/util.js');

let app=getApp()
Page({
  data:{
    renzheng:0,
    name: '',
    nickName: '',
    gender: 0,
    genderArray: ['女', '男'],
    genderIndex: 0,
    age: '',
    birthday: '',
    constellation: '',
    constellationArray: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    constellationIndex: 0,
    company: '',
    school: '',
    tel: '',
    email:'',
    intro: '',
    birthdayEndDate: '',
    img:'',
  },
  onLoad:function(options){
    var that = this
    wx.request({//get请求
      url: 'https://duing.site/user/getUser?userid='+app.globalData.uid, //服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        var data=res.data
        

        that.setData({
          img:data.headimg,
          username:data.username,
          gender:data.gender,
          job:data.job,
          address:data.address,
          phone:data.phone,
          sign:data.sign
      })
    }})
    var birthdayEndDate = util.getDate()
    var that = this
    wx.getStorage({
      key: 'person_info',
      success: function(res){
        var data = res.data
        that.setData({
          name: data.name,
          nickName: data.nickName,
          gender: data.gender,
          age: data.age,
          birthday: data.birthday,
          constellation: data.constellation,
          company: data.company,
          school: data.school,
          tel: data.tel,
          email: data.email,
          intro: data.intro,
          birthdayEndDate: birthdayEndDate
        })
      }
    })
  },
  chooseImg:function(){
    
    let that = this;
    wx.chooseImage({
     
      sizeType:['original','compressed'],
      success:function(res){
        console.log( res.tempFilePaths);
        
        that.setData({
          img:res.tempFilePaths,
         
        });
      }
    });
  },
  savePersonInfo: function(e) {
    let that = this;
    var data = e.detail.value
    wx.request({
      url: 'https://duing.site/user/updateUser',
      method: 'POST',
      data:{
        userid:app.globalData.uid,
        headimg:that.data.img,
       username:data.nickName,
       gender:data.gender,
        address:data.address,
        job:data.job,
        phone:data.tel,
        sign:data.sign,
      },
      success: function(res){
        console.log(res)
        wx.showToast({
          title: '资料修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000)
      }
    })
    
    
    
    
    
    
    
    
    
    ////////////
    /*var data = e.detail.value
    console.log(data);
    wx.setStorage({
      key: 'person_info',
      data: {
        name: data.name,
        nickName: data.nickName,
        gender: data.gender,
        age: data.age,
        birthday: data.birthday,
        constellation: data.constellation,
        company: data.company,
        school: data.school,
        tel: data.tel,
        email:data.email,
        intro: data.intro
      },
      success: function(res){
        wx.showToast({
          title: '资料修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../personInfo/personInfo'
          })
        },2000)
      }
    })*/
  },
  changeGender: function(e) {
    console.log(e)
    var genderIndex = e.detail.value
    if (genderIndex != "null") {
      this.setData({
        genderIndex: genderIndex,
        gender: genderIndex///this.data.genderArray[this.data.genderIndex]
      })
    }
  },
  changeBirthday: function(e) {
    var birthday = e.detail.value
    if (birthday != "null") {
      this.setData(
        {birthday: birthday}
      )
    }
  },
  changeConstellation: function(e) {
    var constellationIndex = e.detail.value
    if (constellationIndex != "null") {
      this.setData({
        constellationIndex: constellationIndex,
        constellation: this.data.constellationArray[this.data.constellationIndex]
      })
    }
  },
  onShow:function(options){
    
  }
})