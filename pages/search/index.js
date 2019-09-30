// pages/search/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from '../../request/index'

Page({
  data: {
      queryList:[]
  },

  // 输入事件
   handelSearch(e){
    this.getQuery(e)
  },
  async getQuery(e){
    const {value} = e.detail
    const res = await request({url:'/goods/qsearch',data:{query:value}})
    console.log(res)
    this.setData({
      queryList: res
    })
  }
  
 

})