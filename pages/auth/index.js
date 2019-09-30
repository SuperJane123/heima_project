// pages/auth/index.js
/**
 * 1.获取用户token
 *    1.构成参数
 *      1.来自用户信息
 * ·、   2.来自用户登陆
 *    2.发送后台获取用户token
 * 2.token获取成功后
 *   1.把token存入到缓存中
 *   2.返回上一页
 * 
 * 
 * 
 */
import regeneratorRuntime from '../../lib/runtime/runtime';
import {wxLogin,request} from '../../request/index'

Page({

  // 获取用户token值
  handelGetUserInfo(e){
   this.getToken(e)
      
  },

  // 获取用户token
  async getToken(e){
    // wx返回的token值
    const {code} = await wxLogin()
  	const {  encryptedData,	rawData,iv,signature} = e.detail
    // 请求参数
    const tokenParams = {
      code,encryptedData,	rawData,iv,signature
    }
    console.log(tokenParams)
    const res = await request({url:"/users/wxlogin",method: "post",data:tokenParams})
    console.log(res)
  }


})