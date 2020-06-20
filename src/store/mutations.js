export default {

  loadObjects(state, objects) {
    state.objects = objects;
  },

  updateName(state, username) {
    state.username = username;
  },

  addPlayer(state, username) {
    state.players.push(username);
  },

  updateObject(state, object) {
    const currentObject = state.objects.find(obj => obj.id === object.id);
    Object.assign(currentObject, object);
  },

  createObject(state, object) {
    state.objects.push(object);
  },

  makeDragged(state, objectId) {
    const currentObject = state.objects.find(obj => obj.id === objectId);
    currentObject.isDragged = true;
  },

  move(state, { event, object }) {
    const currentObject = state.objects.find(obj => obj.id === object.id);
    currentObject.x += event.dx;
    currentObject.y += event.dy;
    currentObject.z += 0;
  },

  showContextMenu(state, position) {
    state.contextMenu = {
      show: true,
      ...position
    };
  },

  hideContextMenu(state) {
    state.contextMenu.show = false;
  },

  setCurrentObject(state, object) {
    state.currentObject = object;
  },

}