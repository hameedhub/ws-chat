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
 
    socket.on('Start of chat here', function(data){
       
        chats.push(data)
        ws.sockets.emit('new chat', data)
        conn.query('INSERT INT0 chats (chat) VALUES (?)', data.chat)
    })
    
    if (! isInitChat) {
        conn.query('SELECT * FROM chats')
            .on('result', function(data){
                conn.push(data)
            })
            .on('end', function(){
                socket.emit('initial chat', chats)
            })
        isInitChat = true
    } else {
        socket.emit('initial chat', chats)
    }
})