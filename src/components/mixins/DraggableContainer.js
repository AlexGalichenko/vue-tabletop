import interact from "interactjs";

export default {
  mounted() {
    const vueThis = this;
    
    interact(this.$el).draggable({
      ignoreFrom: ".pinned, .dragged",
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

    interact(this.$el).dropzone({
      overlap: 0.1,
      ondrop: function(event) {
        const objectId = event.relatedTarget.getAttribute('data-id');
        const containerId = vueThis.object.id;

        vueThis.$store.dispatch('putObjectToContainer', {
          objectId,
          containerId
        });
      }
    });
  }
}