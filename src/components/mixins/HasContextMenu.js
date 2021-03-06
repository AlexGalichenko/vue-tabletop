export default {
  methods: {
    showContextMenu(event) {
      this.$store.commit('setCurrentObject', this.object);
      this.$store.commit('showContextMenu', {
        type: 'ContextMenu',
        x: window.pageXOffset + event.x,
        y: window.pageYOffset + event.y
      });
    }
  }
}