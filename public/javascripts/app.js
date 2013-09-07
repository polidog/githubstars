"use strict";
Ghstr.App = Backbone.View.extend({
  el: '#app',
  initialize: function() {
    var stars = new Ghstr.Collections.Stars();
    new Ghstr.Views.SearchBox({collection: stars});
    new Ghstr.Views.StarList({collection: stars});
    new Ghstr.Views.Loading({collection: stars});
  }
});
new Ghstr.App();
