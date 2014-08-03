var express = require('express');
var fs = require('fs');
var _ = require('underscore');

var app = express();
var testPermission = require('./lib/permissions');

app.get('/:directory/:filename', function(req, res){

  fs.readFile(req.params.directory + '/' + req.params.filename, function(err, data) {
    var opts;
    if (err) {
      res.send(404, 'Not found.');
      return;
    }

    opts = {
      directory: req.params.directory,
      filename: req.params.filename,
      password: req.query.password
    };

    if (testPermission(opts)) {
      res.sendfile('./' + req.params.directory + '/' + req.params.filename);
    } else {
      res.status(403).send('Sorry! you cant see that.');
    }
  });
});

app.listen(3000, function(err, result) {
	console.log('listening on 3000');
});