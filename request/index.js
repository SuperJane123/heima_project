
export const request = (parmars)=>{
    // 请求接口的基础路径
    const baseURL = 'https://api.zbztb.cn/api/public/v1'
    return new Promise((resolve,reject)=>{
        wx.request({
            ...parmars,
            url: baseURL + parmars.url, 
            // 成功触发的行数
            success: (res)=>{
                resolve(res)
            },
            
            // 请求失败时触发的函数
            fail:(err)=>{
                reject(err)
            },
            // 无论失败还是成功都会调用的函数
            complete: ()=>{

            }
        })
    })
    
}