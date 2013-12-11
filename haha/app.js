
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);
app.get('/shell', function(req, res){
	var spawn = require('child_process').spawn,
    ls    = spawn('ls', ['./public/images']);

	ls.stdout.on('data', function (data) {
  		console.log('stdout: ' + data);

  		var imageStrings = (''+data).split("\n");
		res.set('text/html');
  		for(str in imageStrings) 
  		{
  			console.log('haha'+imageStrings[str]);
  			if (imageStrings[str] != '')
  				imageStrings[str] = '<a href= "/images/'+imageStrings[str]+'">'+imageStrings[str]+'</a><br>';
  		}

  		res.end(imageStrings.join(''));
	});

	ls.stderr.on('data', function (data) {
  		console.log('stderr: ' + data);
	});

	ls.on('close', function (code) {
  		console.log('child process exited with code ' + code);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
