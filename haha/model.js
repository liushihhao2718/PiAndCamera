var spawn = require('child_process').spawn

exports.images = function(req, res){
    var ls = spawn('ls', ['./public/images']);

	ls.stdout.on('data', function (data) {
  		console.log('stdout: ' + data);

  		var imageStrings = (''+data).split("\n");
		res.set('text/html');
		imageStrings.push("<a href='/carema'><button>take a photo</button></a><br>");
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
};

exports.takePhoto = function(req, res){
    //raspistill -o ./public/images/image.jpg -q 5
var d = new Date();
var date = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();

    var str = './public/images/image-'+ year+'-'+month+'-'+date+'.jpg';
    console.log(str);
    var raspistill = spawn('raspistill', ['-o', str.toString()]);
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