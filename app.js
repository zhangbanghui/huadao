//app.js
import netWork from './service/request.js'
App({
  onLaunch: function () {
    this.globalData.netWork = netWork;
    // 登录
    wx.login({
      success: res => {
        console.log('res', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: 'https://www.huadaosport.cn/huadao' + res.code,
        //   method: 'get',
        //   success(res) {  
        //     console.log('denglu', res)
        //   }
        // })

        // 登录
        // netWork.login(res.code)
        // .then(res => {
        //   this.globalData.token = res.data;
        //   // 获取用户信息
        //   return netWork.getUserInfo(this.globalData.token)
        // })
        // .then(res => {
        //   console.log('getUserInfo', res)
        //   const resData = res.data;
        //   if (resData.code === 500) {
        //     wx.navigateTo({
        //       url: "../bindCheck/bindCheck",
        //     })
        //     return Promise.reject('用户未绑定')
        //   }else {
        //     this.globalData.userInfo = res.data.result;
        //     console.log('this.globalData', this.globalData)
        //     return netWork.getSignInfo(1, 2, this.globalData.token)
        //   }
        // })
        // .then(res => {
        //   console.log(res)
        // })
        // .catch(err => {
        //   console.log('err', err)
        // })
      }
    })
    // 获取用户信息
    // wx.openSetting()
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log(111)
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    token: null,
    netWork: null,
    isSign: false
  }
})