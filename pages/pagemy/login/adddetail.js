// pages/pagemy/adddetail.js
let app=getApp()
Page({
  data: {
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
  savePersonInfo: function (e) {  //表单提交绑定事件
    var city=e.detail.value.address
    var job=e.detail.value.job
    let that=this
    var data = e.detail.value
    let username=that.data.nickname
    let avatarUrl=that.data.avatarUrl
    let sex=that.data.sex
    let userid=app.globalData.uid

    console.log(userid)
    console.log(city)
    wx.setStorage({
      data:false,
      key: 'iflogin',
      success: function(res){
      }
        })
    if(city!='' && job!=''){
    wx.request({//post请求
      url: 'https://duing.site/user/registerUser',
      method:"POST",
      data: {
        userid:app.globalData.uid,
        headimg:that.data.img,
       username:data.nickName,
       gender:data.gender,
        address:data.address,
        job:data.job,
        phone:data.tel,
        sign:data.sign,
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: "成功注册",
          icon:'success'        })
        wx.setStorage({
          data: city,
          key: 'city',
          success: function(res){
            wx.setStorage({
              data: job,
              key: 'job',
              success: function(res){
                wx.reLaunch({
                  url: '/pages/index/index',
                })
            }
          })
          }
        })

      },
      fail:function(err){
        console.log(err);
      }
    })
  }
  else{
    wx.showToast({
      title: '请完整填写信息！',
      icon:'loading',
    })
  }

   
        

    
    // if (e.detail.value.username.length == 0 || e.detail.value.password.length == 0) {
    //   wx.showToast({
    //     title: '用户名或密码不得为空!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)

    // }  else {
    //   wx.request({  //后台交互
    //     url: 'http://localhost/xxxx/zzzz/user_login',
    //     //指向方法, 本地用http:\\...   线上必须是https:\\...
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },   //标明格式, 必不可少
    //     method: "POST",   //传递数据类型
    //     data: { login_info: e.detail.value.username, password: e.detail.value.password },   //传输数据
    //     success: function (res) {   //返回信息,类似于ajax-json交互
    //       if (res.data.status == 1) {
    //         wx.showToast({
    //           title: 'success',
    //           icon: 'success',
    //           duration: 1500
    //         }),
    //           getApp().globalData.userInfo = res.data.username;
    //           //将信息存储到app.js的全局变量里,方便以后调用,
    //           wx.navigateTo({
    //           url: '../reg/reg'
    //           })   //跳转下一页面
    //       } else {
    //         wx.showToast({
    //           title:'failed',
    //           icon: 'success',
    //           duration: 1000
    //         })
    //       }
    //     }
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'user',
    success:function(res){
      that.setData({
      img:res.data.avatarUrl,
      username:res.data.nickname,
      uid:res.data.uid,
      gender:res.data.sex,
      })
      // console.log(that.data.avatarUrl)
    }
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})