const uniqid = require('uniqid');
const cloneDeep = require('clone-deep');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { serveClient: false });
const db = require('./db.json');
db.players = new Set();

// heroku port
server.listen(process.env.PORT || 8000);

app.use(express.static('dist'));

io.on('connection', socket => {

  // dispatch load when user is loaded
  socket.on('socket_connect', username => {
    db.players.add(username);
    // emit data load to new user
    socket.emit('initial_load', db);
    // let all know that user are added
    io.emit('new_user', [...db.players]);

    socket.on('move_start', payload => {
      io.emit('move_start', payload);
    });

    socket.on('move_stop', payload => {
      const object = db.objects.find(obj => obj.id === payload.id);
      Object.assign(object, payload);
      object.isDragged = false;
      object.updated = Date.now();
      io.emit('update_object', object);
    });

    socket.on('load_game', payload => {
      db.objects = payload;
      io.emit('initial_load', db);
    });

    socket.on('take_container', payload => {
      const container = db.objects.find(obj => obj.id === payload);

      if (container.objects && container.objects.length > 0) {
        const object = container.infinite 
          ? container.objects[0]
          : container.objects.pop();
  
        if (container.infinite) {
          object.id = uniqid();
        }
        object.x = container.x + 25;
        object.y = container.y + 25;
        object.z = 0;
        object.owner = '';
        
        db.objects.push(object);
        io.emit('update_object', container);
        io.emit('create_object', object);
      }
    });

    socket.on('put_container', payload => {
      const container = db.objects.find(obj => obj.id === payload.containerId);
      const objectIndex = db.objects.findIndex(obj => obj.id === payload.objectId);
      const object = db.objects[objectIndex];
      db.objects.splice(objectIndex, 1);
      container.objects.push(object);
      io.emit('update_object', container);
      io.emit('delete_object', object.id);
    });

    socket.on('flip', payload => {
      const object = db.objects.find(obj => obj.id === payload);
      object.isFlipped = !object.isFlipped;
      io.emit('update_object', object);
    });

    socket.on('shuffle', payload => {
      const container = db.objects.find(obj => obj.id === payload);
      container.objects.sort(() => 0.5 - Math.random());
      io.emit('update_object', container);
    });

    socket.on('increase_count', payload => {
      const object = db.objects.find(obj => obj.id === payload);
      object.count++;
      io.emit('update_object', object);
    });

    socket.on('decrease_count', payload => {
      const object = db.objects.find(obj => obj.id === payload);
      object.count--;
      io.emit('update_object', object);
    });

    socket.on('deal', ({objectId, player}) => {
      const object = db.objects.find(obj => obj.id === objectId);
      object.owner = player;
      object.updated = Date.now();
      io.emit('update_object', object);
    });

    socket.on('play', ({objectId, position}) => {
      const object = db.objects.find(obj => obj.id === objectId);
      object.owner = '';
      object.x = position.x;
      object.y = position.y;
      object.updated = Date.now();
      io.emit('update_object', object);
    });

  });

});