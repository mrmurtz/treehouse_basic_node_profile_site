// Problem: simple way to look at users badge count and js points
// Solution: Use node.js to perform profile lookups and serve our template via http

var router = require('./router.js')
var http = require('http');

var hostname = '127.0.0.1';
var port = process.env.PORT || 3000;

  http.createServer(function(req, res){
    router.home(req, res);
    router.user(req, res);
  }).listen(3000);
  console.log('Listening on ' + hostname + ":" + port + "/");

// 4. Function the handles reading of files and merge in values
  // read from files
  // merge
