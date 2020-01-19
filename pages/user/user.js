// pages/user/user.js
import netWork from '../../service/request.js'
const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'MXLBZ-QUMYX-62M4D-7NMJP-5SWBS-YBBF3'
});
Page({
  data: {
    location: '',
    headPhoto: '',
    userInfo: {
      stuName: '',
      stuNo: '',
      stuPhone: '',
      stuSex: '',
      stuTeacher: ''
    },
    isNeedBind: true
  },
  handleBind() {
    const _this = this;
    wx.navigateTo({
      url: '../bindCheck/bindCheck',
      events: {
        getInfo: function (data) {
          console.log(1111, data)
          _this.setData({
            userInfo: data
          })
        }
      }
    })
  },
  getLocation() {
    wx.getLocation({
      isHighAccuracy: true,
      success: res => {
        console.log(res)
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
        console.log(res)
        this.setData({
          location: res.result.address
        })
      }
    })
  },
  onLoad() {
    wx.showLoading({
      title: '获取信息中'
    })
    wx.login({
      success: (res) => {
        netWork.login(res.code)
        .then(res => {
          app.globalData.token = res.data;
          return netWork.getUserInfo(app.globalData.token)
        })
        .then(res => {
          wx.hideLoading()
          const resData = res.data;
          if(resData.code == '200') {
            this.setData({
              isNeedBind: false
            })
            const resData = res.data.result;
            if (!resData.stuTeacher) {
              resData.stuTeacher = '';
            } else if (!resData.stuName) {
              resData.stuName = '';
            } else if (!resData.stuNo) {
              resData.stuNo = '';
            } else if (!resData.stuSex) {
              resData.stuSex = '';
            }
            if (resData.stuSex == '1') {
              resData.stuSex = '男'
            } else if (resData.stuSex == '0') {
              resData.stuSex = '女'
            }
            console.log('resData', resData)
            app.globalData.userInfo = resData;
            this.setData({
              userInfo: resData
            })
          }else {
            const _this = this;
            wx.navigateTo({
              url: '../bindCheck/bindCheck',
              events: {
                getInfo: function (data) {
                  const resData = data;
                  if (!resData.stuTeacher) {
                    resData.stuTeacher = '';
                  } else if (!resData.stuName) {
                    resData.stuName = '';
                  } else if (!resData.stuNo) {
                    resData.stuNo = '';
                  } else if (!resData.stuSex) {
                    resData.stuSex = '';
                  }
                  if (resData.stuSex == '1') {
                    resData.stuSex = '男'
                  } else if (resData.stuSex == '0') {
                    resData.stuSex = '女'
                  }
                  _this.setData({
                    isNeedBind: false,
                    userInfo: resData
                  })
                }
              }
            })
          }
          
          console.log('getUserInfo', res)
        })
      }
    })
    // this.setData({
    //   headPhoto: app.globalData.userInfo.avatarUrl
    // })
  }
})