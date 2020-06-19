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

  move(store, { event, object}) {
    socket.emit('move', {
      x: object.x + event.dx,
      y: object.y + event.dy,
      z: 0,
      id: object.id
    })
  }

}