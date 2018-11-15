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
    latest: true,//判断该 classic 是否为最新，并控制 nav 中的箭头
    first: false ,
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     classicModel.getLatest((res)=>{
      //  this._getLikeStatus(res.id, res.type);
      //  console.log(res)
        this.setData({
          classicData: res, //绑定数据
          likeCount: res.fav_nums,
          likeStatus:res.like_status
        });
    });  
  },

//监听点击事件
  onLike: function (e) {
    // console.log(e);
    let behavior = e.detail.behavior; //当前 like 状态
    console.log(behavior);
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
   },


//下一个
  onPrevious:function(e){
    this._updateClassic('previous');
   },
  //上一个
  onNext: function (e) {
    this._updateClassic('next');
  },
  // =================
  _updateClassic:function(nexOrPrevious){
    let index = this.data.classicData.index;
    classicModel.getClassic(index, nexOrPrevious , (res)=>{
      console.log(res);
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    });
  },

  _getLikeStatus:function(artID, category){
    // console.log(1);
    likeModel.getClassicLikeStatus(artID, category,(res)=>{
      console.log(res);
      
      this.setData({
        likeCount : res.fav_nums,
        likeStatus : res.like_status
      });
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