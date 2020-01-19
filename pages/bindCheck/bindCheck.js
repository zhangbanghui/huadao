// pages/bindCheck.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNo: '',
    stuNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleSumbit: function () {
    const token = app.globalData.token;
    const netWork = app.globalData.netWork;
    wx.showLoading({
      title: '正在验证中'
    })
    

    netWork.checkBind(this.data.phoneNo, this.data.stuNo, token)
    .then(res => {
      console.log(res.data.code == '500')
      wx.hideLoading()
      if(res.data.code == '200') {
        wx.showToast({
          title: '绑定成功',
          icon: 'success'
        })
        netWork.getUserInfo(app.globalData.token).then(res => {
          console.log('getUserInfo', res.data.result)
          app.globalData.userInfo = res.data.result;
          const eventChannel = this.getOpenerEventChannel()
          eventChannel.emit('getInfo', res.data.result);
          wx.navigateBack({
            success: function () {}
          });
        })
        
        
      }else {
        this.setData({
          phoneNo: '',
          stuNo: ''
        })
        wx.showToast({
          title: '验证失败',
          icon: 'none'
        })
      }
      
    })
    // wx.navigateBack();
  },
  telEdit: function (e) {
    const value = e.detail.value;
    this.setData({
      phoneNo: value
    })
  },
  numEdit: function (e) {
    const value = e.detail.value;
    this.setData({
      stuNo: value
    })
  }
})