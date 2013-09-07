Ghstr.Views.Star =　Backbone.View.extend({
  // タグ名の指定
  tagName: 'li',

  className: 'span5',

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