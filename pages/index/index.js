import {request} from '../../request/index'


Page({
    
    data: {
        // 轮播图数组
        swiperList: [],

        // 导航部分数组
        navitemList: [],

        // 楼层数组
        floorList: []
    },
    // 页面的钩子函数，监听页面加载
    onLoad() {
        this.getSwiperData()
        this.getNavItem()
        this.getfloorItem()
    },

    // 获取轮播图数据
    getSwiperData() {
        request({url:'/home/swiperdata'})
        .then(res=>{
            this.setData({
                swiperList: res.data.message
            })
        })
    },

    // 获取导航数据
    getNavItem(){
        
        request({url:'/home/catitems'})
        .then(res=>{
            this.setData({navitemList:res.data.message})
        })
    },

    // 获取楼层内容数据
    getfloorItem(){
 
        request({url:'/home/floordata'})
        .then(res=>{
            console.log(res)
            this.setData({
                floorList:res.data.message
            })
        })
    }
})