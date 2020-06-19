const app = require('http').createServer();
const io = require('socket.io')(app, { serveClient: false });
const db = require('../../db.json');

app.listen(80);

io.on('connection', socket => {

  // dispatch load when user is loaded
  socket.on('socket_connect', username => {
    // emit data load to new user
    socket.emit('initial_load', db);
    // let all know that user are added
    io.emit('new_user', username);

    socket.on('move', payload => {
      const object = db.objects.find(obj => obj.id === payload.id);
      Object.assign(object, payload);
      io.emit('update_object', object);
    });

  });

});