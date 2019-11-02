var express = require('express');
var   app     = express();
var request = require('request');
const fs = require("fs");
var    bodyParser = require('body-parser');


var    mongoose   = require('mongoose');
var    os = require('os');
var    hostname = os.hostname(); 
var server = require('http'),
    url = require('url');
var path = require('path');

//var file  = request('https://cslmis.s3-us-west-2.amazonaws.com/cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json').pipe(fs.createWriteStream('cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json'))
    //var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' })); 
app.use(bodyParser.json());


var port = process.env.PORT || 8080;
var ip = process.env.IP || "192.168.1.102"
var localURI = "mongodb://localhost:27017/cybertrackfacedb";
var mongoURL = localURI;

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(mongoURL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var indexRouter = require('./routes');
var faceRouter = require('./routes/Face');


app.use('/public/assets/', express.static(__dirname + '/public/assets/'));
app.use('/public/assets/fileserver', express.static(__dirname + '/public/assets/fileserver'));

app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/htm', express.static(__dirname + '/public/htm'));
app.use('/public/js', express.static(__dirname + '/public/js'));
app.use('/rtc', express.static(__dirname + '/rtc'));
app.use('/tracking/data', express.static(__dirname + '/tracking/data'));
app.use('/tracking', express.static(__dirname + '/tracking'));

app.use('/video', function(req, res) {
    res.sendFile(path.resolve(`${__dirname}/public/htm/video.html`));
  });
app.use('/camera', function(req, res) {
    res.sendFile(path.resolve(`${__dirname}/public/htm/camera.html`));
  });
  app.use('/face', function(req, res) {
    res.sendFile(path.resolve(`${__dirname}/public/htm/faces.html`));
  });
  app.use('/record', function(req, res) {
    res.sendFile(path.resolve(`${__dirname}/public/htm/recorder.html`));
  });
  app.use('/media', function(req, res) {
    res.sendFile(path.resolve(`${__dirname}/public/htm/media.html`));
  });

app.use('/api/face', faceRouter); 
app.use('/', indexRouter); 

//app.listen(port,ip, function() {
  //  console.log(`Server running at port `+port);
//});
app.listen(port,() => {
 console.log(`Server running at port `+port);
 });

console.log('nodejs server running on '+ port);

module.exports = app;
