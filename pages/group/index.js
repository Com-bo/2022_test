const app = getApp()
const URL=app.globalData.URL
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editMark:true,
    delMark:true,
    areaData:[],
    visible1:false,
    areavalue:""
  },
  editFn(){
    this.setData({
      editMark: !this.data.editMark
    });
  },
  delFn(){
    this.setData({
      delMark: !this.data.delMark
    });
  },
  handleOpen () {
    this.setData({
        visible1: true
    });
  },
  handleClose () {
    this.setData({
        visible1: false
    });
  },

  // 函数操作
  addChange(e){
    this.setData({
      areavalue:e.detail.detail.value
    })
  },
  addFn(){
    this.saveData("",this.data.areavalue)
  },
  // 接口请求
  getData(){
    $Toast({
      content: '加载中',
      type: 'loading',
      duration:0
    });
    var that=this
      wx.request({
        url: URL+'apps/ygcd/area/list', 
        method:"GET",
        success (res) {
          that.setData({
            areaData:res.data.data
          })
          $Toast.hide()
        }
      })
  },
  saveData (id,name) {
    console.log(id,name)
    $Toast({
      content: '加载中',
      type: 'loading',
      duration:0
    });
      var that=this
      wx.request({
        url: URL+'apps/ygcd/area/save', 
        data:{
          id,
          name:1213231
        },
        success (res) {
          console.log(res)
          $Toast.hide()
          that.getData()
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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