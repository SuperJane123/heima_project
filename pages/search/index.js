/**
 * 1.给输入框绑定一个input事件
 *   1.在事件中获取输入框的值
 *   2.简单做一个非空的判断
 *   3.把输入框的值发送到后台
 *   4.把返回的数据渲染到页面即可
 * 2.在用户输入 一秒后，再发送请求 ---俗称防抖，防止抖动 （通过定时器来清除上一次的输入）
 * 
 * 
 */
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from '../../request/index'

Page({
  data: {
      queryList:[]
  },
  timeId : 2,

  // 输入事件
   handelSearch(e){
    const {value} = e.detail
    // 如果不是空字符串才发送请求
    if( value.trim()){
      // 清除定时器-- 清楚的是上一个输入值的定时器
      clearTimeout(this.timeId)
      this.timeId = setTimeout(()=>{
        this.getQuery(value)
      },1000)
      
    }
    
  },
  async getQuery(value){
      const res = await request({url:'/goods/qsearch',data:{query:value}})
    this.setData({
      queryList: res
    })
    
  }
  
 

})