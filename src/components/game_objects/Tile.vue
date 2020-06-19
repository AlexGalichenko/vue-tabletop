<template>
  <div :style="style" :class="objectClass" />
</template>

<script>
import interact from "interactjs";

export default {
  props: {
    object: Object
  },
  computed: {
    style() {
      return this.object.isFlipped ? this.backStyle : this.frontStyle;
    },

    objectClass() {
      const dragged = this.object.isDragged ? `dragged` : ''
      return `tile ${dragged}`
    },

    frontStyle() {
      return {
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `100% 100%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`,
        'opacity': `${this.object.isDragged ? 50 : 100}%`
      };
    },

    backStyle() {
      return {};
    }
  },
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
};
</script>

<style scoped>
  .dragged {
    opacity: 50%;
  }
</style>