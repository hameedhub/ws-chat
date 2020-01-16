var socketio = require('socket.io');
var SocketIOFileUpload = require("socketio-file-upload");
var express = require('express');
var mysql = require('mysql');

var app = express()
    .use(SocketIOFileUpload.router)
    .use(express.static(__dirname))
    .listen(5000);
var ws = socketio.listen(app);

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chat-db'
  });

conn.connect();

var chats = [];
var isInitChat = false;
var socketCount = 0;

ws.sockets.on('connection', function(socket){

    socketCount++
    ws.sockets.emit('socket count', socketCount)
 
    socket.on('disconnect', function() {
        socketCount--
        ws.sockets.emit('socket count', socketCount)
    })

    var uploader = new SocketIOFileUpload();
    uploader.dir = __dirname + '/uploads';

    uploader.listen(socket);

    uploader.on('saved', function(event){
        console.log(event.file);
    });

    uploader.on('error', function(event){
        console.log("Error from uploader", event);
    })
 
    socket.on('new chat', function(data){
       
        chats.push(data)
        ws.sockets.emit('new chat', data)
        console.log(data);
        conn.query('INSERT INTO chats (chat, image) VALUES (?, ?)', [data.chat, data.image]);
    })
    
    if (! isInitChat) {
        conn.query('SELECT * FROM chats')
            .on('result', function(data){
                chats.push(data)
            })
            .on('end', function(){
                socket.emit('initial chat', chats)
            })
        isInitChat = true
    } else {
        socket.emit('initial chat', chats)
    }
})