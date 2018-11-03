import{config as config} from '../config.js';//import不可使用绝对路径

const tips = {
  1:'Sorry, there is an error~!',
  1005:'appkey invalid!',
  3000: 'periodical is not exist!',
  404: 'I cannot find it.',
  1005: '',
  
}

class HTTP{

  /**
   * param: url,data, method
   */
  request(params){
     
     if(!params.method){
       params.method = "GET";
     }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appley':params.appkey
      },
      success:(res)=>{
        // startsWith endsWith //判断字符串
        //console.log(typeof(res.statusCode));// 是个number
        let code = res.statusCode.toString();//startswith是字符串方法
        if(code.startsWith('2')){
            params.success && params.success(res.data);
        }else{
            let error_code = res.data.error_code;//error_code 是从服务器发送回
            this._show_error(code);
        }
      },
      fail:(err)=>{
            //todo
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
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2500,
    })
  }
}

export {HTTP}