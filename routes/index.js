var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.send('<!doctype html>\n<html lang="en">\n' +  
  '\n<meta charset="utf-8">\n<title>FACE TRACKER RESTFul API</title>\n' + 
  '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
  '\n\n<h1>Welcome to Tracking</h1>\n' + 
  '\n\n');
});

router.get('/api', function(req, res) {
  res.send('<!doctype html>\n<html lang="en">\n' +  
  '\n<meta charset="utf-8">\n<title>FACE TRACKER RESTFul API</title>\n' + 
  '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
  '\n\n<h1>Welcome to Tracking API</h1>\n' + 
  '\n\n');
});
module.exports = router
