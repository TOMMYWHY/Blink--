import {HTTP} from '../util/http.js';

//classic 类 继承 HTTP
class ClassicModel extends HTTP{
  /*
  *首次加载获取最新一期
  */
  getLatest(sCallback){
    this.request({
      url: 'classic/latest/',
      success: (res) => {
        // console.log(res);
        sCallback(res);
        this._setLatestIndex(res.index);//将最新一期写入缓存
        let key = this._getkey(res.index);
        wx.setStorageSync(key, res);
      }
    });
  };
  //获取下一个或上一个
  getClassic(index, nextOrPrevious ,sCallback) {
    let key = nextOrPrevious == 'next' ? this._getkey(index + 1) : this._getkey(index - 1); //根据 nextOrPrevious 判断 key
    let classic = wx.getStorageSync(key);//缓存查询
    //缓存查询不到，向服务器发请求。
     if(!classic){
      this.request({
        // url: 'classic/' + index + '/' + nextOrPrevious,
        url: `classic/${index}/${nextOrPrevious}`,//模板字符串不能有空格
        success: (res) => {
          // console.log(res);
          wx.setStorageSync( this._getkey(res.index),res);
          sCallback(res);
        }
      })
    }
    else{
      sCallback(classic);//classic 存在于缓存中。 
    }
  };
  
  //判断是否第一个
  isFirst(index){
    return index ==1 ? true : false;
  }
  //判断是否最后一个
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true :false;
  };

  /*-------------------------------------*/
  //定义缓存 key 的规则 
  _getkey(index){
    let key = 'classic-' + index; 
    return key;
  };
  //最新期刊号写入缓存的私有方法
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index;
  }

};



export {ClassicModel};