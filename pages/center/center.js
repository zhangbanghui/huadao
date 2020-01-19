// pages/center/center.js
import netWork from '../../service/request.js'
const app = getApp()
const QQMapWX = require('../../qqmap-wx-jssdk/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'MXLBZ-QUMYX-62M4D-7NMJP-5SWBS-YBBF3'
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    photoFile: '',
    cameraShow: true,
    date: '',
    detailTime: '',
    timer: '',
    headPhoto: '',
    userName: '',
    location: '',
    signDetail: {}
  },

  takephoto() {
    
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          photoFile: res.tempImagePath,
        })
        this.setData({
          cameraShow: false
        })
      }
    })
  },
  getDate() {
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '.' + month + '.' + day
  },
  getDetailTime() {
    let date = new Date();
    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour
    let minute = date.getMinutes();
    if (minute < 10) minute = '0' + minute
    let second = date.getSeconds();
    if (second < 10) second = '0' + second 
    return hour + ':' + minute + ':' + second
  },
  handleRedirectTakePhoto() {
    const _this = this;
    wx.requestSubscribeMessage({
      tmplIds: ['9NQ2wUPNsgHl5n3yw7slxgNoHMbb6MBHXQypJabVTj8']
    })
    wx.navigateTo({
      url: '/pages/takePhoto/takePhoto',
      events: {
        uploadImage: function (imageBase) {
          console.log('imageBase', imageBase)
          const params = {};
          params.addr = _this.data.location;
          params.gid = 1;
          params.img = imageBase;
          params.uid = app.globalData.userInfo.id;
          const token = app.globalData.token;
          console.log('params', params, token)
          netWork.userSignIn(params, token).then(res => {
            console.log('userSignIn', res)
            if(res.data.code == '200') {
              wx.showToast({
                title: '签到成功'
              })
              netWork.getSignInfo(1, app.globalData.userInfo.id, token).then(res => {
                console.log('getSignInfo', res)
                let resData = res.data.result;
                if (!resData) {
                  console.log(123123)
                  resData = {};
                  resData.lastModifyTime = '暂无打卡记录';
                  resData.integration = 0;
                  resData.signCount = 0;
                }
                console.log(resData)
                _this.setData({
                  signDetail: resData
                })
              })
            }else {
              wx.showToast({
                title: '今天已签到过',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  getLocation() {
    wx.showLoading({
      title: '定位中'
    })
    wx.getLocation({
      isHighAccuracy: true,
      success: res => {
        this.getAddress(res.latitude, res.longitude)
      }
    })
  },
  getAddress(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: res => {
        wx.hideLoading()
        this.setData({
          location: res.result.address
        })
      }
    })
  },
  onLoad() {
    console.log(app.globalData)
    const uid = app.globalData.userInfo.id;
    const token = app.globalData.token;
    netWork.getSignInfo(1, uid, token).then(res => {
      let resData = res.data.result;
      if (!resData) {
        console.log(123123)
        resData = {};
        resData.lastModifyTime = '暂无打卡记录';
        resData.integration = 0;
        resData.signCount = 0;
      }
      this.setData({
        signDetail: resData
      })
    })


    // this.setData({
    //   date: this.getDate()
    // })
    this.setData({
      date: this.getDate(),
      timer: setInterval(() => {
        this.setData({
          detailTime: this.getDetailTime()
        })
      }, 1000)
    })
    
    this.getLocation()
  },
  onUnload() {
    clearInterval(this.timer)
  }
})