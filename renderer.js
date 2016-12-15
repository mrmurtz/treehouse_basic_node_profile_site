var fs = require('fs');

function mergeValues(values, content){
  // cycle over keys and replave with values
  for (var key in values) {
    content = content.replace("{{" + key + "}}", values[key]);
  }
  return content;
}

function view(templateName, values, res){
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
  fileContents = mergeValues(values, fileContents);
  res.write(fileContents);
}

module.exports.view = view;
