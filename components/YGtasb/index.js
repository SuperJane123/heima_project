// components/YGtasb/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabData:{
      type:Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前的索引位置
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击切换栏事件
    handelTap(e){
      this.setData({
        currentIndex: e.target.dataset.index
      })
    }
  }
})
