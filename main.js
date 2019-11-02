var express = require('express');
var   app     = express();
var request = require('request');
const fs = require("fs");
var    bodyParser = require('body-parser');
var    mongoose   = require('mongoose');
var    os = require('os');
var    hostname = os.hostname(); 
var path = require('path'); 
//var file  = request('https://cslmis.s3-us-west-2.amazonaws.com/cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json').pipe(fs.createWriteStream('cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json'))
    //var cors = require('cors');
var router = express.Router();
var path = __dirname + '/public/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.use("/",router);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(function(req, res, next) { 
res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS"); 
res.header("Access-Control-Allow-Origin", "*"); 
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
next();
 });


var port = process.env.PORT || 8081;


//All artisan routers
//var indexRouter = require('./routes');
//var mailerRouter = require('./routes/mailer');
//var artisanRouter = require('./routes/artisan/Artisan');
/* 
var wordAssessementRouter = require('./routes/wordAssessement/WordAssessement');
var commentReactionRouter = require('./routes/commentReaction/CommentReaction');
var postReactionRouter = require('./routes/postReaction/PostReaction'); */


//app.use(express.static('data',{index:false, extensions:['json']}),jsonRoute);
//app.use('/', indexRouter);  
app.use('/public/assets/', express.static(__dirname + '/public/assets/'));
app.use('/public/assets/css/', express.static(__dirname + '/public/assets/css/'));
app.use('/public/assets/css/assets/', express.static(__dirname + '/public/assets/css/assets/'));
app.use('/public/assets/css/revolution/', express.static(__dirname + '/public/assets/css/revolution/'));
app.use('/public/assets/css/revolution/fonts/revicons/', express.static(__dirname + '/public/assets/css/revolution/fonts/revicons/'));
app.use('/public/assets/images/', express.static(__dirname + '/public/assets/images/'));
app.use('/public/assets/images/contractors/', express.static(__dirname + '/public/assets/images/contractors/'));
app.use('/public/assets/images/gallery/', express.static(__dirname + '/public/assets/images/gallery/'));
app.use('/public/assets/images/resources/', express.static(__dirname + '/public/assets/images/resources/'));
app.use('/public/assets/js/', express.static(__dirname + '/public/assets/js/'));
app.use('/public/assets/js/revolution/', express.static(__dirname + '/public/assets/js/revolution/'));
app.use('/public/assets/js/revolution/extensions/', express.static(__dirname + '/public/assets/js/revolution/extensions/'));
app.use('/public/assets/pdfs/', express.static(__dirname + '/public/assets/pdfs/'));
app.use('/public/assets/webfonts/', express.static(__dirname + '/public/assets/webfonts/'));


/* app.use('/api/commentReaction', commentReactionRouter);
app.use('/api/wordAssessement', wordAssessementRouter);
app.use('/api/postReaction', postReactionRouter); */



router.get("/",function(req,res){
    res.sendFile(path + "index.html");
  });
  router.get("/about-us",function(req,res){
    res.sendFile(path + "about-us.html");
  });
  router.get("/event",function(req,res){
    res.sendFile(path + "event.html");
  });
  router.get("/contractors",function(req,res){
    res.sendFile(path + "contractors.html");
  });
  router.get("/lmis",function(req,res){
    res.sendFile(path + "lmis.html");
  });
  router.get("/gallery",function(req,res){
    res.sendFile(path + "gallery.html");
  });
  router.get("/contact",function(req,res){
    res.sendFile(path + "contact-us1.html");
  });
 
  

app.listen(port,() => {
    console.log(`Server running at port `+port);
    });

console.log('nodejs server running on '+ port);

module.exports = app;
