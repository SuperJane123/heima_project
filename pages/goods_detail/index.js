
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    goodsDetailList:{}
    
    
  },
   // 请求详情接口参数
   goods_id:'',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.goods_id = options.goods_id
    // 调用获取详情数据方法
    this.getGoodsDetail()
  },


  // 获取商品详情数据
  getGoodsDetail(){
    request({url:'/goods/detail',data:{goods_id:this.goods_id}})
    .then(res=>{
      console.log(res)
      this.setData({
        goodsDetailList:res.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})