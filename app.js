
/**
 * Module dependencies.
 */

var express = require('express')
  ,ejs = require('ejs')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var i = 0,
    COOKIE = "COOKIE";
app.get('/', function(req, res){
    res.render('index', { title: 'Index' });
});
app.get("/set_cookie",  function(req, res){
    var useP3P = req.query.p3p;

    useP3P && res.setHeader("P3P","CP=CAO PSA OUR");

    res.clearCookie(COOKIE);
    res.cookie(COOKIE, ++i, {domain: ".a.com"});
    res.json({});
});

app.get("/get_cookie",  function(req, res){
    var cookie = req.cookies[COOKIE];
    res.jsonp({cookie: cookie});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
