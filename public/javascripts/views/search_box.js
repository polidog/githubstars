Ghstr.Views.SearchBox = Backbone.View.extend({
  el: '#bb_search_view',

  // 設定するイベント
  events: {
    'click .btn':'search',
    'keypress input[type=text]':'search'
  },

  initialize: function(options) {},

  search: function(event) {
    if (typeof(event.keyCode) !== 'undefined') {
      if (event.keyCode != 13) return;
    }
    this.collection.setQuery('user',this.$el.find('input[type=text]').val());
    this.collection.fetch({
      dataType: 'json',
      reset: true
    });
  }
});