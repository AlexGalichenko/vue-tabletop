export default {

  updateObjects(state, objects) {
    state.objects = objects;
  },

  updateName(state, username) {
    state.username = username;
  },

  addPlayer(state, username) {
    state.players.push(username);
  }

}