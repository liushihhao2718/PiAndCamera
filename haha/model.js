var spawn = require('child_process').spawn,
    imageStrings=[], videoStrings=[];

var check = function(str) {
  str.push( "<br><a href='/check.log' target='down'><button>intruding log</button></a>");
};

exports.images = function(req, res) {
  var ls = spawn('ls', ['-t','./public/images']);

	ls.stdout.on('data', function (data) {
  		console.log('stdout: ' + data);

  		imageStrings = (''+data).split("\n");
		res.set('text/html');
  		for(str in imageStrings) 
  		{
  			console.log('haha'+imageStrings[str]);
  			if (imageStrings[str] != '')
  				imageStrings[str] = '<a href= "/images/'+imageStrings[str]+'" target="down">'+imageStrings[str]+'</a><br>';
  		}
    videoDownload(function(){
      check(imageStrings);
    res.render('up', { images: imageStrings.join('') ,videos:videoStrings.join('')});
    });
    
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
    var raspistill = spawn('raspistill', ['-o', str.toString(), '-q', req.query.quantity, '-t',1,'-w','600','-h','600']);
    raspistill.stdout.on('data', function(data){
      console.log(data);
    });
    raspistill.on('close', function(code) {
    	res.redirect( '/images' );
    });
    raspistill.stderr.on('data', function (data) {
       console.log('err '+data);
    });
};

exports.takeVideo = function(req, res){
    //raspivid -t 5(ms) -o ./public/videos/name.h264
    var d = new Date().getTime();
  var str = './public/videos/video-'+ d;
console.log(str.toString());
    var raspistill = spawn('raspivid', ['-t', req.query.sec*1000, '-o', str+'.h264']);
    raspistill.stdout.on('data', 
      function(data){ console.log(data); });
    raspistill.on('close', function(code) {
	console.log('video close');
         var ffmpeg = spawn('ffmpeg', ['-i', str+'.h264', '-vcodec', 'copy', str+'.mp4']);
         ffmpeg.stdout.on('data', function(data){
           console.log(data);
          });
         ffmpeg.on('close', function(data){
            console.log('fuck you self!!!!!!!!\n');
		res.redirect( '/images' );
          });
          ffmpeg.stderr.on('data', function(data) {
            console.log(data);
          });
    });
    raspistill.stderr.on('data', function (data) {
       console.log('err '+data);
    });
};

function videoDownload(callback) {
  var ls = spawn('ls', ['-t','./public/videos']);

  ls.stdout.on('data', function (data) {
      console.log('video: ' + data);

      videoStrings = (''+data).split("\n");
      for(str in videoStrings) 
      {
        console.log('haha'+videoStrings[str]);
        if (videoStrings[str] != '')
          videoStrings[str] = '<a href= "/video/'+videoStrings[str]+'">'+videoStrings[str]+'</a><br>';
      }
      console.log('video a'+videoStrings);
      callback();
  });

  ls.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
  });

  ls.on('close', function (code) {
      console.log('child process exited with code ' + code);
  });
};

exports.download = function(req, res) {
  console.log(req.params);
  res.download('./public/videos/'+req.params.file);
};
