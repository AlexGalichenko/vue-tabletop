import interact from "interactjs";

export default {
  mounted() {
    const vueThis = this;
    
    interact(this.$el).draggable({
      ignoreFrom: ".pinned, .dragged",
      inertia: {
        resistance: 60
      },
      restrict: {
        restriction: "parent",
        endOnly: false,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      listeners: {
        start(event) {
          vueThis.$store.dispatch('moveStart', vueThis.object);
        },
        move(event) {
          vueThis.$store.commit('move', { event, object: vueThis.object })
        },
        end(event) {
          vueThis.$store.dispatch('moveStop', vueThis.object);
        }
      }
    });
  }
}