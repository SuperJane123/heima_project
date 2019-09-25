
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

  // 加入购物车事件
  handelAddCart(){
    const {goodsDetailList} = this.data
    // 读取本地数据，判断是否有数据
let cateList = wx.getStorageSync('cart') || [];
// 找出是否有添加过同样的商品
const index = cateList.findIndex(v=>v.goods_id === goodsDetailList.goods_id)

if(index === -1){
  cateList.push({
    goods_id: goodsDetailList.goods_id,
    goods_name:goodsDetailList.goods_name,
    goods_price:goodsDetailList.goods_price,
    goods_small_logo:goodsDetailList.goods_small_logo,
    num:1
  })
   // 储存数据到本地缓存里
   wx.setStorageSync('cart',cateList)
}else {
  cateList[index].num++;
  wx.setStorageSync('cart',cateList)
}



    // 提示客户加入购物车成功
    wx.showToast({
      title: '加入成功',
      mask: true,

    });
      
  }


})