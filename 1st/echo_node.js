var net = require('net'),
    http = require("http"),
    socketio = require("socket.io"),
    fs = require("fs");

var EL = require('echonet-lite');
var objList = ['05ff01'];

// モニタリング画面の用意
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    var output = fs.readFileSync("./echo_node.html", "utf-8");
    res.end(output);
}).listen(8888);
var io = socketio.listen(server);

var elsocket = EL.initialize( objList, function( rinfo, els ) {

    data = els.DETAILs['e0']
    console.dir(els.DETAILs['e0']);
    io.sockets.emit("message", {value:data.toString('ascii')});
})


   
