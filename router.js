var Profile = require("./profile.js");
var renderer = require("./renderer.js");

function home(req, res){
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    renderer.view("header", {}, res);
    renderer.view("search", {}, res);
    renderer.view("footer", {}, res);
  };
};

function user(req, res){
  var username = req.url.replace('/', '');
  if (username.length > 0) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    renderer.view("header", {}, res);

    // get json for profile
    var studentProfile = new Profile(username);
    // on 'end'
    studentProfile.on('end', function(profileJSON){
      // show profile
      // store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript,
      }
      // simple response
      res.write(values.username + ' has ' + values.badges + '\n');
      res.write('Footer\n');
      res.end();
    });

    studentProfile.on('error', function(error){
      // show error
      res.write(error.message + '\n');
      res.end('Footer \n');
    });
  }
}

module.exports.home = home;
module.exports.user = user;
