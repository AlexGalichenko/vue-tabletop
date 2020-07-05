export default {

  loadObjects(state, objects) {
    state.objects = objects;
  },

  loadBoards(state, boards) {
    state.boards = boards;
  },

  updateName(state, username) {
    state.username = username;
  },

  loadPlayers(state, players) {
    state.players = players;
  },

  updateObject(state, object) {
    const currentObject = state.objects.find(obj => obj.id === object.id);
    Object.assign(currentObject, object);
  },

  createObject(state, object) {
    state.objects.push(object);
  },

  deleteObject(state, objectId) {
    const index = state.objects.findIndex(obj => obj.id === objectId);
    state.objects.splice(index, 1);
  },

  makeDragged(state, objectId) {
    const currentObject = state.objects.find(obj => obj.id === objectId);
    currentObject.isDragged = true;
  },

  move(state, { event, object }) {
    const currentObject = state.objects.find(obj => obj.id === object.id);
    currentObject.x += event.dx / state.zoom;
    currentObject.y += event.dy / state.zoom;
    currentObject.z += 0;
  },

  showContextMenu(state, menuData) {
    state.contextMenu = {
      show: true,
      ...menuData
    };
  },

  hideContextMenu(state) {
    state.contextMenu.show = false;
  },

  setCurrentObject(state, object) {
    state.currentObject = object;
  },

  setSearchSelectedIndexObject(state, {object, index}) {
    state.searchCurrentObject = {object, index}
  },

  showPreview(state) {
    state.showPreview = true;
  },

  hidePreview(state) {
    state.showPreview = false;
  },

  changeZoom(state, delta) {
    if (state.zoom - delta >= 0.5 && state.zoom - delta <= 2) state.zoom -= delta;
  },

  moveTable(state, { dx, dy }) {
    state.table.x += dx;
    state.table.y += dy;
  },

  setHandWindow(state, handWindow) {
    state.handWindow = handWindow;
    state.handWindow.mainTable = state.table;
    state.handWindow.mainScroll = {
      x: window.scrollX,
      y: window.scrollY
    }
    state.handWindow.mainDimension = {
      height: window.innerHeight,
      width: window.innerWidth
    }
    state.handWindow.mainZoom = state.zoom;
  },

  createBoard(state, board) {
    state.boards.push(board);
  }
}