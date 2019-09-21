Page({
    data: {
        // 轮播图数组
        swiperList: []
    },
    // 页面的钩子函数，监听页面加载
    onLoad() {
        this.getSwiper()
    },
    getSwiper() {
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata', //仅为示例，并非真实的接口地址
            success: (res => {
                console.log(res.data)
                this.setData({
                    swiperList: res.data.message
                })


            })
        })
    }
})