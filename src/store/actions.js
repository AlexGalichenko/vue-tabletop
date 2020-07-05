import socket from './socket';

export default {

  init(store) {
    store.commit('updateName', window.localStorage.getItem("name"));

    socket.emit('socket_connect', store.state.username);

    socket.on('initial_load', payload => {
      store.commit('loadObjects', payload.objects);
      store.commit('loadBoards', payload.boards);
    });

    socket.on('new_user', players => {
      store.commit('loadPlayers', players);
    });

    socket.on('update_object', object => {
      store.commit('updateObject', object);
    });

    socket.on('create_object', object => {
      store.commit('createObject', object);
    });

    socket.on('delete_object', objectId => {
      store.commit('deleteObject', objectId);
    });

    socket.on('move_start', objectId => {
      store.commit('makeDragged', objectId);
    });

    socket.on('create_board', board => {
      store.commit('createBoard', board);
    });

  },

  loadGame(store, payload) {
    socket.emit('load_game', payload);
  },

  moveStart(store, object) {
    socket.emit('move_start', object.id);
  },

  moveStop(store, object) {
    socket.emit('move_stop', {
      id: object.id,
      x: object.x,
      y: object.y
    });
  },

  takeFromContainer(store, objectId) {
    socket.emit('take_container', objectId);
  },

  takeFromContainerById(store, payload) {
    socket.emit('take_container_by_id', payload);
  },

  putObjectToContainer(store, payload) {
    socket.emit('put_container', payload);
  },

  flip(store, payload) {
    socket.emit('flip', payload);
  },

  shuffle(store, payload) {
    socket.emit('shuffle', payload);
  },

  increaseCount(store, payload) {
    socket.emit('increase_count', payload);
  },

  decreaseCount(store, payload) {
    socket.emit('decrease_count', payload);
  },

  deal(store, payload) {
    socket.emit('deal', payload);
  },

  dealFromContainer(store, payload) {
    socket.emit('deal_container', payload);
  },

  dealFromContainerById(store, payload) {
    socket.emit('deal_container_by_id', payload);
  },

  play(store, payload) {
    socket.emit('play', payload);
  },

  pin(store, payload) {
    socket.emit('pin', payload);
  },

  deleteObject(store, payload) {
    socket.emit('delete', payload);
  },

  createObject(store, { frontUrl, backUrl, type, rows, columns, x, y, height, width, scale, infinite, values, color }) {
    switch (type) {
      case 'Deck': socket.emit('create_deck', { type, frontUrl, backUrl, rows, columns, x, y, height, width, scale }); break;
      case 'Container': socket.emit('create_container', { type, frontUrl, backUrl, x, y, height, width, scale, infinite }); break;
      case 'Tile': socket.emit('create_tile', { type, frontUrl, backUrl, x, y, height, width, scale }); break;
      case 'Counter': socket.emit('create_counter', { type, x, y, scale }); break;
      case 'Dice': socket.emit('create_dice', { type, x, y, values, scale, color }); break;
      case 'Chip': socket.emit('create_chip', { type, x, y, height, width, scale, color }); break;
    }
  },

  rotateRight(store, payload) {
    socket.emit('rotate_right', payload);
  },

  rotateLeft(store, payload) {
    socket.emit('rotate_left', payload);
  },

  copy(store, payload) {
    socket.emit('copy', payload);
  },

  roll(store, payload) {
    socket.emit('roll', payload);
  },

  createBoard(store, payload) {
    socket.emit('create_board', payload);
  },

  toBoard(store, payload) {
    socket.emit('to_board', payload);
  },
}