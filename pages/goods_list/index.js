/*1.上拉加载下一页数据
  1先找到上拉滚动条触底事件（在页面的生命周期事件中见过，onReachBottom）
  2先判断有没有下一页数据，（总条数。页码，页条数）注意，如果提供的参数一般有页码数的，那请求回来显示的数据数量就是和页条数一样的
    2.1 先获取到总条数
     总页数= 总条数/页条数，像上取整     
     2.2 判断总页数和当前页数，如果当前页大于总页数，就是没有数据
     2.3 否则就是还有数据，页码数++
     2.4 需要重新发起异步请求，注意这里有bug
     2.5 如果没有下一页数据，需要弹窗提示用户即可
          */






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
    },

   
  },
   // 总条数
   totalPages:1 ,

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
        const {total,goods} = res.data.message
         // 接口返回数据
        //  新数据
         const newGoodsList = goods
        //  旧数据
         const beforeGoodsList = this.data.goodsList
        this.totalPages = Math.ceil(total / this.data.QueryParmas.pagesize) 
        this.setData({
          goodsList: [...beforeGoodsList,...newGoodsList]
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

    const {QueryParmas} = this.data
       
    
    //没有数据，弹窗口提示客户
    if(QueryParmas.pagenum >= this.totalPages){
      wx.showToast({
        title: '数据已加载完毕',
        mask: true,
      });
    }else {
       // 当触底时，页面++
       QueryParmas.pagenum++
       this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})