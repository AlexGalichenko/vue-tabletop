const uniqid = require('uniqid');
const cloneDeep = require('clone-deep');
const { getObject, getObjectIndex, getZ } = require('./utils.js');
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
      const object = getObject(db, payload.id);
      object.isDragged = false;
      object.updated = Date.now();
      object.x = payload.x;
      object.y = payload.y;
      object.z = getZ(db);
      io.emit('update_object', object);
    });

    socket.on('load_game', payload => {
      db.objects = payload;
      io.emit('initial_load', db);
    });

    socket.on('take_container', payload => {
      const container = getObject(db, payload);

      if (container.objects && container.objects.length > 0) {
        const object = container.infinite 
          ? cloneDeep(container.objects[0])
          : container.objects.pop();
  
        if (container.infinite) {
          object.id = uniqid();
        }
        object.x = container.x + 25;
        object.y = container.y + 25;
        object.z = getZ(db);
        object.owner = '';
        
        db.objects.push(object);
        io.emit('update_object', container);
        io.emit('create_object', object);
      }
    });

    socket.on('put_container', payload => {
      const container = getObject(db, payload.containerId);
      const objectIndex = getObjectIndex(db, payload.objectId);
      const object = db.objects[objectIndex];
      db.objects.splice(objectIndex, 1);
      container.objects.push(object);
      io.emit('update_object', container);
      io.emit('delete_object', object.id);
    });

    socket.on('flip', payload => {
      const object = getObject(db, payload);
      object.isFlipped = !object.isFlipped;
      io.emit('update_object', object);
    });

    socket.on('shuffle', payload => {
      const container = getObject(db, payload);
      container.objects.sort(() => 0.5 - Math.random());
      io.emit('update_object', container);
    });

    socket.on('increase_count', payload => {
      const object = getObject(db, payload);
      object.count++;
      io.emit('update_object', object);
    });

    socket.on('decrease_count', payload => {
      const object = getObject(db, payload);
      object.count--;
      io.emit('update_object', object);
    });

    socket.on('deal', ({objectId, player}) => {
      const object = getObject(db, objectId);
      object.owner = player;
      object.updated = Date.now();
      io.emit('update_object', object);
    });

    socket.on('deal_container', ({objectId, player}) => {
      const container = getObject(db, objectId);
      if (container.objects && container.objects.length > 0) {
        const object = container.infinite 
          ? cloneDeep(container.objects[0])
          : container.objects.pop();
  
        if (container.infinite) {
          object.id = uniqid();
        }
        object.x = container.x + 25;
        object.y = container.y + 25;
        object.z = getZ(db);
        object.owner = player;
        
        db.objects.push(object);
        io.emit('update_object', container);
        io.emit('create_object', object);
      }
    });

    socket.on('play', ({objectId, position}) => {
      const object = getObject(db, objectId);
      object.owner = '';
      object.x = position.x;
      object.y = position.y;
      object.updated = Date.now();
      io.emit('update_object', object);
    });

    socket.on('pin', objectId => {
      const object = getObject(db, objectId);
      object.pinned = !object.pinned;
      io.emit('update_object', object);
    });

    socket.on('delete', objectId => {
      const objectIndex = getObjectIndex(db, objectId);
      db.objects.splice(objectIndex, 1);
      io.emit('delete_object', objectId);
    });

    /**
     * Create deck
     */
    socket.on('create_deck', ({ type, frontUrl, backUrl, rows, columns, height, width, x, y, scale }) => {
      const object = {
        type: 'Container',
        id: uniqid(),
        objects: [],
        frontUrl: backUrl,
        z: getZ(db),
        x,
        y,
        rows,
        columns,
        height,
        width,
        scale,
        infinite: false
      };
      for (let column = 1; column <= columns; column++) {
        for (let row = 1; row <= rows; row++) {
          object.objects.push({
            type: 'Card',
            id: uniqid(),
            x: 0,
            y: 0,
            z: 0,
            row,
            column,
            frontUrl,
            backUrl,
            rows,
            columns,
            height,
            width,
            scale
          })
        }
      }
      db.objects.push(object);
      io.emit('create_object', object);
    });

    /**
     * Create tile
     */
    socket.on('create_tile', ({ type, frontUrl, backUrl, rows, columns, height, width, x, y, scale }) => {
      const object = {
        id: uniqid(),
        z: getZ(db),
        type,
        frontUrl,
        backUrl,
        x,
        y,
        rows,
        columns,
        height,
        width,
        scale
      };
      db.objects.push(object);
      io.emit('create_object', object);
    });

    /**
     * Create container
     */
    socket.on('create_container', ({ type, frontUrl, backUrl, x, y, height, width, scale, infinite }) => {
      const object = {
        id: uniqid(),
        z: getZ(db),
        objects: [],
        type,
        frontUrl,
        backUrl,
        x,
        y,
        height,
        width,
        scale,
        infinite
      };
      db.objects.push(object);
      io.emit('create_object', object);
    });

    /**
     * Create counter
     */
    socket.on('create_counter', ({ type, x, y, scale }) => {
      const object = {
        type,
        id: uniqid(),
        z: getZ(db),
        x,
        y,
        scale,
        count: 0
      };
      db.objects.push(object);
      io.emit('create_object', object);
    });

    /**
     * Create dice
     */
    socket.on('create_dice', ({ type, x, y, scale, edges }) => {
      const object = {
        type,
        id: uniqid(),
        z: getZ(db),
        x,
        y,
        scale,
        edges
      };
      db.objects.push(object);
      io.emit('create_object', object);
    });

  });

});