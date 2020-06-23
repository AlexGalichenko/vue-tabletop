export default {
  methods: {
    showPreview(event) {
      this.$store.commit('setCurrentObject', this.object);
      this.$store.commit('showPreview');
    },
    hidePreview(event) {
      this.$store.commit('hidePreview');
    }
  }
}