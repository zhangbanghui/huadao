import netWork from './network.js'
const hd = {
  // 登录
  login: function (code) {
    return netWork({
      url: 'huadao/wx/api/login/' + code,
      method: 'get'
    }) 
  },
  // 获取签到信息
  getSignInfo: function (gid, uid, token) {
    return netWork({
      url: 'huadao/activity/sign/' + gid + '/' + uid,
      method: 'get',
      header: {
        'X-Access-Token': token
      }
    }) 
  },
  // 获取用户信息
  getUserInfo: function (token) {
    return netWork({
      url: 'huadao/wx/api/getUserInfo',
      method: 'get',
      header: {
        'X-Access-Token': token
      }
    })
  },
  // 用户签到功能
  userSignIn: function (options, token) {
    return netWork({
      url: 'huadao/activity/sign',
      method: 'post',
      header: {
        'X-Access-Token': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: options
    })
  },
  // 验证绑定信息
  checkBind: function (phoneNo, stuNo, token) {
    return netWork({
      url: 'huadao/wx/api/checkbind',
      method: 'POST',
      header: {
        'X-Access-Token': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phoneNo,
        stuNo
      }
    })
  }
}
export default hd 