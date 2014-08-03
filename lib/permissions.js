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

var setupPermissions = function(directory) {
  var data = fs.readFileSync('./' + directory + '/permissions.txt', {encoding: 'UTF-8'});

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
      condition = function(opts) {
        var ruleNumbers = directive.substr(6).split(' AND ').map(function(num) {
          return parseInt(num, 10);
        });
        return _.every(ruleNumbers, function(ruleNumber) {
          var rule = opts.rules[ruleNumber - 1];
          return rule.condition(_.extend(opts, {compoundRule: true}));
        });
      }
    } else {
      condition = function(opts) {
        return false;
      }
    }

    return {
      directive: directive,
      files: files,
      condition: condition
    };
  });
};


module.exports = function(opts) { 
  setupPermissions(opts.directory);
  return _.some(rules, function(rule) {
    return rule.condition(_.extend(opts, {rules: rules}));
  });
};