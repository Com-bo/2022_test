const app = getApp()
const URL=app.globalData.URL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: ''
  },
  checkArea(){
    var that=this
    wx.getLocation({
      type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          success:function(res){
            console.log(res)
            wx.chooseLocation({
              success:function(res){
                console.log(res)
                that.setData({
                  areaname:res.name
                })
              }
            })
          }
        })
      }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    wx.request({
      url: URL+'apps/ygcd/a/taocan', 
      method:"GET",
      success (res) {
        that.setData({
          taocanData:res.data.data
        })
        
      }
    })

    wx.request({
      url: URL+'apps/ygcd/a/device?areaId=99815133659806374', 
      method:"GET",
      success (res) {
        that.setData({
          deviceData:res.data.data
        })
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})