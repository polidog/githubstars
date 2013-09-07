Ghstr.Collections.Stars = Backbone.Collection.extend({

  model: Ghstr.Models.Star,

  page: 1,

  isLoading: false,

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

  sync: function(method, model, options) {
    this.isLoading = true;
    Backbone.sync(method, model, options);
  },

  // 戻り値処理
  parse: function(res) {
    this.isLoading = false;
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