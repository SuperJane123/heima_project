// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  // 点击收货地址时触发的事件
  getAddress(){
    wx.chooseAddress({
      success (res) {
        console.loh(res)
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      }
    })
  }


  
})