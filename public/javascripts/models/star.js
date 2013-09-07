Ghstr.Models.Star =  Backbone.Model.extend({
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