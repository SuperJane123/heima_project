/*
给接口数据加一个缓存效果
1.在第一次发送请求成功的时候，先把数据接口，this.cateList缓存起来
2.请求接口前，判断本地存储是否有数据
3.如果有数据，要判断是否有过期，如果没有过期，使用缓存数据渲染，如果过期了，就重新请求数据
4.如果本地存储没有数据，也要请求接口


*/


import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */

  //  接口请求回来的数据
  cateList: [],

  data: {

    // 左侧分类数据
    menuList: [],
    // 右侧分类详情数据
    cateDetail: [],

    // 当前索引位置
    currentIndex: 0,

    // 滚动条的位置
    scrollTop:100

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  
// 判断本地存储事件
loadData(){
  // 获取本地数据
  let localStorage =  wx.getStorageSync('cate')
  // 如果有数据
  if(localStorage){
    // 判断超过多少秒后，请求数据
    if(Date.now() - localStorage.time > 1000 * 10){
      // 过期了
      this.getCateList()
      console.log(123)
    }else {  //如果没有过期
      this.getCateList()
      this.cateList = localStorage.data
      const menuList = this.cateList.map(v=>v.cat_name)
      const cateDetail = this.cateList[0].children
      this.setData({
        menuList,
        cateDetail
      })
      console.log(46)
    }
  }else {  //如果没有数据
    this.getCateList()
  }
},


// 获取分类数据
  getCateList(){
    request({url:'/categories'})
    .then(res=>{
      this.cateList = res
        // 储存数据到本地存储中
        wx.setStorageSync('cate', {
          data: this.cateList,
          time: Date.now()
        })
        
      // 左侧分类数据赋值
      const menuList =this.cateList.map(v=>v.cat_name)
      // 右侧默认第一个商品详情赋值
      const cateDetail = this.cateList[0].children

    
      // 更新数据
      this.setData({
        menuList,
        cateDetail,
      })
      
    })
  },




  // 点击左侧导航栏事件
  handelTap(e){
    const {index} = e.target.dataset
    const cateDetail = this.cateList[index].children
    this.setData({
      currentIndex: index,
      cateDetail,
      scrollTop: 0
      
    })

  }
})