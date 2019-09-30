

/**
 * 
 * 点击收藏事件
 * 1.给收藏绑定tap事件
 * 2.获取到缓存中的collect数据 || [] 
 * 3.判断当前商品是否被收藏
 *    1.被收藏了，把该商品从colletc中删除
 *    2.没被收藏，把该商品添加到collect中 
 * 4.加一些提示
 *   1.图标变颜色
 *   2.弹窗提示
 */


import regeneratorRuntime from '../../lib/runtime/runtime';
import {request,showToast} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    goodsDetailList:{},

    // 判断该商品是否被收藏图标
    isCollect:false
    
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
    const {goodsDetailList} = this.data
    let collet = wx.getStorageSync('collect') || []
    const index = collet.findIndex(v => v.goods_id === goodsDetailList.goods_id)
      this.setData({
        isCollect : index === -1 ? false : true
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
  },

  async handelCollect(){
    const {goodsDetailList} = this.data
    // 获取缓存中的collect数据
    let collect = wx.getStorageSync('collect') || []
    // 判断该商品是否存在collect中
    const index = collect.findIndex(v => v.goods_id === goodsDetailList.goods_id)
    if(index === -1) {
      // 如果不存在，添加到缓存中
      collect.push(goodsDetailList)
      // 收藏成功
      this.setData({
        isCollect: true
      })
      await showToast({title:"收藏成功",mask: true})
  
    }else {
      // 如果存在就删除
      collect.splice(index,1)
      // 取消收藏
      this.setData({
        isCollect: false
      })
      await showToast({title:"取消收藏",mask: true})
    }
    wx.setStorageSync('collect',collect)
  }

})