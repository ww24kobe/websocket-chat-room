var express = require('express');
var socket = require('socket.io'); 

var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// 托管静态资源
app.use(express.static('public'));

// 创建socket服务,
var io = socket(server);

// 监听客户端连接的
io.on('connection', (socket) => {
    console.log('connection', socket.id);
    // 监听客户端发生送的聊天事件
    socket.on('chat', function(data){
        console.log('chat',data);
        // 推送chat事件给所有连接者
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(username){
        
        console.log('server typing' + username)
        // io.sockets.emit('typing', username);  // 向所有客户端推送

        // 向所有连接的客户端-发生广播通知
        socket.broadcast.emit('typing', username); // 向所有客户端推送(排除自己)
    });
});
