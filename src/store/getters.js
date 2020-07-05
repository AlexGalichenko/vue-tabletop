export default {
  tableObjects(state) {
    return state.objects.filter(obj => !obj.owner && (obj.board === undefined || obj.board === ''));
  },
  boardObjects(state) {
    return board => state.objects.filter(obj => !obj.owner && obj.board === board);
  },
  handObjects(state) {
    return state.objects.filter(obj => obj.owner === state.username).sort((a, b) => a.updated - b.updated);
  }
}