/*
在页面数据渲染时

*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取地址的数据
    address: {},

    // 获取购物车数据
    cart: [],

    // 底部商品总价格
    totalPrice: 0,
    // 底部结算数量
    totalNum: 0

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //  获取缓存中的收货地址,默认值为空字符串。空对象的布尔值也是true
    const address = wx.getStorageSync('address');

    // 获取缓存中商品详情的数据
    let cart = wx.getStorageSync('cart')

    // 筛选出checked=true的数据
    cart = cart.filter(v=>v.checked)
    // 给address赋值
    this.setData({
      address,
      cart
    })

    // 调用计算商品方法
this.countData(cart)

  },

  // 计算商品总价格
  countData(cart) {
    // 总价格根据选中的checked=true的数量计算
    let totalPrice = 0
    // 总数量根据选中的checked=true的数量计算
    let totalNum = 0;
    cart.forEach((v, i) => {
      // 如果商品被选中
      if (v.checked) {
        // 计算价格和数量
        totalPrice += v.num * v.goods_price
        totalNum += v.checked
      }
    })

    // 重新赋值
    this.setData({
     totalPrice,totalNum
    })

  },


})