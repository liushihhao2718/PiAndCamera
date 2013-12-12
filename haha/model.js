var spawn = require('child_process').spawn

var check = function(str) {
  str.push( "<br><a href='/check.log' target='down'><button>intruding log</button></a>");
};

exports.images = function(req, res){
    var ls = spawn('ls', ['-t','./public/images']);

	ls.stdout.on('data', function (data) {
  		console.log('stdout: ' + data);

  		var imageStrings = (''+data).split("\n");
		res.set('text/html');
  		for(str in imageStrings) 
  		{
  			console.log('haha'+imageStrings[str]);
  			if (imageStrings[str] != '')
  				imageStrings[str] = '<a href= "/images/'+imageStrings[str]+'" target="down">'+imageStrings[str]+'</a><br>';
  		}
    check(imageStrings);
  	res.render('up', { images: imageStrings.join('') });
	});

	ls.stderr.on('data', function (data) {
  		console.log('stderr: ' + data);
	});

	ls.on('close', function (code) {
  		console.log('child process exited with code ' + code);
	});
};

exports.takePhoto = function(req, res){
    //raspistill -o ./public/images/image.jpg -q 5

    var str = './public/images/image-'+ new Date().getTime() +'.jpg';
    console.log(str + req.query.quantity);
    var raspistill = spawn('raspistill', ['-o', str.toString(), '-q', req.query.quantity], '-t',1,'-w','600','-h','600');
    raspistill.stdout.on('data', function(data){
      console.log(data);
res.end('1');
      // res.redirect('images');
    });
    raspistill.on('close', function(code) {
    
	 res.redirect( '/images' );
    });
    raspistill.stderr.on('data', function (data) {
res.end('3');     
 console.log('err '+data);
    });
};
