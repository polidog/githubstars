Ghstr.Views.Loading = Backbone.View.extend({

  events: {
    'loading': 'test'
  },

  test: function() {
    console.log("test");
  },

  initialize: function() {
    $(window).on('scroll',$.proxy(this.moreLoad,this));
  },

   // 続きをロードする
   // 参考 http://d.hatena.ne.jp/oovu70/?of=9
  moreLoad: function() {

    if (this.collection.isLoading) return ;

    var triggerPoint = 200;

    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.body.clientHeight;
    var scrollHeight = document.body.scrollHeight || document.docomentElement.scrollHeight;

    // Firefox・Chrome対応
    // if(scrollHeight === clientHeight) {
      clientHeight = window.innerHeight;
    // }

    // コンテンツ領域の底までの残り領域
    var remain = scrollHeight - clientHeight - scrollTop;
    console.log("scrollTop:" + scrollTop);
    console.log("clientHeight:" + clientHeight);
    console.log("scrollHeight:" + scrollHeight);
    console.log("remain:"+remain);
    // 一番下までスクロールされたら
    if(remain <= 0) {
      this.collection.pageUp();
      this.collection.fetch({
        dataType:'json'
      })
    }
  }

});