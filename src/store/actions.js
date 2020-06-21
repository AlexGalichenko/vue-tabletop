import socket from './socket';

export default {

  init(store) {
    store.commit('updateName', window.localStorage.getItem("name"));

    socket.emit('socket_connect', store.username);

    socket.on('initial_load', payload => {
      store.commit('loadObjects', payload.objects);
    });

    socket.on('new_user', username => {
      store.commit('addPlayer', username);
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
  },

  loadGame(store, game) {
    socket.emit('load_game', game);
  },

  moveStart(store, object ) {
    socket.emit('move_start', object.id);
  },

  moveStop(store, object) {
    socket.emit('move_stop', object);
  },

  takeFromContainer(store, objectId) {
    socket.emit('take_container', objectId);
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
  }
}