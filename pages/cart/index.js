// 计算，数据（因为这个计算功能会被多次用到，所以需要封装）
// 1.全选
// 2.总价格
// 3.总购买数量

/*商品的单选功能
1. 给复选框的父元素绑定bindChange
2.获取当前的选中的状态
  1.获取源购物车数组中的元素的选中状态
  2.直接取反即可
3.去修改data中的carts和缓存中的carts
4.再重新计算数据（价格，数量）


商品的数量编辑
1.给数量按钮绑定点击事件
 1.给“+” 和 “-”都绑定同一个事件 “+” =>{{1}}, "-" =>{{-1}}
 2.传递一个参数，被点击的索引index
 3.获取被点击的商品
 cart[index].num += operation
 4.去修改data中的carts和缓存中的carts
 5.再重新计算数据（价格，数量）


 商品的数量编辑-删除
 1.当用户点击“-”，同时num值等于1
 2.弹出窗口。询问用户是否要删除
 3.用户点击了是
 4.用户点击了否


 点击结算功能
 1.判断用户有没有选中购买的商品
 2.判断用户有没有选中收货地址
 3.都满足了，跳转页面，跳转到支付页面

*/

import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取地址的数据
    address: {},

    // 获取购物车数据
    cart: [],
    // 底部全选框
    allChecked: false,

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
    const cart = wx.getStorageSync('cart')
    // 给address赋值
    this.setData({
      address,
      cart
    })

    // 调用计算商品方法
this.countData(cart)

  },
  handelGetAddress() {
    this.getUserAddress()
  },
  // 获取用户的收货地址
  async getUserAddress() {
    //  获取用户的授权状态
    const res1 = await getSetting()
    console.log(res1)
    // 判断授权状态
    const auth = res1.authSetting['scope.address']
    if (auth === false) {
      await openSetting()
    }
    const res2 = await chooseAddress()
    res2.detialAdress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
    this.setData({
      address: res2
    })
    // 储存到本地存储中
    wx.setStorageSync('address', res2);
  },

  // 计算商品总价格
  countData(cart) {
// 只要cart数组中有一个复选框没有被选中，全选框就是fales    // 
    let allChecked = true;
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
      }else {
        allChecked = false;
      }
    })
     // 还需要再判断全选框,因为在全选的情况下，删除全部商品后，全选框还保持着全选，所以要判断如果购物车的长度为0时，要把全选框给去掉
     allChecked = cart.length === 0 ? false : allChecked

    // 重新赋值
    this.setData({
      allChecked,totalPrice,totalNum
    })

  },

  // 点击单选框触发的事件
  handelChange(e){
    // 1.获取选中单选框的索引位置
    const {index} = e.target.dataset
    // 2.获取购物车数组
    const {cart} = this.data
    // 3.选中属性取反
    cart[index].checked = !cart[index].checked
    // 4.把购物车重新设置到data中和缓存中
    this.setData({
      cart
    })
    // 5.储存到缓存中
    wx.setStorageSync('cart',cart)
    // 6.重新计算价格
    this.countData(cart)
  },



  // 商品数量编辑的功能
  async handelNumUpdate(e){      
    const {operation,index} = e.target.dataset
    const {cart} = this.data
    // 判断是否是点击了“-”，同时商品数量为一时
    if(operation === -1 && cart[index].num === 1 ){
      const res = await showModal({title:'提示',content:"是否确认删除该商品"})
      if(res){
        // 如果选中确认时，从数组中删除该商品
        cart.splice(index,1)
      }else {
        // 点击取消，就return
        return
      }
  
      
    }else {
      cart[index].num += operation   

    }   
    // 把购物车重新设置到data中和缓存中
    this.setData({
      cart
    })
    //储存到缓存中
    wx.setStorageSync('cart',cart)
    // 重新计算价格
    this.countData(cart)

  },

  // 点击支付所触发的事件
  async handelPay(){
    const {address,totalNum} = this.data
    // 判断是否有地址
    if(!address){
        await showToast({title:'你还没选中收货地址',icon:"none",mask:true})
        return;
    }
    if(!totalNum){
      await showToast({title:'你还没选中商品',icon:"none",mask:true})
        return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      

    // 判断是否有勾选商品
    
    
  
      
  }
})