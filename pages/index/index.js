Page({
    data: {
        // 轮播图数组
        swiperList: [],

        // 导航部分数组
        navitemList: []
    },
    // 页面的钩子函数，监听页面加载
    onLoad() {
        this.getSwiperData()
        this.getNavItem()
    },

    // 获取轮播图数据
    getSwiperData() {
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata', //仅为示例，并非真实的接口地址
            success: (res => {
                this.setData({
                    swiperList: res.data.message
                })
            })
        })
    },

    getNavItem(){
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/catitems', 
            success: (res => {
                console.log(res.data)
                this.setData({
                    navitemList:res.data.message
                })
            })
        })
    }
})