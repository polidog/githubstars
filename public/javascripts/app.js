
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

  // 検索用のビュー
  var SerachView = Backbone.View.extend({

    // 対象のID
    el:'#bb_search_view',

    // 設定するイベント
    events: {
      'click .btn':'search'
    },

    // 検索イベント処理
    search: function(e) {
      console.log('search in');
      return false;
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

    // 初期化処理
    initialize: function() {
      this.reset();
    },

    // リセット
    reset: function() {
      this.isLoading = false;
      this.isMax = false;
      this.collection = new StarsCollection();
    },

    // データのロード
    load: function() {
      this.collection.fetch({
        dataType: 'json',
        success: $.proxy(this.render, this)
      });
      return this;
    },

    // コレクションの表示処理
    render: function(collection) {
      var _this = this;
      this.$el.empty();
      collection.each(function(model){
        var view = new StarView({model:model});
        console.log(model.toJSON());
        _this.$el.append(view.render().el);
      });
    }

  });

  var AppView = Backbone.View.extend({

  });

  App = {};
  App.star = new Star();
  App.searchView = new SerachView();
  App.starsCollection = new StarsCollection();
  App.starListView = new StarsListView();
  App.starListView.load();

});

