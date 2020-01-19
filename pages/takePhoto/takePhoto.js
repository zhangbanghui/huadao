// pages/takePhoto/takePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraShow: true,
    photoFile: '',
    filePath: ''
  },
  handleTakePhoto() {
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath)
        this.setData({
          photoFile: res.tempImagePath,
          cameraShow: false
        })
      }
    })
  },
  handleCancel() {
    this.setData({
      cameraShow: true,
      photoFile: ''
    })
  },
  handleConfirm() {
    wx.getFileSystemManager().readFile({
      filePath: this.data.photoFile, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        const eventChannel = this.getOpenerEventChannel()
        // eventChannel.emit('uploadImage', 'data:image/jpg' + ';base64,' + res.data);
        eventChannel.emit('uploadImage', res.data);
        
        wx.navigateBack()
      },
      fail: res => reject(res.errMsg)
    })
    
    
  }
})