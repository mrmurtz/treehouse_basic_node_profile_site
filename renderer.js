var fs = require('fs');

function view(templateName, values, res){
  var fileContents = fs.readFileSync('./views/' + templateName + '.html');
  res.write(fileContents);
}

module.exports.view = view;
