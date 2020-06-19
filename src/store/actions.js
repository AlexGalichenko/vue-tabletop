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
    })
  },

  loadGame(store, game) {
    socket.emit('load_game', game);
  },

  moveStart(store, object ) {
    socket.emit('move_start', object.id);
  },

  moveStop(store, object) {
    socket.emit('move_stop', object);
  }
}