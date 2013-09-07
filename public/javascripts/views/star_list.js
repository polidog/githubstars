Ghstr.Views.StarList = Backbone.View.extend({
     // 対象の要素
    el: '#bb_list_view',

    // 初期化処理
    initialize: function() {
      this.listenTo(this.collection,'reset', this.onResetRender);
    },

    render: function(model) {
      var view = new Ghstr.Views.Star({model:model});
      this.$el.append(view.render().el);
    },

    onResetRender: function(collection) {
      this.$el.find('li').remove();
      collection.each($.proxy(this.render,this));
    }
});