const app = getApp()
const URL=app.globalData.URL
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editMark:true,
    delMark:true,
    areaData:[],
    visible:false,
    areavalue:"",
    dataId:"",
    dataIndex:"",
    funType:0
  },
  // 打开关闭编辑删除
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
  // 打开关闭模态框
  handleOpen () {
    this.setData({
        visible: true
    });
  },
  handleClose () {
    this.setData({
        visible: false
    });
  },

  // 函数操作
  addChange(e){
    this.setData({
      areavalue:e.detail.detail.value
    })
  },
  operateFn(){
    var that=this
    console.log(that.data.dataId)
    switch(that.data.funType){
      case "0":
        if(that.data.areavalue==""){
          $Message({
              content: '名称不能为空',
              duration: 3,
              type: 'error'
          });
        }else{
          that.saveData("",that.data.areavalue)
        }
        break;
      case "1":
        if(that.data.areavalue==""){
          $Message({
            content: '名称不能为空',
            duration: 3,
            type: 'error'
          });
        }else{
          that.saveData(that.data.dataId,that.data.areavalue)
        }
        break;
      case "2":
        that.delData(that.data.dataId)
        break;
    }
  },
  getDataEvent(e){
    var that=this
    this.setData({
      funType:e.currentTarget.dataset.funtype
    })
    that.handleOpen()
    if(e.currentTarget.dataset.funtype!=0){
      that.setData({
        areavalue:e.currentTarget.dataset.dataname,
        dataIndex:e.currentTarget.dataset.dataindex,
        dataId:e.currentTarget.dataset.dataid
      });
    }else{
      that.setData({
        areavalue:"",
        dataIndex:"",
        dataId:""
      });
    }
  },
  // 接口请求
  getData(){
    // $Toast({
    //   content: '页面加载中',
    //   type: 'loading',
    //   duration:0
    // });
    var that=this
      wx.request({
        url: URL+'apps/ygcd/area/list', 
        method:"GET",
        success (res) {
          that.setData({
            areaData:res.data.data
          })
          // $Toast.hide()
        }
      })
  },
  saveData (id,name) {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration:0
    });
      var that=this
      wx.request({
        url: URL+'apps/ygcd/area/save',
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          id,
          name
        },
        success (res) {
          $Toast.hide()
          that.getData()
          that.handleClose()
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
          that.getData()
          that.handleClose()
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