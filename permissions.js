var fs = require('fs');
var _ = require('underscore');
var moment = require('moment');

var permissions = {};

var rules;

var filenameInList = function(filename, list) {
  return _.some(list, function(fileFromList) {
    return filename === fileFromList;
  });
};

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
    if (directive === 'Open to the public:') {
      condition = function(opts) {
        return filenameInList(opts.filename, this.files);;
      }
    } else if (/With password /.test(directive)) {
      condition = function(opts) {
        var passwordIsCorrect = opts.password === directive.split("With password ")[1].slice(0,-1);
        if (opts.compoundRule) {
          return passwordIsCorrect;
        }
        return passwordIsCorrect && filenameInList(opts.filename, this.files);
      }
    } else if (/From .+ until .+/.test(directive)) {
      condition = function(opts) {
        var fromTime = moment(new Date(directive.substr(5,9)));
        var toTime = moment(new Date(directive.substr(21,25).slice(0,-1)));
        var isWithinTimeRange = moment().isAfter(fromTime) && moment().isBefore(toTime);
        if (opts.compoundRule) {
          return isWithinTimeRange;
        }
        return isWithinTimeRange && filenameInList(opts.filename, this.files);
      }
    } else if (directive.substr(0,5) === "Rules") {
      condition = function(opts, rules) {
        var ruleNumbers = directive.substr(6).split(' AND ').map(function(num) {
          return parseInt(num, 10);
        });
        return _.every(ruleNumbers, function(ruleNumber) {
          var rule = rules[ruleNumber - 1];
          return rule.condition(_.extend(opts, {compoundRule: true}), rules);
        });
      }
    } else {
      condition = function(opts, rules) {
        return false;
      }
    }

    return {
      directive: directive,
      files: files,
      condition: condition
    };
  });
});

module.exports = function(opts) { 
  return _.some(rules, function(rule) {
    // console.log('Testing ' + opts.filename + ' with rule ' + rule.directive + '. Result: ' + rule.condition(opts, rules));
    return rule.condition(opts, rules);
  });
};