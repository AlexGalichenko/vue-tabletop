export default {
  methods: {
    showContextMenu(event) {
      this.$store.commit('setSearchSelectedIndexObject', {object: this.$store.state.currentObject, index: this.index});
      this.$store.commit('showContextMenu', {
        type: 'SearchContextMenu',
        x: window.pageXOffset + event.x,
        y: window.pageYOffset + event.y
      });
    }
  }
}