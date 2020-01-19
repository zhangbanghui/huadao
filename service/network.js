export default function(options) {
  const baseUrl = 'https://www.huadaosport.cn/';
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      method: options.method || 'get',
      header: options.header || '',
      data: options.data || '',
      success: resolve,
      fail: reject
    })
  })
}