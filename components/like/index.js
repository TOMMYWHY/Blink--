// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,
      value: false,
      observer:function(){}
    },
    count:{
      type:Number
    }
    

  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'images/like.png',
    noSrc:'images/like@dis.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //喜欢点击
    onLike:function(e){
      // console.log(22);
      let like =  this.properties.like;// 获取属性
      let  count = this.properties.count;
      // console.log(like);
      // like = !like
      count = like ? count - 1 : count + 1; 
      this.setData({
        count : count,
        like : !like
      })
      
      //添加自定义事件 判断是否点赞
      let behavior = this.properties.like?'like':'cancel';
      //激活事件
      this.triggerEvent('like',{
        behavior:behavior,
      },{});
    }
  }
})
