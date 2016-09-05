var net = require('net'),
    http = require("http"),
    socketio = require("socket.io"),
    fs = require("fs");

// モニタリング画面の用意
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    var output = fs.readFileSync("./index.html", "utf-8");
    res.end(output);

    exec('python3  /home/kakeru/node/weather.py', function(err, stdout, stderr){
	console.log(stdout)
	out = stdout
    });
    
}).listen(8888);
var io = socketio.listen(server);

// 物理ボタンからのデータ受け口
var server = net.createServer(function(conn){
  conn.on('data', function(data){
    console.log(data.toString('ascii'));
    // モニタリング画面へデータ送信
      io.sockets.emit("message", {value:data.toString('ascii')});

      
  });
}).listen(20000);
