import regeneratorRuntime from '../../lib/runtime/runtime';

import {getSetting,openSetting,chooseAddress} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取地址的数据
    address: {}
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  1.获取缓存中的收货地址,默认值为空字符串。空对象的布尔值也是true
    const address = wx.getStorageSync('address');
    // 给address赋值
    this.setData({ address})
     console.log(address)
    
      
  },
  handelGetAddress(){
    this.getUserAddress()
  },
  // 获取用户的收货地址
 async getUserAddress(){
  //  获取用户的授权状态
    const res1 = await getSetting()
    console.log(res1)
    // 判断授权状态
    const auth = res1.authSetting['scope.address']
    if(auth === false){
      await openSetting()
    }
    const res2 = await chooseAddress()
    res2.detialAdress = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
    this.setData({
      address: res2
    })
    // 储存到本地存储中
    wx.setStorageSync('address', res2);
    console.log(res2)
  }
})