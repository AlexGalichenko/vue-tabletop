<template>
  <div :style="style" class="tile" />
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

    frontStyle() {
      return {
        height: `${this.object.height}px`,
        width: `${this.object.width}px`,
        "background-image": `url(${this.object.frontUrl})`,
        "background-size": `100% 100%`,
        transform: `translate(${this.object.x}px, ${this.object.y}px)`
      };
    },

    backStyle() {
      return {};
    }
  },
  mounted() {
    interact(this.$el).draggable({
      ignoreFrom: ".pinned",
      inertia: {
        resistance: 60
      },
      restrict: {
        restriction: "parent",
        endOnly: false,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      listeners: {
        move: (event) => {
          console.log(event);
          this.$store.dispatch('move', { event, object: this.object })
        }
      }
    });
  }
};
</script>

<style scoped>
</style>