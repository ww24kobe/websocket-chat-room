// 连接socket服务器
var socket = io.connect('http://127.0.0.1:4000');
// var socket = io.connect('ws://127.0.0.1:4000');

var message = document.getElementById('message'),
      user = document.getElementById('username'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
    // 发送聊天事件
    socket.emit('chat', {
        message: message.value,
        username: user.value
    });
    message.value = "";
});

message.addEventListener('keyup', function(){
    // 触发键入文字的事件
    socket.emit('typing', user.value);
})

// 监听服务端返来的chat事件
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

// 监听服务器的typing事件
socket.on('typing', function(username){
    console.log('client typing ' + username)
    feedback.innerHTML = '<p>' + username + ' 正在输入...</p>';
});
