var Profile = require("./profile.js");
var renderer = require("./renderer.js");

function home(req, res){
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    renderer.view("header", {}, res);
    renderer.view("search", {}, res);
    renderer.view("footer", {}, res);
    res.end();
  };
};

function user(req, res){
  var username = req.url.replace('/', '');
  if (username.length > 0) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
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
