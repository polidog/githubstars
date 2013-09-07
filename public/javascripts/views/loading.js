Ghstr.Views.Loading = Backbone.View.extend({
  initialize: function() {

  },

   // 続きをロードする
  moreLoad: function() {
    if (this.collection.isLoading) return ;

    var triggerPoint = 100;

    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.body.clientHeight;
    var scrollHeight = document.body.scrollHeight || document.docomentElement.scrollHeight;

    // Firefox・Chrome対応
    if(scrollHeight === clientHeight) {
      clientHeight = window.innerHeight;
    }

    // コンテンツ領域の底までの残り領域
    var remain = scrollHeight - clientHeight - scrollTop;

    // 一番下までスクロールされたら
    if(remain <= 0) {
      this.collection.page += 1;
      console.log("moreLoading")
      this.trgger("isLoading");
    }
  }

});