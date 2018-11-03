// import {HTTP} from '../../util/http.js';
// let http = new HTTP();
import { ClassicModel } from '../../models/classic.js';
let classicModel = new ClassicModel;
import {LikeModel} from '../../models/like.js';
let likeModel = new LikeModel;

const app = getApp()
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    // like_status:false, //当前用户【id=1】是否喜欢
    latest: true,
    first: false ,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     classicModel.getLatest((res)=>{
       console.log(res)
        // console.log(res.all_users[0].pivot.isLike);
      //  let like_status = res.all_users[0]
        //setData 更新data 内容。 
        this.setData({
          classicData: res, //绑定数据
          // like_status: res.all_users[0].pivot.isLike, 
        });
    });

    //   wx.request()  异步请求
    /*
    wx.request({
          url: 'http://weichat.test/api/v1/classic/show/latest/',
          header:{
            appkey:""
          },
          success:(res)=>{
            console.log(res);
            console.log(this.data.test);
          }
        })
    */    
  },

//监听点击事件
  onLike: function (e) {
    console.log(e);
    let behavior = e.detail.behavior; //当前 like 状态
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
   },


  

//下一个
  onPrevious:function(e){
    this._updateClassic('previous');
     /*
     *tommy 解决方案
     //index 取值
     if(!index){
       index = 1;
       console.log(res.error);
     }
     classicModel.getPrevious(index, (res)=>{
       console.log(res);
       //有错误时显示错误信息。
       if (res.error){
         console.log(res.error);
       }
      //update data
      this.setData({
        classicData:res
      })
     });
     */

   },
  //上一个
  onNext: function (e) {
    this._updateClassic('next');

  },
  _updateClassic:function(nexOrPrevious){
    let index = this.data.classicData.index;
    classicModel.getClassic(index, nexOrPrevious , (res)=>{
      console.log(res);
      this.setData({
        classicData: res,
        // like_status: res.all_users ? res.all_users[0].pivot.isLike:0 , //后台数据中没有合并like_status时
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    });
  },

  
  
  
  
  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})