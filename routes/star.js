var GitHubApi = require("github");
var memcache = require('memcache');

// github apiの設定
var github = new GitHubApi({
   version: "3.0.0",
   timeout: 5000
});


exports.index = function(req, res){

  if (req.query === undefined || req.query.user === undefined) {
    res.json(500,{ status:false, message: "no user data" });
  }

  if (req.query.page === undefined) req.query.page = 1;

  github.events.getFromUserPublic({'user':req.query.user,'page': req.query.page},function(err,json){

    var message = 'data not found';
    var stars = [];
    if (err) {
      message = JSON.parse(err.message);
      res.json(500,{ status:false, message: message.message});
    }
   
    if (req.query.page === 1) message = "user not found";

    if (json === undefined) {
      res.json(500,{ status:false, message: message});
      return false;
    }
      
    if (json.forEach === undefined) {
      res.json(500,{ status:false,  message: message});
      return false;
    }
    json.forEach(function(item){
      if (item.type === "WatchEvent" && item.payload.action === "started") {
        stars.push(item);
      }
    });
    if (stars.length > 1) {
      res.json(200,{ status:true, stars: stars });
    } else {
      res.json(500,{ status:false, message: 'data not found' });
    }
  });
};