export default {
  methods: {
    showContextMenu(event) {
      this.$store.commit('setCurrentObject', this.object);
      this.$store.commit('showContextMenu', {x: event.x, y: event.y});
    }
  }
}