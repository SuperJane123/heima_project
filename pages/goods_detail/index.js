import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    goodsDetailList:{}
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用获取详情数据方法
    this.getGoodsDetail(options.goods_id)
  },


  // 获取商品详情数据
  //  getGoodsDetail(goods_id){
  //   request({url:'/goods/detail',data:{goods_id}})
  //   .then(res=>{
  //     console.log(res)
  //     this.setData({
  //       goodsDetailList:res.data.message
  //     })
  //   })
  // },
   // 获取商品详情数据 ---- es7的写法
  async getGoodsDetail(goods_id){
    let res = await request({url:'/goods/detail',data:{goods_id}})
    this.setData({
      goodsDetailList:res
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
    num:1,
    checked: true
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
  },

  // 点击轮播实现大图预览
  handlePreview(e){
    const {goodsDetailList} = this.data
     let urls = goodsDetailList.pics.map(v=> v.pics_mid_url)
    wx.previewImage({
      current: e.currentTarget.dataset.image, // 当前显示图片的http链接
       urls // 需要预览的图片http链接列表
    })
  }

})