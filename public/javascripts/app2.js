$(function(){

  // スター情報のモデル
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

  // コレクション
  var StarList = Backbone.Collection.extend({

    model: Star,

    page: 1,

    user: null,

    query: {
      page: 1,
      user: null,
    },

    // url設定
    url: function() {
      var query = [];
      _.each(this.query,function(value,key){
        if (value !== null) {
           query.push(t = key + '=' + encodeURIComponent(value));
        }
      });
      console.log('/stars.json?' + query.join('&'));
      return '/stars.json?' + query.join('&');
    },

    // 戻り値処理
    parse: function(res) {
      if (typeof(res.stars) !== undefined) {
        return res.stars;
      }
      return [];
    },

    setQuery: function(key,value) {
      this.query[key] = value;
    },

    // 検索パラメータリセット
    clearQuery: function() {
      this.query = {
        page: 1,
        user: null,
      };
    }
  });
  var starList = new StarList();

  var SearchBoxView = Backbone.View.extend({
    el: '#bb_search_view',

    collection: StarList,

    // 設定するイベント
    events: {
      'click .btn':'search',
      'keypress input[type=text]':'search'
    },

    initialize: function(options) {

    },

    search: function(event) {
      if (typeof(event.keyCode) !== 'undefined') {
        if (event.keyCode != 13) return;
      }
      this.collection.setQuery('user','polidog');
      this.collection.fetch({
        dataType: 'json',
        reset: true
      });
    }
  });

  var StarView = Backbone.View.extend({
    // タグ名の指定
    tagName: 'li',

    className: 'span5',

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

  var StarListView = Backbone.View.extend({
     // 対象の要素
    el: '#bb_list_view',

    // 使用するコレクション
    collection: StarList,

    // 初期化処理
    initialize: function() {
      this.listenTo(this.collection,'reset', this.onResetRender);
    },

    render: function(model) {
      var view = new StarView({model:model});
      this.$el.append(view.render().el);
    },

    onResetRender: function(collection) {
      this.$el.find('li').remove();
      collection.each($.proxy(this.render,this));
    }
  });



  var searchBoxView = new SearchBoxView({collection: starList});
  var starListView = new StarListView({collection: starList});
});