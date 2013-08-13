var GitHubApi = require("github");

// github apiの設定
var github = new GitHubApi({
   version: "3.0.0",
   timeout: 5000
});


exports.index = function(req, res){
  github.events.getFromUserPublic({'user':'polidog'},function(err,json){
    var stars = [];
    json.forEach(function(item){
      if (item.type === "WatchEvent" && item.payload.action === "started") {
        stars.push(item);
      }
    });

    res.json(200,{ status:true, stars: stars });

  });
};