// components/search/index.js
import { KeywordModel }from '../../models/keyword.js';
const keywordModel = new KeywordModel();
import { BookModel } from '../../models/book.js';
const bookModel = new BookModel();
import { paginationBev } from '../behaviors/pagination.js';

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
      more:{
        type:String,
        observer:'loadMore'
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    // dataArray:[],
    searching:false,
    q:'',
    loading:false,
    loadingCenter:false,

  },

  attached(){
    this.setData({
      historyWords: keywordModel.getHistory(),
    });
    keywordModel.getHot().then(res =>{
      this.setData({
        hotWords:res,
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore:function(){
      if(!this.data.q){return}
      if (this._isLocked()){return}
      if (this.hasMore()){
        this._locked();
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books);
            this._unLocked();
          },(error)=>{
            this._unLocked();
          });
      }
    },

    _isLocked(){
      return this.data.loading? true:false
    },
    _locked(){
      //  this.data.loading =true;
      this.setData({
        loading:true
      });
    },
    _unLocked(){
      this.setData({
        loading: false
      });
    },


    onCancel(e){
      this.initialize();
      this.triggerEvent('cancel',{},{});
    },
    onDelete(e){
      this.initialize();
      this._closeResult();
    },

    onConfirm(e){
      this._showResult();
      this._showLoadingCenter();
      // this.initialize();
      const q = e.detail.value || e.detail.text;
      this.setData({
        q: q,
      });
      bookModel.search(0,q)
      .then(res =>{
        this.setMoreData(res.books); 
        this.setTotal(res.total);
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
      });
    },
    
  _showLoadingCenter(){
    this.setData({
      loadingCenter: true,
    });
  },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false,
      });
    },
  _showResult(){
    this.setData({
      searching: true,
    });
  },
    _closeResult() {
      this.setData({
        searching: false,
        q:'',
      });
    },

  }
})
