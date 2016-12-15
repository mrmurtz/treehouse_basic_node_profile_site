var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeaders   = {'Content-Type':'text/html'};

function home(req, res){
  if (req.url === '/') {
    if (req.method.toLowerCase() === "get") {
      res.writeHead(200, commonHeaders);
      renderer.view("header", {}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
    } else {
      req.on('data', function(postBody){
        var query = querystring.parse(postBody.toString());
        res.writeHead(303, {"location": "/"+ query.username});
        res.end()
      });
    }
  };
};

function user(req, res){
  var username = req.url.replace('/', '');
  if (username.length > 0) {
    res.writeHead(200, commonHeaders);
    renderer.view("header", {}, res);

    var studentProfile = new Profile(username);
    studentProfile.on('end', function(profileJSON){

      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript,
      }
      renderer.view("profile", values, res);
      renderer.view("footer", {}, res);
      res.end();
    });

    studentProfile.on("error", function(error){
      renderer.view("error", {errorMessage: error.message}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
