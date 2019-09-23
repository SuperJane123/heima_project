import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    cateList: [],
    // 分类详情数据
    cateDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList()
  },

  getCateList(){
    request({url:'/categories'})
    .then(res=>{      
      this.setData({
        cateList:res.data.message,
        cateDetail: res.data.message[0].children
      })
      console.log(res.data.message[0].children)
    })
  }
})