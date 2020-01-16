var ws = require('socket.io').listen(5000);
var mysql = require('mysql');

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
 
    socket.on('new chat', function(data){
       
        chats.push(data)
        ws.sockets.emit('new chat', data)
        console.log(data.chat);
        conn.query('INSERT INTO chats (chat) VALUES (?)', data.chat)
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