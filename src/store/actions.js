import socket from './socket';

export default {

  login(store, username) {
    store.commit('updateName', username);
  },

  init(store) {
    socket.emit('socket_connect', store.username);
    socket.on('initial_load', payload => {
      store.commit('updateObjects', payload.objects);
    });

    socket.on('new_user', (username) => {
      store.commit('addPlayer', username)
    });
  }

}