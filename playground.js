var fs = require('fs');

var VimLParser = require('./vimlparser.js');
var Reporter = require('./reporter/reporter.js');
var getEnabledPolicies = require('./config.js').getEnabledPolicies;
var SeverityLevel = require('./level.js').SeverityLevel;
var lint = require('./lint.js').lint;

var filepath = '/Users/OrgaChem/.vimrc';

parseFile(filepath, function(err, ast) {
  if (err) throw err;

  var env = { path: filepath };
  var policies = getEnabledPolicies(SeverityLevel.REFACTOR);

  var violations = lint(policies, ast, env);
  report(violations);
});

function parseFile(file, callback) {
  fs.readFile(file, 'utf-8', function(err, content) {
    if (err) throw err;

    var lines = content.split(/\r\n|\r|\n/);
    var parser = new VimLParser.VimLParser();
    var stringReader = new VimLParser.StringReader(lines);
    var ast = parser.parse(stringReader);
    callback(err, ast);
  });
}

function report(violations) {
  var reporter = new Reporter();
  console.log(reporter.formatAll(violations));
}
