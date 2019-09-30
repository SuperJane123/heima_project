/*loadding事件注意事项
1.因为有发送了3个请求，所以会触发3个loadding事件，但是微信做了规定，只会显示一个loading，
2.意味着也只能取消一个loading，这会导致不能保证全部请求都回来了
3.现在要做的是确保所有数据请求回来了，再取消loading事件
4.可以用变量来记录次数*/
// 请求的记录次数
let requestTime = 0;
export const request = (parmars) => {
    // 请求接口的基础路径
    const baseURL = 'https://api.zbztb.cn/api/public/v1'
    return new Promise((resolve, reject) => {
        // 每次发送请求时次数加1
        requestTime++
        // 发送请求前添加loading事件
        wx.showLoading({
            title: '努力加载中',
            mask: true,
        });
        wx.request({
            ...parmars,
            url: baseURL + parmars.url,
            // 成功触发的行数
            success: (res) => {
                if (res.data.meta.status && res.data.meta.status === 200) {
                    resolve(res.data.message)
                } else {
                    reject(res)
                }

            },

            // 请求失败时触发的函数
            fail: (err) => {
                reject(err)
            },
            // 无论失败还是成功都会调用的函数
            complete: () => {
                // 请求完回来后，次数减-
                requestTime--
                // 无论成功是否都取消loading事件
                requestTime === 0 && wx.hideLoading();

            }
        })
    })

}





// Promise形式的getsetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

// Promise形式的openSetting

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}


// Promise形式的chooseAddress
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

// Promise形式的showToast
export const showToast=(parmars)=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            ...parmars,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            
        });
    })
   
      
}

// Promise形式的showModal
export const showModal = (parmars)=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
           ...parmars,
            success: (result) => {
                resolve(result.confirm)
            },
           
        });
          
    })
      
}

// Promise形式的wxLogin
export const wxLogin = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
           
        });
          
    })
}

  