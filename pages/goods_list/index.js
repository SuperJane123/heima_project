

import {
  request
} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabl栏数据
    tabData: [{
        id: 0,
        title: "综合"
      },
      {
        id: 1,
        title: "销量"
      },
      {
        id: 2,
        title: "价格"
      },
    ],
    // 显示内容的索引
    index: 0,

    // 商品列表数据
    goodsList: [],

    //请求商品列表需要的参数
    QueryParmas: {
      query: "",
      cid: '',
      pagenum: 1,
      pagesize: 10
    }
  },

  // 获取子组件的数据
  handelgetIndex(e) {
    const {index } = e.detail
    this.setData({
      index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取cid分类参数
    const {cid} = options    
    this.data.QueryParmas.cid = cid
    this.getGoodsList()
  },
  getGoodsList() {
    // 获取商品列表数据
    request({
        url: '/goods/search',
        data:this.data.QueryParmas
      })
      .then(res => {
        console.log(res)
        this.setData({
          goodsList: res.data.message.goods
        })
      })

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