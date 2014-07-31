var fs = require('fs');
var _ = require('underscore');
var permissions = {};

var rules;

fs.readFile('./permissions.txt', {encoding: 'UTF-8'}, function(err, data) {
  if (err) {
    console.log('Error opening permissions file', err);
    return;
  }

  rules = data.split(/\d\.\s/).slice(1).map(function(rule) {
    var directive = rule.split(/\n/)[0];
    var files = _.compact(rule.split(/\n/).slice(1)).map(function(filename) {
      return filename.split('- ')[1];
    });
    var condition;

    if (directive === 'Open to the public' || true) {
      condition = function() {
        return true;
      }
    }

    return {
      directive: directive,
      files: files,
      condition: condition
    };
  });
});

module.exports = function(filename) {
  return _.some(rules, function(rule) {
    return rule.condition(filename);
  });
};