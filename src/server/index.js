const uniqid = require('uniqid');
const compression = require('compression');
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

app.use(compression());
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

    socket.on('load_game', ({ game, boards }) => {
      db.objects = game;
      db.boards = boards;
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
        object.isDragged = false;
        object.isFlipped = false;
        object.pinned = false;
        object.board = container.board;

        db.objects.push(object);
        io.emit('update_object', container);
        io.emit('create_object', object);
      }
    });

    socket.on('take_container_by_id', ({containerId, index}) => {
      const container = getObject(db, containerId);

      if (container.objects && container.objects.length > 0) {
        const object = cloneDeep(container.objects[index])
        if (container.infinite) {
          object.id = uniqid();
        } else {
          container.objects.splice(index, 1);
        }
        object.x = container.x + 25;
        object.y = container.y + 25;
        object.z = getZ(db);
        object.owner = '';
        object.isDragged = false;
        object.isFlipped = false;
        object.pinned = false;
        object.board = container.board;

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
      object.x = 25;
      object.y = 25;
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
        object.owner = player;
        object.updated = Date.now();
        object.isDragged = false;
        object.x = 25;
        object.y = 25;
        object.z = getZ(db);

        db.objects.push(object);
        io.emit('update_object', container);
        io.emit('create_object', object);
      }
    });

    socket.on('deal_container_by_id', ({containerId, index, player}) => {
      const container = getObject(db, containerId);
      if (container.objects && container.objects.length > 0) {
        const object = cloneDeep(container.objects[index])
        if (container.infinite) {
          object.id = uniqid();
        } else {
          container.objects.splice(index, 1);
        }
        object.owner = player;
        object.updated = Date.now();
        object.x = 25;
        object.y = 25;
        object.z = getZ(db);

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
      object.z = getZ(db);
      object.isDragged = false;
      object.pinned = false;
      object.updated = Date.now();
      object.board = '';
      io.emit('update_object', object);
    });

    socket.on('pin', objectId => {
      const object = getObject(db, objectId);
      object.pinned = !object.pinned;
      io.emit('update_object', object);
    });

    socket.on('roll', objectId => {
      const object = getObject(db, objectId);
      object.value = object.values[Math.round(Math.random() * object.values.length)];
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
        rotation: 0,
        board: '',
        x,
        y,
        rows,
        columns,
        height,
        width,
        scale,
        infinite: false
      };
      object.isDragged = false;
      object.isFlipped = false;

      for (let column = 1; column <= columns; column++) {
        for (let row = 1; row <= rows; row++) {
          object.objects.push({
            type: 'Card',
            id: uniqid(),
            x: 0,
            y: 0,
            z: 0,
            rotation: 0,
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
    socket.on('create_tile', payload => {
      const object = {
        ...payload,
        id: uniqid(),
        z: getZ(db),
        rotation: 0,
        board: '',
      };
      object.isDragged = false;
      object.isFlipped = false;
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
        rotation: 0,
        board: '',
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
      object.isDragged = false;
      object.isFlipped = false;
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
        rotation: 0,
        count: 0,
        board: '',
        x,
        y,
        scale,
      };
      object.isDragged = false;
      object.isFlipped = false;
      db.objects.push(object);
      io.emit('create_object', object);
    });

    /**
     * Create dice
     */
    socket.on('create_dice', ({ type, x, y, scale, values, color }) => {
      const vals = values.split(/\s*,\s*/);
      const object = {
        type,
        id: uniqid(),
        z: getZ(db),
        rotation: 0,
        value: vals[0],
        values: vals,
        board: '',
        x,
        y,
        scale,
        color
      };
      object.isDragged = false;
      object.isFlipped = false;
      db.objects.push(object);
      io.emit('create_object', object);
    });

    /**
     * Create chip
     */
    socket.on('create_chip', ({ type, x, y, height, width, scale, color }) => {
      const object = {
        type,
        id: uniqid(),
        z: getZ(db),
        rotation: 0,
        board: '',
        x,
        y,
        height,
        width,
        scale,
        color
      };
      object.isDragged = false;
      db.objects.push(object);
      io.emit('create_object', object);
    });

    socket.on('rotate_left', payload => {
      const object = getObject(db, payload);
      if (object.rotation - 15 === -360) {
        object.rotation = 0;
      } else {
        object.rotation -= 15;
      }
      io.emit('update_object', object);
    });

    socket.on('rotate_right', payload => {
      const object = getObject(db, payload);
      if (object.rotation + 15 === 360) {
        object.rotation = 0;
      } else {
        object.rotation += 15;
      }
      io.emit('update_object', object);
    });

    socket.on('copy', (objectId) => {
      const originalObject = getObject(db, objectId);
      const object = cloneDeep(originalObject);
      object.id = uniqid();
      object.owner = '';
      object.x = originalObject.x + 25;
      object.y = originalObject.y + 25;
      object.z = getZ(db);
      object.isDragged = false;
      object.updated = Date.now();
      if (object.objects && object.objects.length > 0) {
        object.objects.forEach(obj => obj.id = uniqid());
      }
      db.objects.push(object);
      io.emit('create_object', object);
    });

    socket.on('create_board', (board) => {
      board.id = uniqid();
      db.boards.push(board);
      io.emit('create_board', board);
    });

    socket.on('to_board', ({objectId, board}) => {
      const object = getObject(db, objectId);
      object.board = board.id;
      object.x = 25;
      object.y = 25;
      object.z = getZ(db);
      object.owner = '';
      object.isDragged = false;
      io.emit('update_object', object);
    });

  });

});