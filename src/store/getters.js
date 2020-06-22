export default {
  tableObjects(state) {
    return state.objects.filter(obj => !obj.owner);
  },
  handObjects(state) {
    return state.objects.filter(obj => obj.owner === state.username).sort((a, b) => a.updated - b.updated);
  }
}