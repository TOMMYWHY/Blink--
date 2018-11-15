import{
  HTTP
}from '../util/http-p.js';


class BookModel extends HTTP{
  //获取所有图书
  getHotList(){
    //  return '1';
    return this.request({
      url: 'book/hot_list',
    });
   };

//获取当前用户喜欢书籍数量
  getMyBookCount(){
     return this.request({
       url: 'book/favor/count'
     });
  }

//获取单个书籍信息
  getDetail(bid){
    return this.request({
      url: `book/${bid}/detail`,
    });
  }

//获取单个书籍点赞情况
  getLikeStatus(bid){
    return this.request({
      url: `book/${bid}/favor`,
    });
  }

  //获取单个书籍短评
  getComments(bid){
    return this.request({
      url:`book/${bid}/short_comment`,
    });
  }

//提交单个书籍短评
  postComments(bid, comment) {
    return this.request({
      url: `book/add/short_comment`,
      method:'POST',
      data:{
        book_id:bid,
        content:comment
      }
    });
  }

  //search
  search(start,q){
    return this.request({
      url:'book/search',
      data:{
        q:q,
        start:start
      }
    })
  };

 
}

export { BookModel};

 