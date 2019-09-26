import regeneratorRuntime from '../../lib/runtime/runtime';

import {getSetting,openSetting,chooseAddress} from '../../request/index'
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


  // // 获取收货地址事件
  // async handelGetAddress(){
  //  const result1 = await getSetting()
  //  console.log(result1) 
  //  const auth = result1.authSetting['scope.address']
  //   if(auth === false){
  //     openSetting()
  //   }
  //  const result2 = chooseAddress()
  // console.log(result2)

  // }
  handelGetAddress(){
    this.getUserAddress()
    
  //  wx.getSetting({
  //    success: (result) => {
  //      const auth = result.authSetting['scope.address']
  //      if(auth === false){
  //        wx.openSetting({
  //          success: (result2) => {
  //            console.log(result2)
  //            wx.chooseAddress({
  //              success: (result3) => {
  //                console.log(result3)
  //              },
               
           
  //            });
               
  //          },
         
  //        });
           
  //      }else {
  //        wx.chooseAddress({
  //          success: (result4) => {
  //            console.log(result4)
  //          },
  //        });
           
  //      }
  //    },
     
  //  });
     
      
  },
  // 获取用户的收货地址
 async getUserAddress(){
    const res1 = await getSetting()
    console.log(res1)
    const auth = res1.authSetting['scope.address']
    if(auth === false){
      await openSetting()
    }
    const res2 = await chooseAddress()
    console.log(res2)
  }
})