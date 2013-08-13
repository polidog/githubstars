
$(function(){
  // github star model
  var Star = Backbone.Model.extend({
    defaults: function() {
      return  {
        id: null,
        type: null,
        org: {},
        actor: {
          id: null,
          login: null,
          gravatar_id: null,
          url: null,
          avatar_url: null
        },
        repo: {
          id: null,
          name: null,
          url: null
        },
        payload: {
          action: 'started'
        },
        'public': true,
        created_at: null
      }
    }

  });

  // github star collection
  var StarsCollection = Backbone.Collection.extend({
    // modelの指定
    model: Star,

    // 現在のページ情報
    page: 1,

    // 検索対象のユーザー
    user: null,

    // url設定
    url: function() {
      return '/stars.json?page='+this.page+'&user='+this.user;
    },

    // 戻り値処理
    parse: function(res) {
      return res.stars;
    }

  });

  // ローディング用のビュー
  var LoadingView = Backbone.View.extend({
    el: 'bb_loading_view',

    template: _.template($('#loading-template').html()),

    render: function() {
      this.$el.html(this.template({}));
      return this;
    },

    removeRender: function() {
      this.$el.html("");
      return this;
    }

  });

  // 検索用のビュー
  var SerachView = Backbone.View.extend({

    // 対象のID
    el:'#bb_search_view',

    // 設定するイベント
    events: {
      'click .btn':'search',
      'keypress input[type=text]':'searchEnter'
    },

    // starsListView object
    starsListView: null,

    initialize: function(options) {
      this.starsListView = options.starsListView;
    },

    // 検索イベント処理
    search: function(e) {
      this.starsListView.reset();
      this.starsListView.collection.user = $(e.delegateTarget).find("input").val();
      if (this.starsListView.collection.user !== "") {
        this.starsListView.load(null,true);
      }

      return false;
    },

    // エンター押された場合の挙動
    searchEnter: function(e) {
      if (e.keyCode != 13) return;
      this.search(e);
    }
  });

  // 各スターごとのビュー
  var StarView = Backbone.View.extend({
    // タグ名の指定
    tagName: 'li',

    className: 'span6',

    // モデル
    model: Star,

    // 使用するテンプレート
    template: _.template($('#star-template').html()),

    // 設定するイベント
    events: {},

    // 初期化
    initialize: function(options) {
      this.model = options.model;
    },

    // 表示処理
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  // スター一覧
  var StarsListView = Backbone.View.extend({
    // 対象の要素
    el: '#bb_list_view',

    // 使用するコレクション
    collection: StarsCollection,

    // ロード中かどうかのフラグ
    isLoading: false,

    // 全てのページ読み込んだかのフラグ
    isMax: false,

    loadingView: null,

    // 初期化処理
    initialize: function() {
      this.reset();
      $(window).on('scroll',$.proxy(this.moreLoad,this));
      this.on('loadStart',this.loadStart);
      this.on('loadEnd',this.loadEnd);
    },

    // リセット
    reset: function() {
      this.isLoading = false;
      this.isMax = false;
      this.collection = new StarsCollection();
      this.$el.html("");
    },

    // データのロード
    load: function(callback, remove) {
      if (remove === undefined) remove = false;
      this.trigger('loadStart');

      this.collection.fetch({
        dataType: 'json',
        remove: remove,
        success: $.proxy(this.render, this)
      });

      return this;
    },

    // 続きをロードする
    moreLoad: function() {
      if (this.isLoading) return ;

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
        this.load();
      }
    },

    // コレクションの表示処理
    render: function(collection) {
      var _this = this;
      this.$el.empty();
      collection.each(function(model){
        console.log(model.toJSON());
        var view = new StarView({model:model});
        _this.$el.append(view.render().el);
      });
      this.trigger('loadEnd');
    },

    loadStart: function() {
      this.isLoading = true;
      this.loadingView = new LoadingView();
      this.loadingView.render();
    },

    loadEnd: function() {
      this.isLoading = false;
      this.loadingView.removeRender();
    }

  });


  App = {};
  App.star = new Star();
  App.starsCollection = new StarsCollection();
  App.starsListView = new StarsListView();
  App.searchView = new SerachView(App);

});

