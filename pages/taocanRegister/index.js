const app = getApp()
const URL=app.globalData.URL
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: 1,
    value2: '222',
    value3: '',
    value4: '777',
    value5: '',
    value6: '',
    value7: ''
  },
  saveTaocan(){
    var that=this
    var taoCanData={
      name:that.data.value1,
      price:that.data.value2,
      duration:that.data.value3,
      pulse:that.data.value4,
    }
    console.log(taoCanData)
    that.saveData(taoCanData)
  },

  //接口请求
  saveData (data) {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration:0
    });
      var that=this
      wx.request({
        url: URL+'apps/ygcd/taocan/save',
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data,
        success (res) {
          $Toast.hide()
          $Toast({
            content: '操作成功',
            type: 'success',
            duration:1
          });
        }
      })
  },
  delData (id) {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration:0
    });
      var that=this
      wx.request({
        url: URL+`apps/ygcd/area/del?id=${id}`,
        method:"DELETE",
        success (res) {
          $Toast.hide()
          $Toast({
            content: '操作成功',
            type: 'success',
            duration:1
          });
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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