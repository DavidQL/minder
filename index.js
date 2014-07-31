var express = require('express');
var fs = require('fs');
var _ = require('underscore');

var app = express();
var testPermission = require('./permissions');

app.get('/:filename', function(req, res){

  fs.readFile(req.params.filename, function(err, data) {
    if (err) {
      res.send(404, 'Not found.');
      return;
    }

    if (testPermission(req.params.filename)) {
      res.sendfile('./' + req.params.filename);
    } else {
      res.send(403, 'Sorry! you cant see that.');
    }
  });


});

app.listen(3000, function(err, result) {
	console.log('listening on 3000');
});