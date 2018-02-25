var express = require('express');
var socket = require('socket.io');

//Set APP
var app = express();

//Static Files
app.use(express.static('public'));

var server = app.listen(process.env.PORT || 4000, function(){
  console.log('Listening to requests on port 4000');
});

// Socket IO Set Up
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data)
  })
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  })
})