import{config as config} from '../config.js';//import不可使用绝对路径

const tips = {
  1:'Sorry, there is an error~!',
  1005:'appkey invalid!',
  3000: 'periodical is not exist!',
  404: 'I cannot find it.',
  1005: '',
  
}

class HTTP{
  request({url, data = {}, method = "GET"}){
     return new Promise( (resolve,reject)=>{
       this._request(url, resolve, reject, data, method); //异步

     });
  };

  //-----------------

  _request(url, resolve, reject, data={}, method="GET"){
     
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data:data,
      header:{
        'content-type':'application/json',
        // 'appley':appkey
      },
      success:(res)=>{
        const code = res.statusCode.toString();//startswith是字符串方法
        if(code.startsWith('2')){
            resolve(res.data);
        }else{
            reject();
            const error_code = res.data.error_code;//error_code 是从服务器发送回
            this._show_error(code);
        }
      },
      fail:(err)=>{
            reject();
            this._show_error(1);
      }
    });
  };

  /*
  错误码方法， 命名方式私有，
  */ 
  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip ? tip: tips[1],
      icon:'none',
      duration:2500,
    })
  }
}

export {HTTP}