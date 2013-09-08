Ghstr.Views.Loading = Backbone.View.extend({

  el: '#loading',

  events: {
    'loading': 'test'
  },

  initialize: function() {
    $(window).on('scroll',$.proxy(this.moreLoad,this));
  },

  modal: function() {
    this.$el.toggle();
  },

   // 続きをロードする
   // 参考 http://d.hatena.ne.jp/oovu70/?of=9
  moreLoad: function() {

    if (this.collection.isLoading) return ;

    var triggerPoint = 200;

    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.body.clientHeight;
    var scrollHeight = document.body.scrollHeight || document.docomentElement.scrollHeight;

    clientHeight = window.innerHeight;

    // コンテンツ領域の底までの残り領域
    var remain = scrollHeight - clientHeight - scrollTop;

    // 一番下までスクロールされたら
    if(remain <= 0) {

      this.modal();
      this.collection.pageUp();

      this.collection.fetch({
        dataType:'json',
        success: $.proxy(function(){
          this.modal();
        },this),
        error: $.proxy(function(){
          this.modal();
        },this)
      });
    }
  }

});