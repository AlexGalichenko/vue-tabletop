const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { serveClient: false });
const db = require('./db.json');

// heroku port
server.listen(process.env.PORT || 8000);

app.use(express.static('dist'));

io.on('connection', socket => {

  // dispatch load when user is loaded
  socket.on('socket_connect', username => {
    // emit data load to new user
    socket.emit('initial_load', db);
    // let all know that user are added
    io.emit('new_user', username);

    socket.on('move_start', payload => {
      const object = db.objects.find(obj => obj.id === payload);
      object.isDragged = true;
      io.emit('update_object', object);
    });

    socket.on('move_stop', payload => {
      const object = db.objects.find(obj => obj.id === payload.id);
      Object.assign(object, payload);
      object.isDragged = false;
      io.emit('update_object', object);
    });

    socket.on('load_game', payload => {
      db.objects = payload;
      io.emit('initial_load', db);
    });

  });

});