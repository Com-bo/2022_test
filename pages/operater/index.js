// 获取应用实例
const app = getApp()
const URL=app.globalData.URL
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    visible1: false,
    areaGroup:[],
    currentArea:"",
    currentDev:[]
  },
  handleOpen1 () {
    this.setData({
        visible1: true
    });
  },
  handleClose1 () {
    this.setData({
        visible1: false
    });
},
handleFruitChange(val) {
  var that=this
  that.setData({
    currentArea: val.detail.value,
    currentAreaId:val.detail.labelId
  },()=>{
    that.findDev(that.data.currentAreaId)
  });
},
findDev(area){
  var that=this
  wx.request({
    url: URL+'apps/ygcd/device/list', 
    data:{
      areaId:area
    },
    success (res) {
      console.log(res.data)
      that.setData({
        currentDev:res.data.data
      })
    }
  })
},
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad() {
    var that=this
    wx.request({
      url: URL+'apps/ygcd/a/area', 
      method:"GET",
      success (res) {
        console.log(res.data)
        that.setData({
          areaGroup:res.data.data,
          currentArea:res.data.data[0]["name"]
        },()=>{
          that.findDev(res.data.data[0]["id"])
        })
      }
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scanCodeEvent(){
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success (res) {
    //     console.log(res)
    //   }
    // })
    wx.navigateTo({
      url: '../register/index',
    })
  },
  getgroup(){
    wx.navigateTo({
      url: '../group/index',
    })
  }
})
