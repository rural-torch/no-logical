//index.js
//获取应用实例
const app = getApp()
const myid = app.globalData.uid;
Page({
  data:{
    focu:0,
    fans:0,
    mark:0,
    id:'',
    mes:0,
    sex:"",
    nickname:"",
    avatarUrl:"",
    userid:"",
    iflogin:true,
    uid:"",
    city:"",
    job:"",
    navbar: ['创作', '喜欢', '任务',"互助"], 
    currentTab: 0 ,
    ifauth:true,
    video:[1,2,3,4,1,1,1,1,1],
    video2:[1,2,3,4,5,1,1,1,1],
    tasklist:[],
    mytasklist:[],
    worklist:[],
    likelist:[],
    headimg:'',
  },
 navbarTap: function(e){ 
    this.setData({ 
    currentTab: e.currentTarget.dataset.idx 
    }) 
    },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
},
swithtoset:function(){
  wx.navigateTo({
  url: '../setting/setting',
})
  },
  onLoad: function() {
    this.requdata()
    },
    onPullDownRefresh: function () {
      this.requdata()
    },
  changeData:function(){
    this.onShow();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
    onShow: function () {
      let focu;
      let fans;
      let mark;
      let id;
      let city;
      let job;
      let avatarUrl;
      let nickname;
      let sex;
      let that=this
      if (app.globalData.uid!=''){
      that.setData({
        userid:app.globalData.uid,
        });
      // console.log(res)
      wx.request({//get请求
        url: 'https://duing.site/user/getUser?userid='+that.data.userid, //服务器网址
        method:"GET",
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          focu=res.data.focus,
          fans=res.data.fans,
          mark=res.data.integral,
          id=res.data.userid,
          city=res.data.address,
          job=res.data.job,
          avatarUrl=res.data.headimg,
          nickname=res.data.username,
          sex=res.data.gender,
          // console.log(res.data.avatarUrl)
          // message=res.data.message,
          console.log(res)
          wx.setNavigationBarTitle({ 
            title:res.data.username})
          if (res.data!=''){
          that.setData({
            fans:fans,
            focu:focu,
            mark:mark,
            id:id,
            iflogin:false,
            city:city,
            job:job,
            avatarUrl:avatarUrl,
            nickname:nickname,
            sex:sex,
          })
        }
        else{
          that.setData({
            iflogin:true,
         })
        }
      },
       fail:function(e){

       }
  
      })
    }
    else{
      that.setData({
        iflogin:true,
     })
    }
  

    },
  getUserProfile:function(e){
    let user = []
    let that=this
    
    wx.getUserProfile({
   desc:'正在获取',//不写不弹提示框
    success:function(res){
       console.log('获取成功: ',res)
       app.globalData.avatarUrl = res.userInfo.avatarUrl,
       app.globalData.username = res.userInfo.nickName,
       app.globalData.sex = res.userInfo.gender
       wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          console.log("用户的code:" + res.code);
          if (res.code) {
            //将url中的appid和secret换成自己的  （可以在开发平台查看）
            var url = 'https://duing.site/user/getUserid?appid=wx29ec46bf9b823b20&secret=d4afc24d341231c8e6e8be329f1af029&code=' + res.code
            wx.request({
              url: url,
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
              success: function (res) {
                // res.data.openid 即为所求openid
                app.globalData.uid = res.data.openid
                // console.log(that.globalData.uid)
                user.push({
                  uid: app.globalData.uid,
                  avatarUrl: app.globalData.avatarUrl,
                  nickname: app.globalData.username,
                  sex: app.globalData.sex
                })
                console.log(user)
                wx.setStorage({
                  data: user[0],
                  key: 'user',
                })


                app.globalData.ishide = false
                wx.setStorage({
                  data: false,
                  key: 'ishide',
                })
                that.setData({
                  isHide: false
                });
                wx.showTabBar({})
                wx.navigateTo({
                  url: '/pages/pagemy/login/adddetail',
                })
              }
            });
          }
        }
      });
   },
    fail:function(err){
     console.log("获取失败: ",err)
   }
    })
  },
  login:function(e){
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        // 获取到用户的信息了，打印到控制台上看下
        let user = []
        let that=this
        console.log(e.detail.userInfo)
        // 查看是否授权
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                  // 根据自己的需求有其他操作再补充
                  // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                    app.globalData.avatarUrl = res.userInfo.avatarUrl,
                    app.globalData.username = res.userInfo.nickName,
                    app.globalData.sex = res.userInfo.gender
                  // console.log(user)
                  // console.log(user[0])
  
                  
                }
              });
            } else {
              // 用户没有授权
              // 改变 isHide 的值，显示授权页面
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
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }



  },
  addlabel:function(){
  wx.navigateTo({
    url: '/pages/pagemy/login/adddetail',
  })
  },
  
  bindfocus: function(){
   wx.navigateTo({
      url: '/pages/pagemy/focus/focus',
    })
  },
  bindfans: function(){
    wx.navigateTo({
      url: '/pages/pagemy/focus/fans',
    })
  },
  bindmark:function(){
    wx.navigateTo({
      url: '/pages/pagemy/honormark/honormark',
    })
  },
  bindmess:function(){
    wx.navigateTo({
      url: '/pages/pagemy/message/message',
    })
  },
  bindsev:function(){
    wx.navigateTo({
      url: '/pages/pagemy/service/service',
    })
  },
  bindtask:function(event){
    var Id=event.currentTarget.dataset.helpid
    wx.navigateTo({
      url: "./task/task?id= " + Id
    })
  },
  bindtask2:function(event){
    var Id=event.currentTarget.dataset.helpid
    wx.navigateTo({
      url: "./mytask/mytask?id= " + Id
    })
  },
  jump1:function(e){
    var that = this
    var data = that.data
    var tempPics = data.tempPics
    console.log(e)
        wx.navigateTo({
          url: '/pages/jumpto/index?topicid=' + e.currentTarget.dataset.id
        })
  },
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
  requdata:function(){  
     // 请求数据
     let that = this;
     wx.request({//get请求
       url: 'https://duing.site/task/getUserTasks?userid='+app.globalData.uid, ////服务器网址
       method:"GET",
       header: {
           'content-type': 'application/json' // 默认值
       },
       success: function(res) {
         console.log('获得的数据是：',res.data)
         var i=0
         var tasklist=[]
         for(i=0;i<res.data.length;i++){
           var tes=String(res.data[i].helpid)
           var res1=res.data[i]
           console.log('1111',res1)
           var fi=wx.getStorageSync(tes)
           tasklist.push({
             reward:res1.reward,
             site:res1.site,
             headimg:res1.headimg,
           helpid:res1.helpid,
            endtime:res1.endtime,
           title:res1.title,
            userid:res1.userid,
            status:res1.status,
            username:res1.username,
            fi:fi,
          })
           /*wx.getStorageSync({ 
             key: tes, 
             success: function(res) 
             {
               console.log('123',res1) ,///}, 
          /// })
           tasklist.push({
            reward:res1.reward,
            site:res1.site,
            headimg:res1.headimg,
          helpid:res1.helpid,
           endtime:res1.endtime,
          title:res1.title,
           userid:res1.userid,
           status:res1.status,
           username:res1.username,
           fi:res.data,
         })
          } })
          */that.setData({
           tasklist:tasklist.reverse()
         })}
        /* that.setData({
           tasklist:res.data
         })*/
 
         console.log('任务三',that.data.tasklist)
        // wx.setNavigationBarTitle({
          // title: that.data.nickname,
         //})
       },
       fail:function(err){
         console.log(err);
       },
     })
     wx.request({//get请求
       url: 'https://duing.site/help/getUserHelps?userid='+app.globalData.uid, ////服务器网址
       method:"GET",
       header: {
           'content-type': 'application/json' // 默认值
       },
       success: function(res) {
         console.log('获得的数据是：',res.data)
        
         that.setData({
           mytasklist:res.data.reverse()
         })
         console.log('任务三',that.data.tasklist)
        // wx.setNavigationBarTitle({
          // title: that.data.nickname,
         //})
       },
       fail:function(err){
         console.log(err);
       },
     })
     wx.request({//get请求
      url: 'https://duing.site/likeTopic/getUserLikeTopics?userid='+app.globalData.uid, ////服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
       
        that.setData({
          likelist:res.data.reverse()
        })
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })
     wx.request({//get请求
      url: 'https://duing.site/topic/getUserTopics?userid='+app.globalData.uid, ////服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
       
        that.setData({
          worklist:res.data.reverse()
        })
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })

     }
})
