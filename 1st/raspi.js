var EL    = require('echonet-lite');
var serialPort = require("serialport")
var exec = require('child_process').exec;
var sp = new serialPort.SerialPort("/dev/ttyAMA0", {
    baudrate: 38400,
    parser:serialPort.parsers.readline("\n")
});

var objList = ['05ff02'];


var elsocket = EL.initialize( objList, function( rinfo, els ) {
});

setInterval(function() {
   
    if (level >= 330){
        sound = 'mpg321 /home/pi/node/sound/100.mp3 ';
    }else if (level >= 315){
        sound = 'mpg321 /home/pi/node/sound/90.mp3 ';
    }else if (level >= 300){
        sound = 'mpg321 /home/pi/node/sound/80.mp3 ';
    }else if (level >= 285){
        sound = 'mpg321 /home/pi/node/sound/70.mp3 ';
    }else if (level >= 270){
        sound = 'mpg321 /home/pi/node/sound/60.mp3 ';
    }else if (level >= 255){
        sound = 'mpg321 /home/pi/node/sound/50.mp3 ';
    }else if (level >= 240){
        sound = 'mpg321 /home/pi/node/sound/40.mp3 ';
    }else if (level >= 225){
        sound = 'mpg321 /home/pi/node/sound/jp_Level_is_low._You_need_buy_it..mp3';
    }else if (level >= 210){
        sound = 'mpg321 /home/pi/node/sound/20.mp3 ';
    }else if (level < 200){
        sound = 'mpg321 /home/pi/node/sound/10.mp3 ';
    }

    exec(sound , function(err, stdout, stderr){
        console.log(stdout)
    });

}, 5000);


sp.on('data', function(data) {
    data = data.slice(1);
    console.log('serial_data:' + data);
   send_data = (((data-180)/1.5)*254/100);
    if(send_data < 0){
        send_data = 0
    }else if(send_data >254){
        send_data = 254
    }
    
    send = send_data.toString(16)
    send = send.slice(0,2)
    send = send.replace( /\./g ,'');
    send = ("00"+send).substr(-2); 
    console.dir("send_data;" + send);
    EL.sendOPC1( '150.65.205.100', "05ff02", "05ff01","61", "e0", send);
    level = data
});
